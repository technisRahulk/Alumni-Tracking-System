const mongoose=require("mongoose");
const crypto=require("crypto");
const jwt=require("jsonwebtoken");
const UserSChema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"is invalid"],
        unique:true
    },
  password:{
      type:String,
      require:true
  },
  branch:{
      type:String,
      require:true
  },
  workAt:{
      type:String,
      require:true
  }
},
{
    timestamps:true
});


// token gen
UserSChema.methods.genAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRECT,{expiresIn:process.env.ExpireJWT});
    return token;
}

// password encrypting 
UserSChema.pre("save",async function(next){
    const user=this;
    if(user.isModified("password")){
        const salt=crypto.randomBytes(16).toString("hex");
        const hash= crypto.pbkdf2Sync(user.password,salt,100000,64,'sha512').toString("hex");
        user.password=[salt,hash].join('$');
    }
    next();
});
// password verify
UserSChema.statics.findUser=async function(email,password){

    const User=this;
    const user=await User.findOne({email});

    if(!user){
        throw new Error("User not found register first");
    }
    const oldsalt=user.password.split('$')[0];
    const originalPassword=user.password.split('$')[1];
    const hash= crypto.pbkdf2Sync(password,oldsalt,100000,64,'sha512').toString("hex");
    if(!hash===originalPassword){
        throw new Error("Invalid password");
    }
    return user;
};
// extract 
UserSChema.methods.extractUser=async function(){
    const user=this;
    const userInfo=user.toObject();
    delete userInfo.password;
    return userInfo;

};

module.exports=mongoose.model("User",UserSChema);