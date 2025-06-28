const jwt = require('jsonwebtoken');
const {TOKEN_TYPE} = require("../constants/types.constants");
const {ERROR_MESSAGES} = require("../constants/errorMessages");

function authenticateJWT(req, res, next) {
    const token = req.cookies[TOKEN_TYPE.ACCESS];
    if (!token) return res.sendStatus(401);

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(403).json({error: ERROR_MESSAGES.INVALID_TOKEN});
    }
}

module.exports = authenticateJWT;
