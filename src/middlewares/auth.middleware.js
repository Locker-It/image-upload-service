const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];
    if (!token) return res.sendStatus(401);

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.sendStatus(403);
    }
}

module.exports = authenticateJWT;
