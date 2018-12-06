const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class AuthController {
    login(req, res, next) {
        const user = req.body;

        console.log(user);

        jwt.sign({user: user}, 'bodasooqa', (err, token) => {
            res.json({token: token});
        });
    }
}