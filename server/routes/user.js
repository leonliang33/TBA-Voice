var router = require('express').Router();

/**
 * Renders the logged in user's page page
 */
router.route('/')
    .get(function (req, res) {
        res.send('User Page').end();
    });

module.exports = router;