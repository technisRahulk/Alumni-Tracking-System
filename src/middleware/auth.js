const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

const auth = async (req,res,next) => {
    try{
        console.log("yoyo");
        const token = req.header("Authorization").replace("Bearer ", "");
        const userInfo = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: userInfo._id,
            "tokens.token": token,
        });
        if(!user) throw new Error("User not found");
        
        req.token=token;
        req.user=user;
        req.dbUser = await User.findById(user.userId);
        

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