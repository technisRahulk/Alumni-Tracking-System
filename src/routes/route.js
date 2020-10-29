const userRoute=require("./user");
const express=require("express");
const router=express.Router();
const Auth=require("../middleware/auth")
router.use("/user",userRoute);
router.get("/",(req,res)=>{
    res.render("index");
})
// test auth
router.get("/auth",Auth,(req,res)=>{
    res.send("working auth");
});
router.get("*",(req,res,next)=>{
    const error=new Error("Route deos not exits ");
    error.status=404;
    next(error);
});
router.use((error,req,res,next)=>{
    console.error(error);
    res.status(error.status||500).json({
        error:true,
        message:error||"error hol",
        route:req.url
    });
});
module.exports=router;