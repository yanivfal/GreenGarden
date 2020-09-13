module.exports = function addCorsHeaders(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET,PUT,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Max-Age', 86400);
    res.header('Access-Control-Allow-Credentials', true);
    next();
}