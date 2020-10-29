const { findOne } = require("../models/User");
const User=require("../models/User");
exports.register=async (req,res,next)=>{
    try{
        const {password,email,name}=req.body;
        const doesExits=await User.findOne({email});
        if(doesExits){
            return res.json("account already exits");
        }
        let user =await User.create({
        name,
        password,
        email
        });
        
        const JWTtoken=await user.genAuthToken();
        user=await user.extractUser();
        res.status(201).json({
            JWTtoken,
            user
        });
        
    }
    catch(err){
        next(err);
    }
}
exports.login=async (req,res,next)=>{
    try{
        const {password,email}=req.body;
        let user =await User.findUser(email,password);
        const JWTtoken=await user.genAuthToken();
        user=await user.extractUser();
        res.status(200).json({
            JWTtoken,
            user
        });
    }
    catch(err){

    }
}