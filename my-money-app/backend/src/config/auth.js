const jwt = require('jsonwebtoken');
const env = require('../.env');

module.exports = (req, res, next) => {
    // CORS preflight
    if (req.method === 'OPTIONS') {
        return next();
    }

    const token = req.body.token || req.query.token || req.headers['Authorization'];
    if(!token) {
        return res.status(403).send({errors: ['No token provided.']})
    }

    jwt.verify(token, env.authSecret, function(err, decoded) {
        if(err) {
            return res.status(403).send({
                errors: ['Failed to authenticate token.']
            })
        } else {
            // Colocando o token decóficado
            req.decoded = decoded
            next()
        }
    });
};