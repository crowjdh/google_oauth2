var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '418620888781-ujqsjs4uo4aq74otmr83ph64nhpmkidg.apps.googleusercontent.com';
var CLIENT_SECRET = 'XJxQ0tGnps2FCUE3stq2uSYe';
var REDIRECT_URL = 'https://nameless-tor-57749.herokuapp.com/users';

module.exports = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
