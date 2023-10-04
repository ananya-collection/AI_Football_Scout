var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model/loginModel.js');
const flash = require('express-flash');

// Serialize and deserialize
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

// Use async/await to refactor deserializeUser
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Middleware
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async function (req, email, password, done) {
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return done(null, false, flash('No user has been found','loginMessage'));
    }

    if (!user.comparePassword(password)) {
      return done(null, false, flash( 'Oops! Wrong Password','loginMessage'));
    }

    return done(null, user);

  } catch (err) {
    return done(err);
  }
}));

// Custom function to validate
exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};