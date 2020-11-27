const router = require("express").Router();
const { contactAdmin } = require("../controllers/Nodemailer");
const Mail = require("../models/Mail");

// router.get('/',(req,res)=>{
//     res.render('index');
// })

router.post("/contact", async (req, res) => {
  try {
    const { email, name, message, subject } = req.body;
    const newMail = await new Mail({
      email,
      name,
      message,
      subject,
    }).await();
    if (!newMail) {
      res.locals.flashMessages = req.flash(
        "Something went wrong. Please try again"
      );
      res.redirect("/#contact");
    }
    console.log(newMail);
    contactAdmin({
      email,
      name,
      message,
      subject,
    });
    res.locals.flashMessages = req.flash("Your response has been recorded");
    res.redirect("/#contact");
  } catch (err) {
    res.locals.flashMessages = req.flash(
      "Something went wrong. Please try again"
    );
    res.redirect("/#contact");
  }
});

module.exports = router;
