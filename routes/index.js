var express = require('express');
var router = express.Router();

var readline = require('readline');
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '418620888781-ujqsjs4uo4aq74otmr83ph64nhpmkidg.apps.googleusercontent.com';
var CLIENT_SECRET = 'XJxQ0tGnps2FCUE3stq2uSYe';
var REDIRECT_URL = 'https://nameless-tor-57749.herokuapp.com';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAccessToken(oauth2Client, callback) {
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', function(code) {
    // request access token
    oauth2Client.getToken(code, function(err, tokens) {
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', message: 'Logging in...' });
    // retrieve an access token
    getAccessToken(oauth2Client, function() {
        // retrieve user profile
        plus.people.get({ userId: 'crowjdh', auth: oauth2Client }, function(err, profile) {
            if (err) {
              console.log('An error occured', err);
              return;
            }
            res.render('index', { title: 'Express', message: profile.displayName + ':' + profile.tagline });
        });
    });
});

module.exports = router;
