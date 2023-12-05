var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/usercontroller');

/* GET users listing. */
router.get('/dashboard', userControllers.dashboard);

// get a registeration form
router.get('/register', userControllers.registerForm)

// user login
router.get('/login', userControllers.loginForm)

// register a new user

router.post('/register', userControllers.addUser)


module.exports = router;
