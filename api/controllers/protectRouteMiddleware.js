const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;

module.exports = async (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        console.log(req.headers.authorization);
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            const decoded = jwt.verify(token, "" + process.env.JWT_KEY);
            console.log(decoded);
            req.user = await User.findOne({ where: {userId: decoded.id }});
            console.log(req.user);
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
}