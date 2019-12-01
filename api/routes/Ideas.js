const express = require('express')
const router = express.Router()
const Idea = require('../../Models/Ideas')
const {ensureAuthenticated} = require('../../Helpers/Auth')


router.post('/',ensureAuthenticated, (req, res)=>{
let errors = []
if(!req.body.title){
  errors.push({text:'Please add a title'})
}
if(!req.body.details){
  errors.push({text:'Please add some details'})
}
if(errors.length > 0){
  res.render('Ideas/add', {
    errors: errors,
    title:req.body.title,
    details:req.body.details,

  })
}else{
  const newUser = {
    title: req.body.title,
    details: req.body.details,
    user: req.user.id
    }
  new Idea(newUser)
  .save().then(idea=>{
         req.flash('success_msg', 'Video Idea Added')
    res.redirect('/ideas')

  })
}
})

router.get('/', ensureAuthenticated, (req, res)=>{
Idea.find({user:req.user.id})
.sort({date:'desc'})
.then(ideas=>{
  res.render('ideas/index', {
    ideas
  })
})
})




module.exports = router