const express = require("express");
const userController = require("../controllers/user");
const User = require("./../models/User")
const auth = require("./../middleware/auth")

const router = new express.Router();

router.post("/login",userController.login);

router.post("/register",userController.register)

router.get("/login",(req,res)=>{
    res.send("done")
});
router.get("/register",(req,res)=>{
    res.render("register")
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});


router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findUser(
        req.body.email,
        req.body.password
        );
      const token = await user.generateAuthToken();
  
      res.send({ user: user.extractUser(), token });
    } catch (e) {
      res.status(400).send();
    }
  });
  
  router.post("/logout", auth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
  
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  });
  
  router.post("/logoutAll", auth, async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  });

module.exports = router;





