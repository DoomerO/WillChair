const jwt = require("jsonwebtoken");

function verifyToken (req, res, next) {
    try {
        const tokenHeader = req.headers['authorization']; 
        const token = tokenHeader && tokenHeader.split(' ')[1];
        
        if (!token) {
            return res.status(403).json({msg : "This user must have a valid token"});
        }
        jwt.verify(token, process.env.TOKEN_KEY_ACCSES, (error, user) => {
            if(error) {
                return res.status(403).json({msg : "This user does not have acsses to the aplication"});
            }
            req.user = user
            next();
        });    
    }
    catch(error) {
        return res.status(400);
    }
     
}

module.exports = verifyToken;