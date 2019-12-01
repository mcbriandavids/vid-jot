const config = require('config')
const mongoose = require('mongoose')
const db = config.get('mongoURI')

const connectDB = async ()=>{
  try {
    await mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('Not Connected')
  }
}
module.exports = connectDB