const router=require("express").Router();
const userController=require("../controllers/user");
router.post("/login",userController.login);
router.post("/register",userController.register)
router.get("/login",(req,res)=>{
    res.render("login")
});
router.get("/register",(req,res)=>{
    res.render("register")
});
module.exports=router;





