const router = require("express").Router();
const userController = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("multer")

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

router.post("/signup", userController.signUp); //Signing Up

router.post("/login", userController.login); //Login

router.post("/logout", auth, userController.logout); //Logout

router.post("/logoutAll", auth, userController.logoutAll); //Logout All sessions

router.get("/profile", auth, userController.readUser); //Get logged in user 

router.patch("/profile", auth, userController.updateUser); //Update user

router.delete("/profile", auth, userController.deleteUser); //Delete user 

router.get("/avatar/:id", userController.getAvatar); //Get profile picture or avatar

router.post("/avatar/me", auth, upload.single("avatar"), userController.uploadAvatar); //Upload profile picture or avatar

router.delete("/avatar/me", auth, userController.deleteAvatar); //Delete profile picture or avatar

module.exports = router;
