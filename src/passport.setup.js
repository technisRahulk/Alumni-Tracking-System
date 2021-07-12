const User =require("./models/User");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
    consumerKey: process.env.GoogleClientId,
    consumerSecret:process.env.GoogleClientSecret,
    // callbackURL: "http://localhost:4000/google/callback"
  },
  function(token, tokenSecret, profile, done){
    console.log("yoyo")
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));
