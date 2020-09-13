const jwt = require('jsonwebtoken');

// module.exports = function isAdmin(req, res, next) {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(400).send({errors: {message: 'invalid token'}});
//     }

//     try {
//         const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = verified;

//         if (req.user.userType != 'admin') {
//             return res.status(400).json({errors: {message: 'You need admin permissions for this action'}});
//         }

//         next();
//     } catch(err) {
//         return res.status(400).send('Token is invalid');
//     }
// }

module.exports = function isAdmin(req, res, next) {
    if (!req.session || !req.session.clientId) {
        return res.status(400).send('Access denied');
    }

    if (!(req.session.role === 'admin')) {
        return res.status(400).send('You need admin permissions for this action');
    }

    next();
}