const jwt = require('jsonwebtoken');
const jwt_secret_key = "qwertyuiopasdfghjklzxcvbnm";

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ','');

    if(!token){
        return res.status(401).json({ status: false, message: 'No token, authorization denied' });
    }

    try {
        const decode = jwt.verify(token, jwt_secret_key);
        req.user = decode;
        next();

    } catch (error) {
        res.status(401).json({ status: false, message: 'Token is not valid' });
    }
}

module.exports = authMiddleware;