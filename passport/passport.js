var GoogleStrategy = require('passport-google-oauth2' ).Strategy;
var passport = require('passport');
var expressSession = require('express-session');

var CLIENT_ID = '418620888781-ujqsjs4uo4aq74otmr83ph64nhpmkidg.apps.googleusercontent.com';
var CLIENT_SECRET = 'XJxQ0tGnps2FCUE3stq2uSYe';
// var REDIRECT_URL = 'https://nameless-tor-57749.herokuapp.com/users';
var REDIRECT_URL = 'https://nameless-tor-57749.herokuapp.com/auth/google/callback';

module.exports.init = function(app) {
    
    // init passport
    app.use(expressSession({
        secret: 'mySecretKey',
    	name:   'kaas',
    	proxy:  true,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    // config session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    
    // register strategy
    passport.use(new GoogleStrategy({
        clientID:     CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: REDIRECT_URL,
        passReqToCallback   : true
      },
      function(request, accessToken, refreshToken, profile, done) {
          process.nextTick(function() {
              done(null, profile);
          });
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
      }
    ));
    
    app.get('/auth/google', passport.authenticate('google', { scope: [
           'https://www.googleapis.com/auth/plus.login',
           'https://www.googleapis.com/auth/plus.profile.emails.read'] 
    }));
    app.get( '/auth/google/callback', 
        	passport.authenticate( 'google', { 
        		successRedirect: '/',
        		failureRedirect: '/login'
    }));
};
