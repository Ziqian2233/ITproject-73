const jwt = require('jsonwebtoken');
// Used for getting current session hashed token
let User = require('../models/user.model');

JWT_SECRET = 'asdasdasdasdsdf+659+523ewrfgarf6r5faw+f+-**/-/-*/*5*/3-*5/3-*5/266345^&*(^%&UJHUH' //use atob

// This middleware performs authorization using JWT token
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Token verification successful, continue authenticating token
        req.userData = decoded;
        const user = await User.findById(req.userData.id);

        if (!user) {
           // User do not exist
           return res.status(401).json('User do not exist'); 
        }
        else if (req.userData.loginTime < user.currentLoginTime) {
            // Token expired due to newer logins
            return res.status(401).json('Session expired');
        }
        else {
            // Token belongs to current session
            next();
        }
    } catch (err) {
        // Token verification failed
        return res.status(401).json('Auth failed');
    }
};