const express = require("express");
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

const router = new express.Router();

router.post("/users", userController.signUp);

router.post("/users/login", userController.login);

router.post("/users/logout", auth, userController.logout);

router.post("/users/logoutAll", auth, userController.logoutAll);

router.get("/users/me", auth, userController.readUser);

router.post("/users/me/avatar", auth, upload.single("avatar"), userController.uploadAvatar);

router.delete("/users/me/avatar", auth, userController.deleteAvatar);

router.get("/users/:id/avatar", userController.getAvatar);

module.exports = router;
