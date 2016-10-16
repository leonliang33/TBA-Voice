var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Need an email'],
        unique: [true, 'Email already exists'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Need a password']
    },
    firstname: {
        type: String,
        required: [true, 'I need a name, any name']
    },
    createdMessages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'message'
    },
    hasEncountered: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'message'
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

var User = module.exports = mongoose.model('user', Schema);

/**
 * Create a new User
 * @param newUser a new user object to be saved
 * @param callback returns an err object if any and the user object from saving the model to
 * the controller
 */
module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) throw (err);
        bcrypt.hash(newUser.password, salt, null, function (err, hash) {
            if (err) throw (err);
            newUser.password = hash;
            newUser.save(callback);
        })
    })
};

module.exports.findUserByEmail = function (email, callback) {
    User.findOne({email: email}).exec(callback);
};

module.exports.findUserByID = function (id, callback) {
    User.findById(id).exec(callback);
};

module.exports.findAllUsers = function (callback) {
    User.find({}).exec(callback);
};

module.exports.removeUserByID = function (id, callback) {
    User.remove({_id: id}).exec(callback);
};

/**
 * Compares the password with the hash on the database
 * @param passwordToCheck the entered password
 * @param userHash the user's hashed password
 * @param callback err if failed, result is true if they match
 */
module.exports.comparePassword = function (passwordToCheck, userHash, callback) {
    bcrypt.compare(passwordToCheck, userHash, function (err, result) {
     //    if (err) throw err;
        callback(null, result);
    });
};
