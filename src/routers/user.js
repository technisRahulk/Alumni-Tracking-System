const express = require("express");
const userController = require("../controllers/user");
const auth = require("../middleware/auth");
const User = require("../models/User");
const multer = require("multer");


const upload = multer({
    limits: {
        fileSize: 1000000, // image size limit <= 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error("Not a image file of jpg, jpeg or png format"));
        cb(undefined, true);
    },
});

const router = new express.Router();

router.get("/user",function(req,res)
{
console.log(req.query.search);
if(req.query.search)
{
	 const rege = new RegExp(escapeRegex(req.query.search), 'gi');
User.find({name:rege},function(err,users)
{
if(err)
	console.log(err);
else
{
	
	res.json(users);
}
});
}
else
{
User.find({},function(err,users)
{
if(err)
	console.log(err);
else
{
	console.log(users);
	res.json(users);
}
});
}
});

// router.get("/users/register",userController.register_get)
router.post("/users", userController.signUp); //Signing Up

router.get("/users/login", userController.login_get);
router.post("/users/login", userController.login); //Login

router.post("/users/logout", auth, userController.logout); //Logout

router.post("/users/logoutAll", auth, userController.logoutAll); //Logout All sessions

router.get("/users/me", auth, userController.readUser); //Get logged in user 

router.patch("/users/me", auth, userController.updateUser); //Update user

router.delete("/users/me", auth, userController.deleteUser); //Delete user 

router.get("/users/:id/avatar", userController.getAvatar); //Get profile picture or avatar

router.post("/users/me/avatar", auth, upload.single("avatar"), userController.uploadAvatar); //Upload profile picture or avatar

router.delete("/users/me/avatar", auth, userController.deleteAvatar); //Delete profile picture or avatar


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
