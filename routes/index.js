const express = require('express');
const router = express.Router();
const blogcontroller = require('../controllers/blogcontroller');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


/* GET home page. */
router.get('/', blogcontroller.home);
router.get('/blogs', blogcontroller.showblogs);
router.get('/addblogs', ensureAuthenticated, blogcontroller.showformpage);

router.get('/dashboard', ensureAuthenticated, (req, res, next) => {
    let user = req.user;
   
    res.render('dashboard', { user: user})
})

/* GET users listing. */


// post requests
router.post('/addblog', ensureAuthenticated, blogcontroller.addblog)

module.exports = router;
