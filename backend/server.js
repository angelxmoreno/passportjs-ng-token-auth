/* global require, process */

require('dotenv').config();
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var models = require('./models')();
require('./middlewares')(app, express, models);
require('./controllers')(app, express, models);
app.set('views', './views');
app.set('view engine', 'hbs');

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.send({
//            message: err.message,
//            error: err
//        });
//    });
//
//}

// production error handler
// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.send({
//        message: err.message,
//        error: {}
//    });
//});

app.listen(port, function () {
    console.log('App listening on port ' + port + '!');
});