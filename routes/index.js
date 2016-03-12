var express = require('express');
var router = express.Router();

var oauth2Client = require('../model/MyOAuth2Client');

router.get('/', function(req, res, next) {
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
  });
  res.render('index', { title: 'Express', message: url });
});

module.exports = router;
