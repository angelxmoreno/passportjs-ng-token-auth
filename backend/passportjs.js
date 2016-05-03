/* global module, require */
var passport = require('passport');

module.exports = function (app, express) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.autoAuthenticate = passport.authenticate([
        'localapikey',
        'jwt'
    ]);

    return passport;
};