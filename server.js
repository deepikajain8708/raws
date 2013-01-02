var mongoose = require('mongoose')
      , Schema = mongoose.Schema

,express = require('express')
var passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var UserSchema = new Schema({}),User;


 
var app = express();
app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.session({ secret: 'esoognom'}))
app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
  clientId: '473900949203.apps.googleusercontent.com'
            , clientSecret: 'IVwtBmq1PN2an8H-akm9nclN'

   , callbackURL: 'http://localhost:3000/auth/google/callback'

  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));

app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/',failureRedirect: '/login' }));


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000);






