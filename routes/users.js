var express = require('express');
var router = express.Router();

var google = require('googleapis');
var plus = google.plus('v1');

var oauth2Client = require('../model/MyOAuth2Client');

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('users', { title: 'Express', message: "Welcome " + req.user.displayName });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
