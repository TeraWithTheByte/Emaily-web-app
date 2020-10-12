//passport configurations file
const passport = require('passport');
const path = require('path');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
//const keys = require(path.join('..', 'config', 'keys')); // '..\\config\\keys'
const keys = require('..\\config\\keys');
const User = mongoose.model('users'); //returns instance of the 'users' model class

/**/
passport.serializeUser((user, done) => {
  /*notice: user.id is the _id property os the user mongoDB Record*/
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);//todo what happens if there is no user?
  });
});

//configure google strategy for express
passport.use(
  new googleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    },
    /*the following callback func is automatically called everytime a user gets redirected back to my app from the google flow*/
    (accessToken, refreshToken, profile, done) => {
      /*query the database to search for user record with profile.id*/
      User.findOne({googleID: profile.id}).then((existingUser) => {
        if(existingUser){
          //we already have a record with the give profile.id
          done(null, existingUser);
        } else{
          //we don't have a user record with this profile.id -> create a new record
            new User({googleID: profile.id}).save()
            .then(user => done(null, user));
        }
      });
      //console.log('profile', profile);
  })
);
