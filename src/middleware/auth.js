const jwt=require("jsonwebtoken");
const User = require("../models/User");

module.exports=async (req,res,next)=>{
    try{
        const {authorization}=req.headers;
    if(!authorization){
        return res.json("Login first")
    }
    const token=authorization.replace("Bearer ","");
    const userInfo=await jwt.verify(token,process.env.JWT_SECRECT);
    const user=await User.findById(userInfo._id);
    if(!user){
        throw new Error("User not found");
    }
    req.userInfo={
        token:token,
        user:user
    }
    next();    
    }
    catch(err){
        res.status(401).json({
            error:true,
            message:"login first"
        });
    }
}