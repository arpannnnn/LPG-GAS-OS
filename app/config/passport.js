const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user');
const bcrypt = require('bcrypt');

function init(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      // Login
      // Check if email exists
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'No user with this email' });
      }


       //Configure Passport strategy for Facebook
  passport.use(new FacebookStrategy({
    clientID: 'YOUR_FACEBOOK_APP_ID',
    clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
    (accessToken, refreshToken, profile, done) => {
      // Save the user's profile to the database or perform any necessary actions
      // In this example, we'll just return the user's profile
      return done(null, profile);
    }
  ));



      bcrypt.compare(password, user.password)
        .then(match => {
          if (match) {
            return done(null, user, { message: 'Logged in successfully' });
          }
          return done(null, false, { message: 'Wrong username or password' });
        })
        .catch(err => {
          return done(null, false, { message: 'Something went wrong' });
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });


 
  
 










}

module.exports = init;
