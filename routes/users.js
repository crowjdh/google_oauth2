var express = require('express');
var router = express.Router();

var google = require('googleapis');
var plus = google.plus('v1');

var oauth2Client = require('../model/MyOAuth2Client');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // request access token
    oauth2Client.getToken(req.params.code, function(err, tokens) {
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
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
