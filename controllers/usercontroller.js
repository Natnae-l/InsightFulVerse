const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const user = require('../model/usermodel');

// user Dashboard
dashboard = asyncHandler(async (req, res, next) => {
        res.send('show dashboard')
  });
// get a registration form
registerForm = asyncHandler((req, res, next) => {
    res.render('register')
  });
// get a login form
loginForm = asyncHandler((req, res, next) => {
    res.render('login')
  })

// register a new user
addUser = asyncHandler((req, res, next) => {
    console.log(req.body)
})
// export controllers
module.exports = {dashboard, registerForm, loginForm, addUser}
