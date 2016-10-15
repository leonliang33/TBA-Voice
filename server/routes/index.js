var router = require('express').Router();

//var User = require('../models/user');

/**
 * Test the api call
 */
router.get('/', function (req, res) {
    res.send('What the heck do you want fool?').end();
});

/**
 * Authenticates the user
 */
/*
router.post('/login', function (req, res) {
    User.findUserByUsername(req.body.username, function (err, user) {
        //If err
        if (err) {
            res.send(err);
        }
        //If no user was found
        if (!user) {
            res.send('Username was not found');
        }
        User.comparePassword(req.body.password, user.password, function (err, isValid) {
            if (err) {
                console.log('comparePassword Error: ' + err);
                res.send(err1);
            }
            else if (!isValid) {
                console.log('Password is incorrect');
                res.send('Password is incorrect');
            } else {
                res.json({isValid: true})
            }
            //If all checks pass, authorize user

        });
    });
});
*/
module.exports = router;