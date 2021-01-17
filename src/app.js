const express = require("express");
const path = require("path");
const passport = require("Passport");
const cookieParser=require("cookie-parser");
require("dotenv").config();
require("./db/mongoose");
require("./passport.setup")
const Router = require("./routers/index");

const app = express();
const port = process.env.PORT || 4000;



app.use(express.json());
app.use(cookieParser({
  name:"auth",
  keys:["key1","key2"]
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// static file setup
app.set("view engine", "ejs");



app.use(Router);

app.get("/only-test",(req,res)=>{
res.send("Test done")
})
// oauth 
app.get('/google', passport.authenticate('google', { scope: ['email',"profile"] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/only-test');
  });

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


app.get("/failed",(req,res)=>{
  res.send("You have failed to login please go back and try again");
});

app.use(express.static(path.join(__dirname, "../public")));

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
