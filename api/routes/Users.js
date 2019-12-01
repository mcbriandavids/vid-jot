const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../../Models/User')

// Register A User
router.get('/register', (req, res)=>{
  res.render("users/register")
})

// Register Form Post

router.post('/register', (req, res)=>{
  console.log(req.body)
const errors = []
if(req.body.password !==req.body.password2){
  errors.push({text:'Password do not match'})
}
if(req.body.password.length < 6){
  errors.push({text:'Password must be at least 6 characters or more'})
}
if(errors.length > 0){
  res.render('users/register',{
    errors:errors,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2
  })
}else{
  User.findOne({email:req.body.email})
  .then(user=>{
    if(user){
      req.flash('error_msg', 'Email already registered')
      res.redirect('/users/login')
    }else{
        const newUser =  new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2
  })
bcrypt.genSalt(10, (err, salt)=>{
  bcrypt.hash(newUser.password, salt, (err, hash)=>{
    if(err){return err}
    newUser.password = hash
    newUser.save()
    .then(user=>{
      req.flash('success_msg', 'You are now registered & can log in')
      res.redirect('/users/login')
    })
    .catch(err=>{
      console.log(err)
      return
    })
  })
})
    }
  })
}
})

// Log A User
router.get('/login', (req, res)=>{
  res.render("users/login")
})


// Login Form Post
router.post('/login', (req, res, next)=>{
  passport.authenticate('local',{
    successRedirect:'/ideas',
    failureRedirect:'/users/login',
    failureFlash:true
  })(req, res, next)
  
})
router.get('/logOut', (req, res)=>{
  req.logOut()
  req.flash('success_msg', 'You are Logged Out')
  res.redirect('/users/login')
})
module.exports = router;