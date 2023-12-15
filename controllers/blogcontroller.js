const asyncHandler = require("express-async-handler");
const blogs = require('../model/blogmodel');
const moment = require('moment');
const User = require('../model/usermodel');


userBlogs = async (req, res, next) => {

  let userBlg = await blogs.find({userId: res.locals.currentUser._id});
  res.render('dashboard', {userBlogs: userBlg})
}
showblogs = asyncHandler(async (req, res, next) => {

  let allBlogs = await blogs.find();
  res.render('blog', { allBlogs: allBlogs, user: req.user})
})
       

home = asyncHandler(async (req, res, next) => {
  res.redirect('/users/login')
})
showformpage = asyncHandler(async (req, res, next) => {
  let user = req.user;
  res.render('addblogs', {user: user});
})

//post methods
addblog = asyncHandler( async (req, res, next) => {
  let id = res.locals.currentUser._id;

  let newComing = req.body;
  newComing.date = moment(new Date()).format("MMMM, D YYYY");
  newComing.userId = `${id}`;

  let newBlog = new blogs(newComing);
  newBlog.save()
    .then(() => console.log('new blog saved'))
    .catch((err) => console.log(err));

  res.redirect('/blogs');
})

// delete methods

deleteBlog = async (req, res, next) => {
  try {
    let data = await blogs.findByIdAndDelete({_id: req.params.id});
    res.json({redirect: '/blogs'})
  } catch(err){
    console.log(err)
  }     
}


module.exports = {showblogs, home, showformpage, addblog, userBlogs, deleteBlog};