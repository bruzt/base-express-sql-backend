const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const { authorization } = req.headers;

    //if(! authorization) return res.status(400).json({ error: 'invalid credentials' });

    const splitBearer = authorization.split(' ');

    if(splitBearer.length !== 2 || splitBearer[0] !== "Bearer") return res.status(400).json({ error: 'invalid credentials' });

    try {
        
        req.tokenPayload = jwt.verify(splitBearer[1], process.env.APP_SECRET);

        return next();

    } catch(error){
        
        return res.status(400).json({ error: 'invalid credentials' });
    }
}