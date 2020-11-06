const express = require("express");
const userController = require("../controllers/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/signup", userController.signUp);

router.post("/login", userController.login);

router.post("/logout", auth, userController.logout);

router.post("/logoutAll", auth, userController.logoutAll);

router.get("/login", auth, userController.readUser);

module.exports = router;
