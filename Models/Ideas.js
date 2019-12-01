const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IdeaSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  details:{
    type: String,
    required: true
  },
    user:{
    type: String,
    require:true
  },
  date:{
    type: 'date',
    default: Date.now()
  }

})

module.exports =  mongoose.model('idea', IdeaSchema)