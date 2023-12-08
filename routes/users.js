var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/usercontroller');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');
const passport = require('passport');


// get a registeration form
router.get('/register', forwardAuthenticated, userControllers.registerForm)

// user login form
router.get('/login', forwardAuthenticated, userControllers.loginForm)

// register a new user

router.post('/register', forwardAuthenticated, userControllers.authenticateUser, userControllers.addUser)

//login a user

router.post('/login', userControllers.logInUser);
  
// Logout
router.get('/logout',ensureAuthenticated, userControllers.logOutUser);

module.exports = router;
