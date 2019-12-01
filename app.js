const express =require('express')
const path = require('path')
const exphbs = require('express-handlebars')
// Middleware
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')



// DB
const connectDB = require('./Config/Db')
// Passport 
const passport = require('passport')


const app = express()
connectDB()

// override with POST having ?_method=DELETE Method-Override
app.use(methodOverride('_method'))

//Express- Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  }))
// Passport middleware
   app.use(passport.initialize());
  app.use(passport.session());


// Handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout:'main'
}))
app.set('view engine', 'handlebars');
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect Flash Middleware

  app.use(flash());

// Static folder

app.use(express.static(path.join(__dirname, 'public')))
// GLobal Variable(s)
app.use((req, res, next)=>{
 res.locals.success_msg = req.flash('success_msg') 
 res.locals.error_msg = req.flash('error_msg') 
 res.locals.error_msg = req.flash('error') 
 res.locals.user = req.user || null
 next()
})


 require('./Config/Passport')(passport)


app.use('/', require('./api/routes/Home'))
app.use('/about', require('./api/routes/About'))
app.use('/ideas', require('./api/routes/AddIdeas'))
app.use('/ideas', require('./api/routes/Ideas'))
app.use('/users', require('./api/routes/Users'))
// Passport Auth

require('./Config/Passport')(passport)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{ console.log(`App running on port ${PORT}`)})

