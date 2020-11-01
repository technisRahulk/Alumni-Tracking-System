const jwt=require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

const auth = async (req,res,next) => {
    try{
        const {authorization}=req.headers;
        if(!authorization){
            return res.json("Login First")
        }
        const token = authorization.replace("Bearer ","");
        const userInfo = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: userInfo._id,
            "tokens.token": token,
        });
        if(!user) throw new Error("User not found");
        
        req.userInfo = {
            token:token,
            user:user
        }
        next();    
    }
    catch(e){
        res.status(401).json({
            error:true,
            message:"Login First"
        });
    }
}

module.exports = auth;