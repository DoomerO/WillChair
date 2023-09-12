const jwt = require("jsonwebtoken");

function verifyTokenAdm (req, res, next) {
    try {
        const tokenHeader = req.headers['authorization']; 
        const token = tokenHeader && tokenHeader.split(' ')[1];
        
        if (!token) {
            return res.status(403).json({msg : "The Administrator must have a valid token"});
        }
        jwt.verify(token, process.env.TOKEN_KEY_ADM, (error, user) => {
            if(error) {
                return res.status(403).json({msg : "This administrator does not have accses to the aplication"});
            }
            req.user = user
            next();
        });    
    }
    catch(error) {
        return res.status(400);
    }
     
}

module.exports = verifyTokenAdm;