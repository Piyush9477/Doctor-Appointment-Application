const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization'); // Retrieve the token from the Authorization header
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
        req.user = verified; // Attach user data to the request object
        next(); // Proceed to the next route handler
    }catch(error){
        res.status(400).send('Invalid Token');
    }
};

module.exports = authenticate; // Export the authentication middleware