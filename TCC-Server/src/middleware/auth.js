const jwt = require("jsonwebtoken");

function verifyToken (req, res, next) {

    const tokenHeader = req.headers['authorazition'];
    const token = tokenHeader && tokenHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({msg : "User must have a valid token"});
    }
    jwt.verify(token, process.env.TOKEN_KEY_ACSSES, (error, user) => {
        if(error) {
            return res.status(403).json({msg : "This user does not have acsses to the aplication"});
        }
        req.user = user
        next();
    });
}

module.exports = verifyToken;