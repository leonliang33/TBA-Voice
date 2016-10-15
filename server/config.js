/**
 * This file configures the MongoDB Database, constant values, and other settings
 */

var config = {};

config.appName = 'TBA-Voice';

/* Application Config */
config.appURL = process.env.APP_URL || 'http://localhost:3000';
config.port = process.env.PORT || '3000';

// Sets the number of times a user can attempt a log in before being locked out
config.maxNumberOfLogInAttempts = 10;

//Database configuration
config.db = 'mongodb://dmartelly.com:27017/TBA-Voice';
config.host = 'dmartelly.com';
config.dbport = 27017;
config.collection = 'TBA-Voice';


//Email configuration for conformations
config.email = {
    'from': 'noreply@TBA-Voice.com',
    'fromName': 'TBA-Voice'
};

config.validation = {
    password: {
        length: {
            minimum: 10,
            maximum: 128
        },
        /* https://www.owasp.org/index.php/OWASP_Validation_Regex_Repository
         * 10 to 128 character password requiring at least 3 out 4 (uppercase
         * and lowercase letters, numbers and special characters) and no more
         * than 2 equal characters in a row
         * Symbols: ! ~ < > , ; : _ = ? * + # . " & § % ° ( ) | [ ] - $ ^ @ /
         */
        format: {
            pattern: /^(?:(?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))(?!.*(.)\1{2,})[A-Za-z0-9!~<>,;:_=?*+#."&§%°()\|\[\]\-\$\^\@\/]{10,128}$/,
            message: ' must contain at least 3 out of 4 (uppercase and ' +
            'lowercase letters, numbers and special characters) and no ' +
            'more than 2 equal characters in a row. Valid special ' +
            'characters: ! ~ < > , ; : _ = ? * + # . " & § % ° ( ) | [ ' +
            '] - $ ^ @ /'
        }
    }
};

/* Export the config object */
module.exports = config;
