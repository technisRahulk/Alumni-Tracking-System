const express = require("express");
const path = require("path");
const passport = require("Passport");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./db/mongoose");
require("./passport.setup")
const Router = require("./routers/index");
const flash=require("connect-flash");
//Creating nodeMailer account
const nodeMailer = require("./controllers/Nodemailer");

const Mail  = require("./models/Mail");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser({
    name: "auth",
    keys: ["key1", "key2"]
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

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../partials")));


app.get("/only-test", (req, res) => {
         let reqPath = path.join(__dirname, '../views');
   // console.log(__dirname);
    res.render(reqPath+'/profile.ejs');
    //res.send('hi');
    })
    // oauth 
app.get('/google', passport.authenticate('google', {
    scope: ['email', "profile"]
}));

app.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/failed'
    }),
    function(req, res) {
        res.redirect('/only-test');
    });

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


app.get("/failed", (req, res) => {
    res.send("You have failed to login please go back and try again");
});



//Routes
app.use(Router);

// app.post("/contact", function(req, res) {
//     console.log(req.body);
//     nodeMailer.contact({
//           email: req.body.email,
//           name: req.body.name,
//           message: req.body.message,
//           subject: req.body.subject,
//         });

//     const newMail = new Mail({
//           email: req.body.email,
//           name: req.body.name,
//           message: req.body.message,
//           subject: req.body.subject,
//         });
     
//         newMail
//           .save()
//           .then((result) => {
//              console.log("sucess");
           
//             res.redirect("/");
//           })
//           .catch((err) => {
//             console.log(err);
//             res.locals.flashMessages = req.flash(
//               "Something went wrong. Please try again"
//             );
//             res.redirect("/blog/create");
//           });
// });


app.get("/", (req, res) => {
    let reqPath = path.join(__dirname, '../views');
   // console.log(__dirname);
    res.render(reqPath+'/index.ejs');
    //res.send('hi');
});
app.get("/test", (req, res) => {
    let reqPath = path.join(__dirname, '../views');
   // console.log(__dirname);
    res.render(reqPath+'/signup.ejs');
    //res.send('hi');
})

app.listen(port, () => {
    console.log("Server is up on port " + port);
});





