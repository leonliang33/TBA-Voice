var router = require('express').Router();

var Message = require('../models/message');

var btoa = require('btoa');

var getErrorMessage = function (err) {
    var message = [];

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message.push({msg: 'Duplicate error'});
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
 * Gets all messages from the database and send the closest one
 */
router.route('/n')
    .post(function (req, res) {
        var myLat = req.body.lat;
        var myLong = req.body.long;
        console.log(myLat + ' ' + myLong);
        var send = {
            success: false,
            message: ''
        };
        Message.findAllMessages(function (err, listOfMessages) {
            if (err) {
                res.json(send)
            } else if (!listOfMessages) {
                send.message = 'No Message was found';
                res.json(send);
            } else {
                var min = Number.MAX_SAFE_INTEGER;
                var currDistance;
                var data;
                for (const i in listOfMessages) {
                    currDistance = Math.sqrt(Math.pow(listOfMessages[i].lat - myLat, 2) +
                        Math.pow(listOfMessages[i].long - myLong, 2));
                    if (currDistance < min) {
                        min = currDistance;
                        data = listOfMessages[i].audio.data;
                    }
                }
                send.success = true;
                res.set("Content-Type", 'mp3');
                res.send(btoa(data)).end();
            }
        })
    });

/**
 * Gets all messages from the database and send the closest one
 */
router.route('/')
    .get(function (req, res) {
        var myLat = req.params.lat;
        var myLong = req.params.long;
        console.log(myLat + ' ' + myLong);
        var send = {
            success: false,
            message: ''
        };
        Message.findAllMessages(function (err, listOfMessages) {
            if (err) {
                res.json(send)
            } else if (!listOfMessages) {
                send.message = 'No Message was found';
                res.json(send);
            } else {
                var min = Number.MAX_SAFE_INTEGER;
                var currDistance;
                var data;
                for (const i in listOfMessages) {
                    currDistance = Math.sqrt(Math.pow(listOfMessages[i].lat - myLat, 2) +
                        Math.pow(listOfMessages[i].long - myLong, 2));
                    if (currDistance < min) {
                        min = currDistance;
                        data = listOfMessages[i].audio.data;
                    }
                }
                send.success = true;
                res.set("Content-Type", 'mp3');
                res.send(data).end();
            }
        })
    })
    // Create a message
    .post(function (req, res) {
        console.log(req.body);
        var send = {
            success: false,
            message: ''
        };
        var newMessage = new Message({
            audio: {
                data: req.body.audio,
                contentType: 'mp3'
            },
            lat: req.body.lat,
            long: req.body.long,
            author: req.body.email
        });
        Message.createMessage(newMessage, function (err, result) {
            if (err) {
                console.log('Message error' + err);
                send.message = getErrorMessage(err)[0].msg;
                res.json(send);
            } else {
                console.log('Message has been created');
                send.success = true;
                send.message = 'Message has been created';
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
        Message.findMessageByID(req.params.id, function (err, user) {
            if (err) {
                send.message = getErrorMessage(err);
                res.json(send);
            } else if (!user) {
                send.message = 'Message was not found';
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
        Message.removeMessageByID(req.params.id, function (err, result) {
            if (err) {
                send.message = getErrorMessage(err);
                res.json(send);
            } else {
                send.success = true;
                send.message = 'User has been deleted';
                res.json(send);
            }
        });
    });

module.exports = router;