/**
 * The main application. This is the js file to run to start the web server
 * @type {_|exports|module.exports}
 * @private
 */
var http = require('http');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var validator = require('express-validator');
var errorHandler = require('errorhandler');
var logger = require('morgan');

var mongoose = require('mongoose');
var config = require('./config');

var mainRoutes = require('./routes/index');
var userRoutes = require('./routes/user');
var messageRoutes = require('./routes/message');

/**
 * Start the database
 */
mongoose.connect(config.db);
mongoose.Promise = require('bluebird');
var db = mongoose.connection;
console.log('MongoDB Connection\nHost:' + db.host + '\nPort:' + db.port);

/**
 * BodyParser Middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * configure our app to handle CORS requests
 */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
Authorization');
    next();
});

//noinspection JSUnusedGlobalSymbols
/**
 * Validator
 */
app.use(validator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

/**
 * Doesn't tell the world that we are using express
 */
app.disable('x-powered-by');

/**
 * If in dev mode, automatic Logger and
 * errorHandler middleware are set
 */
if ('development' == app.get('env')) {
    app.use(logger('dev'));
    app.use(errorHandler());
}

/**
 * Routes
 */
app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/message', messageRoutes);
//app.use('/img', imgRoutes);

/**
 * 404 Page
 * if the app went though all routes and could not find a page
 */
app.use(function (req, res) {
    console.error('404 encountered at %s, request ip = %s', req.originalUrl, req.ip);
    res.status(404).json({
        success: false, message: '404: Route not found'
    });
});

/**
 * Server Starting
 */
app.set('port', config.port);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
