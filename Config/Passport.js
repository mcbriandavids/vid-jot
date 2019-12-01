const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const User = require('../Models/User')



module.exports = passport=>{
passport.use(new LocalStrategy({ usernameField:'email'}, (email, password, done)=>{
  User.findOne({
    email:email,
    
  })
  .then(user=>{
    if(!user){
return done(null, false, {message:'No User Found'})
    }else{

    }
    // Match Password
    bcrypt.compare(password, user.password, (err, isMatch)=>{
    if(err) err
    if(isMatch){
     return done(null, user)
   }else{
    return done(null, false, {message:'Incorrect Password'})
    }

    })
   
  })
  console.log(email, password)
}))
passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser((id, done)=> {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
}

