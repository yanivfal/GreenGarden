const session = require('express-session');
const redis  = require('redis');
const connectRedis = require('connect-redis');

const redisStore = connectRedis(session);
const redisClient = redis.createClient();
const secret = process.env.Cookie_SECRET;


module.exports.sessionConfig = session({
    store: new redisStore({client: redisClient}),
    secret: secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: false,
        sameSite: 'none',
        maxAge: 1000 * 60 * 30
    }
});