const jwt = require("jsonwebtoken");

function verifyToken (req, res, next) {

    const token = req.body.token || req.query.token || req.headers["x-acsses-token"];

    if(!token) {
        return res.status(403).json({msg :"A token is required for authentication"});
    }
    try {
        const decodeToken = jwt.verify(token, process.env.TOKEN_KEY_ACSSES);
        req.user = decodeToken;
    }
    catch (error) {
        return res.status(401).json({msg: "invalid token"});
    }
    return next();
}

module.exports = verifyToken;