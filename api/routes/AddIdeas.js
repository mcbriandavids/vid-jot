const express = require('express')
const router = express.Router()
const Idea = require('../../Models/Ideas')
const {ensureAuthenticated} = require('../../Helpers/Auth')

router.get('/add', ensureAuthenticated, (req, res)=>{
  res.render('ideas/add')
})

router.get('/edit/:id', ensureAuthenticated,async (req, res)=>{
try {
  const idea = await Idea.findOne({_id:req.params.id})
  if(!idea){
    res.status(400).json({msg:
    'No Idea Found'
    })
  }
  if(idea.user !==req.user.id){
    req.flash('error_msg', 'Not Authorized')
    res.redirect('/ideas')
  }else{
  res.render('ideas/edit', {idea})
  }

} catch (error) {
  console.error(error.message)
  res.status(500).send('Server Error')
}
})

// PUt Request
router.put('/:id', ensureAuthenticated, (req, res)=>{
Idea.findOne({_id:req.params.id})
.then(idea=>{
  // New Values
  idea.title = req.body.title
  idea.details = req.body.details
  idea.save()
  .then(idea=>{
        req.flash('success_msg', 'Video Idea Updated')
    res.redirect('/ideas')
  })
})

})

// Delete an Idea
router.delete('/:id',ensureAuthenticated, (req, res)=>[
  Idea.deleteOne({_id: req.params.id})
  .then(()=>{
    req.flash('success_msg', 'Video Idea Deleted')
    res.redirect('/ideas')
  })

])
module.exports = router;