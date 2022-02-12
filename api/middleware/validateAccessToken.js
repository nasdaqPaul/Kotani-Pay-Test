const jwt = require('jsonwebtoken');

module.exports = function(secret){
    return async function (req, res, next) {
        if (
            (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
            (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        ) {
            const token = req.headers.authorization.split(' ')[1]
            try {
                const decodedJwt = await jwt.verify(token, secret)
                req.user = {id: decodedJwt.id}
                return next()
            } catch (e) {
                console.log(e)
                return res.status(500).send(e.message)
            }
        } else {
            return res.status(401).json('Authentication Required')
        }
    }
}



