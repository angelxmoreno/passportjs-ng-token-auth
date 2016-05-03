/* global module, require */
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

module.exports = function (app, express) {
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(session({
        store: new RedisStore({
            url: process.env.REDIS_URL
        }),
        secret: process.env.app_secret,
        resave: true,
        saveUninitialized: false
    }));
    var passport = require('./passportjs')(app);

    app.set('passport', passport);
    app.use(passport.initialize());
    app.use(passport.session());
}