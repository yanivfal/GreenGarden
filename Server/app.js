var express = require('express');
//var Ddos = require('ddos')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const addCorsHeaders = require('./lib/middlewares/corsHeaders');
dotenv.config();
var redisConnector = require('./lib/redis/redisConnector');
//var ddos = new Ddos({burst:100, limit:150});

//Import routes
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartRouter = require('./routes/cart');
var purchasesRouter = require('./routes/purchases');

//conect to DB
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true}).then(() => {
    console.log("connected to MongoDB");
});
//() => console.log("connected to MongoDB"));

var app = express();
//app.use(ddos.express);

app.use(logger('dev'));
app.use(addCorsHeaders);
app.use(express.json());

app.use(redisConnector.sessionConfig);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/purchases', purchasesRouter);

module.exports = app;

//require('./tests/test');