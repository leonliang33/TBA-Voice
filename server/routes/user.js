var router = require('express').Router();

var User = require('../models/user');

var getErrorMessage = function (err) {
    var message = [];

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message.push({msg: 'Username / Email already exists'});
                break;
            default:
                message.push({msg: "Something went wrong. Please check form for errors and try again"});
        }
    }
    else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message.push({msg: err.errors[errName].message});
            }
        }
    }
    return message;
};

/**
 * Renders the logged in user's page page
 */
router.route('/')
    .get(function (req, res) {
        var send = {
            success: false,
            message: ''
        };
        User.findAllUsers(function (err, listOfUsers) {
            if (err) {
                send.message = getErrorMessage(err);
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
                send.message = getErrorMessage(err)[0].msg;
                res.json(send);
            } else {
                send.success = true;
                send.message = 'User has been created';
                send.other = result;
                res.json(send);
            }
        })
    });

router.route('/:id')
// Get user information
    .get(function (req, res) {
        var send = {
            success: false,
            message: ''
        };
        User.findUserByID(req.params.id, function (err, user) {
            if (err) {
                send.message = getErrorMessage(err);
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
    })
    // Update a user
    .put(function (req, res) {
        res.json({
            success: false,
            message: 'Not Yet Implemented'
        })
    })
    // Delete a user
    .delete(function (req, res) {
        var send = {
            success: false,
            message: ''
        };
        User.removeUserByID(req.params.id, function (err, result) {
            if (err) {
                send.message = getErrorMessage(err);
                res.json(send);
            } else {
                send.success = true;
                send.message = 'User has been deleted';
                send.other = result;
                res.json(send);
            }
        });
    });

module.exports = router;