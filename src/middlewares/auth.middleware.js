const jwt = require('jsonwebtoken');
const {TOKEN_TYPE} = require("../constants/types.constants");
const {ERROR_MESSAGES} = require("../constants/errorMessages");
const {StatusCodes} = require("http-status-codes");

function authenticateJWT(req, res, next) {
    const token = req.cookies[TOKEN_TYPE.ACCESS];
    if (!token) return res.sendStatus(StatusCodes.UNAUTHORIZED);

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(StatusCodes.FORBIDDEN).json({ error: ERROR_MESSAGES.INVALID_TOKEN });
    }
}

module.exports = authenticateJWT;
