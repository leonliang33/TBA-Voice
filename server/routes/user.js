var router = require('express').Router();

var User = require('../models/user');

/**
 * Renders the logged in user's page page
 */
router.route('/')
    .get(function (req, res) {
        send = {
            success: false,
            message: ''
        };
        User.findAllUsers(function (err, listOfUsers) {
            if (err) {
                send.message = err;
                res.json(send);
            } else if (!listOfUsers) {
                send.message = 'User was not found';
                res.json(send);
            } else {
                send.success = true;
                send.message = listOfUsers;
                res.json(send);
            }
        })
    })
    .post(function (req, res) {
        var send = {
            success: false,
            message: ''
        };
        var newUser = new User({
            email: req.body.email,
            firstname: req.body.firstname,
            password: req.body.password
        });
        User.createUser(newUser, function (err, result) {
            if (err) {
                send.message = err;
                res.json(send);
            } else if (!result) {
                send.message = result;
                res.json(send);
            } else {
                send.success = true;
                send.message = result;
                res.json(send);
            }
        })
    });

router.route('/:user_id')
// Get user information
    .get(function (req, res) {
        var send = {
            success: false,
            message: ''
        };
        User.findUserByID(req.params.user_id, function (err, user) {
            if (err) {
                send.message = err;
                res.json(send);
            } else if (!user) {
                send.message = 'User was not found';
                res.json(send);
            } else {
                send.success = true;
                send.message = user;
                res.json(send);
            }
        });
    });

module.exports = router;