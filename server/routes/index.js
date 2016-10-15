var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var router = require('express').Router();

/**
 * Renders the home page
 */
router.get('/', function (req, res) {
    res.send('Home Page').end();
});

/**
 * Renders the login page
 */
router.get('/login', function (req, res) {
    res.send('Login').end();
});

/**
 * The Local Strategy for logging in to BOLO
 */
passport.use(new LocalStrategy(function (username, password, done) {
    User.findUserByEmail(username, function (err, user) {
        if (err) {
            return done(err);
        }
        //If no user was found
        if (!user) {
            console.log('Username was not found');
            return done(null, false, {
                message: 'Username *' + username + '* was not found on the database'
            });
        }
        //If the user's password has expired
        if (user.passwordDate - Date.now >= 600) {
            //sendExpirationReminder(account.user, timeLeft);
            return done(null, false, {message: 'Your Password has expired'});
        }
        //if the agency is not active
        if (!user.agency.isActive) {
            return done(null, false, {
                message: 'Your Agency *' + user.agency.name +
                '* is Deactivated. Contact your Root Administrator for more information.'
            })
        }
        //if the user is not active
        //if (!user.isActive) {
        //    return done(null, false, {message: 'This user is currently deactivated'})
        //}
        User.comparePassword(password, user.password, function (err1, isValid) {
            if (err1) {
                console.log('comparePassword Error: ' + err1);
                return done(null, false, {message: err1});
            }
            if (!isValid) {
                console.log('Password is incorrect');
                return done(null, false, {message: 'Password is incorrect'});
            }
            //If all checks pass, authorize user for the current session
            return done(null, user);
        });
    })
}));

/**
 * Process Username and Password for Login.
 */
exports.attemptLogIn = (passport.authenticate(
    'local', {
        successRedirect: '/bolo',
        failureRedirect: '/login',
        successFlash: 'Welcome ',
        failureFlash: true
    }
));

/**
 * Destroy any sessions belonging to the requesting client.
 */
exports.LogOut = function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are Logged Out');
    res.redirect('/login');
};

module.exports = router;