var router = require('express').Router();

var User = require('../models/user');

/**
 * Test the api call
 */
router.get('/', function (req, res) {
    res.send('What the heck do you want fool?').end();
});

/**
 * Authenticates the user
 */
router.post('/login', function (req, res) {
    console.log(req.body);
    var send = {
        success: false,
        message: ''
    };
    User.findUserByEmail(req.body.email.toLowerCase(), function (err, user) {
        //If err
        if (err) {
            console.log('findUserByEmail Error: ' + err);
            send.message = err;
            res.json(send);
        }
        //If no user was found
        else if (!user) {
            send.message = 'Username was not found';
            res.json(send);
        } else {
            User.comparePassword(req.body.password || '', user.password, function (err, isValid) {
                //If err
                if (err) {
                    console.log('comparePassword Error: ' + err);
                    send.message = err;
                    res.json(send);
                }
                //If password did not match
                else if (!isValid) {
                    send.message = 'Password is incorrect';
                    res.json(send);
                } else {
                    console.log('User ' + user.email + ' is logged in');
                    send.success = true;
                    res.json(send);
                }
            });
        }
    });
});

module.exports = router;