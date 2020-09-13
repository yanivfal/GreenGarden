var express = require('express');
var router = express.Router();
const Cart = require('../models/cartModel');
const { cartValidation } = require('../lib/validations/cart');
const { validationResult } = require('express-validator');
const verifyUser = require('../lib/middlewares/userVerifier');

router.get('/', verifyUser, async function(req, res, next) {
    try {
        let itemsList = await Cart.findOne({userId: req.session.clientId}).select('items').populate('items.product');

        if (!itemsList) {
            const newCart = await new Cart({userId: req.session.clientId, items: []});
            await newCart.save();
            return res.send([]);
        }

        return res.send(itemsList.items);
      }
      catch (err){
        return res.status(400).send(err);
    } 
});

router.post('/' , verifyUser , cartValidation,  async function(req, res, next) {
    try{
        const userId = req.session.clientId;

        const errors = validationResult(req);

        if (!errors.isEmpty())  return res.status(400).json({ errors: errors.array() });

        const isCartExist = await Cart.findOne({userId: userId});

        if (isCartExist) {
          return res.status(400).json({ errors: `Cart is already exist` });
        }

        const newCart = await new Cart({userId: userId, items: req.body.items});
        await newCart.save();
        
        return res.redirect('/api/cart');
    }
    catch (err){
        return res.status(400).send(err);
    }    
});

router.delete('/' , verifyUser,  async function(req, res, next) {
    try {
        await Cart.deleteOne({userId: req.session.clientId});
    }
    catch (err) {
        return res.status(400).send(err);
    }

    return res.sendStatus(200);    
});

router.delete('/:productId' , verifyUser,  async function(req, res, next) {
    try {
        await Cart.updateOne( {userId:req.session.clientId}, { "$pull": { "items": { "product": req.params.productId }}})
    }
    catch (err) {
        return res.status(400).send(err);
    } 
    
    return res.status(200).send({}); 
});

router.put('/' , verifyUser , cartValidation,  async function(req, res, next) {
    try{
        const userId = req.session.clientId;

        const errors = validationResult(req);

        if (!errors.isEmpty())  return res.status(400).json({ errors: errors.array() });

        const cart = await Cart.findOneAndReplace({userId: userId}, {userId: userId, items: req.body.items});

        if (!cart) {
          return res.status(400).send(`Cart not exist`);
        }
        
        return res.status(200).send({});
    }
    catch (err){
        return res.status(400).json(err);
    } 
});

module.exports = router;
