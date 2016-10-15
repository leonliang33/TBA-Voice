/**
 * The main application. This is the js file to run to start the web server
 * @type {_|exports|module.exports}
 * @private
 */
var http = require('http');
var path = require('path');

var express = require('express');

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var session = require('express-session');

var flash = require('connect-flash');
var validator = require('express-validator');
var errorHandler = require('errorhandler');
var logger = require('morgan');
var methodOverride = require('method-override');

var mongoose = require('mongoose');
var config = require('./config');

var mainRoutes = require('./routes/index');
var userRoutes = require('./routes/user');

/**
 * Start the database
 */
mongoose.connect(config.db);
mongoose.Promise = require('bluebird');
var db = mongoose.connection;
console.log('MongoDB Connection\nHost:' + db.host + '\nPort:' + db.port);

/**
 * Express Init and Config
 * https://www.youtube.com/watch?v=W-8XeQ-D1RI
 */
var app = express();
app.set('views', path.join(__dirname, '../'));
app.set('view engine', 'react');
//app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

/**
 * BodyParser Middleware
 */
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); //Extended is set to true to parse images

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

var inDevelopmentMode = ( 'development' == app.get('env') );

/**
 * Automatic Logger and errorHandler middleware
 */
if (inDevelopmentMode) {
     app.use(logger('dev'));
     app.use(errorHandler());
}

/**
 * Set Static Folder for pictures and scripts for the frontend
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

/**
 * Express Session
 */
app.use(session({
     secret: 'secret_blah',
     saveUninitialized: true,
     resave: true,
     cookie: {
          maxAge: config.max_age
          //TODO Uncomment the below option before going to production.
          //HTTPS is required for this option or the cookie will not be set per the documentation.
          //secure: true
     },
     rolling: true
}));

/**
 * Passport
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Use Flash and set Global Variables
 */
app.use(flash());

//Main Routes
/**
 * Anyone can access these routes without logging in
 */
app.use('/', mainRoutes);

/**
 * If user is logged in, then keep going
 */
app.use(function (req, res, next) {
     if (req.user) {
          next();
     } else {
          req.session.login_redirect = req.originalUrl;
          res.redirect('/login');
     }
});
//app.use('/user', userRoutes);
//app.use('/img', imgRoutes);

/**
 * 404 Page
 * if the app went though all routes and could not find a page
 */
app.use(function (req, res) {
     console.error('404 encountered at %s, request ip = %s', req.originalUrl, req.ip);
     res.status(404).render('404');
});

/**
 * Error Handling
 * if inDevelopmentMode, navagate to the error page.
 * if not, go back to the previous page and display the error message
 */
if (inDevelopmentMode) {
     app.use(function (err, req, res, next) {
          console.error('Error occurred at %s\n%s', req.originalUrl, err.stack);
          res.render('error', {message: err.message, error: err});
     });
} else {
     app.use(function (err, req, res, next) {
          console.error('Error occurred at %s >>> %s', req.originalUrl, err.message);
          req.flash(error_msg, 'Internal server error occurred, please try again');
          res.redirect('back');
     });
}

/**
 * Server Starting
 */
app.set('port', config.port);
app.listen(app.get('port'), function () {
     console.log('Express server listening on port ' + app.get('port'));
});
