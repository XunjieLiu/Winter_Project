const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/user')

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
            // Match User
            User.findOne({ email: email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
                }

                //Match password, decrypt first
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if (err) throw err;

                    if(isMatch){
                        return done(null, user); // null for errors
                    }else{
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}
