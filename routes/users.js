var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/usercontroller');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');
const passport = require('passport');


// get a registeration form
router.get('/register', forwardAuthenticated, userControllers.registerForm)

// user login
router.get('/login', forwardAuthenticated, userControllers.loginForm)

// register a new user

router.post('/register',userControllers.authenticateUser, userControllers.addUser)

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/users/register',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

module.exports = router;
