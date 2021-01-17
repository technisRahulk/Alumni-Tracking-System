const express = require("express");
const userController = require("../controllers/user");
const auth = require("../middleware/auth");

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

router.post("/users", userController.signUp); //Signing Up

router.post("/users/login", userController.login); //Login

router.post("/users/logout", auth, userController.logout); //Logout

router.post("/users/logoutAll", auth, userController.logoutAll); //Logout All sessions

router.get("/users/me", auth, userController.readUser); //Get logged in user 

router.patch("/users/me", auth, userController.updateUser); //Update user

router.delete("/users/me", auth, userController.deleteUser); //Delete user 

router.get("/users/:id/avatar", userController.getAvatar); //Get profile picture or avatar

router.post("/users/me/avatar", auth, upload.single("avatar"), userController.uploadAvatar); //Upload profile picture or avatar

router.delete("/users/me/avatar", auth, userController.deleteAvatar); //Delete profile picture or avatar

module.exports = router;
