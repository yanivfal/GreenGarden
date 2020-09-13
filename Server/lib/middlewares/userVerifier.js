const jwt = require('jsonwebtoken');

// module.exports = function verifyUser(req, res, next) {
//     const token = req.header('Authorization');
//     if (!token) {
//         return res.status(400).send('Access denied');
//     }

//     try {
//         const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = verified;
//         next();
//     } catch(err) {
//         return res.status(400).send('Token is invalid');
//     }
// }

module.exports = function verifyUser(req, res, next) {
    if (!req.session || !req.session.clientId) {
        return res.status(401).send('Access denied');
    }

    next();
}