const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const User = require('../model/usermodel');
const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');

// get a registration form
registerForm = asyncHandler(async (req, res, next) => {
    res.redirect('login1')
  });
// get user profile
userProfile = async (req, res, next) => {
  res.render('profile')
}
// get a login form
loginForm = asyncHandler(async (req, res, next) => {
    res.render('login1')
  })

// register a new user
authenticateUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('login1', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('login1');
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
})

// update user
updateUser = async (req, res, next) => {
  let user = await User.findOne({_id: res.locals.currentUser._id})
  
  if (user){
    bcrypt.compare(req.body.oldPassword, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        let updater = {};
        
          if (req.body.name && req.body.name != user.name) updater.name = req.body.name;
          if (req.body.email && req.body.email != user.email) updater.email = req.body.email;


          if (typeof(req.body.newPassword) != undefined && req.body.oldPassword != req.body.newPassword){

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
                if (err) throw err;
                
                updater.password = hash;
                if (Object.values(updater).length > 0) {
                    User.findByIdAndUpdate({_id: req.user._id}, updater)
                      .then(data => {
                        res.redirect('/users/logout')
                      })
                      .catch(err => console.log(err))
                } else if(Object.values(updater).length == 0){
                  res.redirect('/users/login')
                }
              })
            })}         
      } else {
        res.send('User not updated')
      }
    });
  }
}

// login user
logInUser = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
};

//logOut user
logOutUser = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }    
    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
  })};

  
// export controllers
module.exports = {registerForm, loginForm, authenticateUser, logOutUser, logInUser, userProfile, updateUser}
