const express = require("express");
const path = require("path");
require("dotenv").config();
require("./db/mongoose");

const userRouter = require("./routers/user");

const app = express();
const port = process.env.PORT || 3000;

//Creating nodeMailer account
const nodeMailer = require("./controllers/Nodemailer");

const Mail  = require("./models/Mail");

app.use(express.json());
app.use(userRouter);

// static file setup
app.set("view engine", "ejs");

//body parser
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "../public")));

app.post("/contact", function(req, res) {
	nodeMailer.contact({
          email: req.body.email,
          name: req.body.name,
          message: req.body.message,
          subject: req.body.subject,
        });
	
	const newMail = new Mail({
          email: req.body.email,
          name: req.body.name,
          message: req.body.message,
          subject: req.body.subject,
        });
	
		newMail
          .save()
          .then((result) => {
            // console.log(result);
            res.locals.flashMessages = req.flash(
              "Your response has been recorded"
            );
            res.redirect("/#contact");
          })
          .catch((err) => {
            console.log(err);
            res.locals.flashMessages = req.flash(
              "Something went wrong. Please try again"
            );
            res.redirect("/#contact");
          });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
