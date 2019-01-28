const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/user');

// Login page
router.get('/login', (req, res) => {
    res.render("login")
});

// Register page
router.get('/register', (req, res) => {
    res.render("register")
});

// Register handle
router.post('/register', (req, res) =>{
    const {name, email, password, password2} = req.body;

    //Vlidate
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        password2: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    });

    const result = Joi.validate(req.body, schema);
    var errors = [];
    if (password !== password2){
        errors.push('Confirm password is not equal to password')
    }

    if (result.error || errors.length > 0){
        if(result.error){
            errors.push(result.error);
        }

        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        User.findOne({email: email}).then(user => {
            if(user){
                errors.push('Email is already registered');
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Hash Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // Set password to hashed 
                        newUser.password = hash;
                        // Save user
                        newUser.save().then(user =>{
                            req.flash(
                                'success_msg',
                                'You are now registered and can log in'
                            );
                            res.redirect('/users/login');
                        }).catch(err => console.log(err));
                    })
                })
            }
        });
    }

});

// Login Handles
router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;