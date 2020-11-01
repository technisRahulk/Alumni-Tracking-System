const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        trim: true,
        // match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"is invalid"],
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim: true,
        validate(value) {
            if (value.length < 8)
                throw new Error("Password length should be atleast 8 characters");
            if (value.toLowerCase().includes("password"))
                throw new Error("Your password cannot have 'password' in it");
        },
    },
    branch:{
        type:String,
        // required:true,
        trim: true
    },
    workAt:{
        type:String,
        // required:true,
        trim: true,
    },
    tokens: [
        {
        token: {
            type: String,
            required: true,
        },
        },
    ],
},
{
    timestamps:true
});

// token gen
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRECT,{expiresIn:process.env.ExpireJWT});

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

// password encrypting 
userSchema.pre("save",async function(next){
    const user = this;
    if(user.isModified("password")){
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto.pbkdf2Sync(user.password,salt,100000,64,'sha512').toString("hex");
        user.password = [salt,hash].join('$');
    }
    next();
});
// password verify
userSchema.statics.findUser = async function(email,password){

    const User = this;
    const user = await User.findOne({email});

    if(!user) throw new Error("User not found. Register first!");

    const oldsalt = user.password.split('$')[0];
    const originalPassword = user.password.split('$')[1];
    const hash = crypto.pbkdf2Sync(password,oldsalt,100000,64,'sha512').toString("hex");

    if(!hash === originalPassword) throw new Error("Invalid password");
    
    return user;
};
// extract 
userSchema.methods.extractUser = async function(){
    const user = this;
    const userInfo = user.toObject();
    delete userInfo.password;
    return userInfo;

};

module.exports = mongoose.model("User",userSchema);