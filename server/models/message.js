var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = new mongoose.Schema({
    audio: {
        data: Buffer,
        contentType: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    lat: {
        type: Number,
        required: [true, 'Need a Lat']
    },
    long: {
        type: Number,
        required: [true, 'Need a Long']
    },
    author: {
        type: String,
        required: [true, 'Need the author\'s email']
    },
    playCount: {
        type: Number,
        default: 0
    }
});

var Message = module.exports = mongoose.model('message', Schema);

/**
 * Create a new Message
 * @param newMessage a new message object to be saved
 * @param callback returns an err object if any and the user object from saving the model to
 * the controller
 */
module.exports.createMessage = function (newMessage, callback) {
    newMessage.save(callback);
};

module.exports.findMessageByID = function (id, callback) {
    Message.findById(id).exec(callback);
};

module.exports.findAllMessages = function (callback) {
    Message.find({}).exec(callback);
};

module.exports.removeMessageByID = function (id, callback) {
    Message.remove({_id: id}).exec(callback);
};

module.exports.removeMessageByAuthor = function (authorID, callback) {
    Message.remove({author: authorID}).exec(callback);
};