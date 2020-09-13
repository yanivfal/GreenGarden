var express = require('express');
var router = express.Router();
const verifyUser = require('../lib/middlewares/userVerifier');
const Cart = require('../models/cartModel');
const Purchase = require('../models/purchaseModel');
const isAdmin = require('../lib/middlewares/adminVerifier');


router.get('/', isAdmin, async function(req, res, next) {
    try {
        const purchases = await Purchase.find({}).sort({_id:1});
        return res.status(200).send(purchases);
      }
      catch (err){
        return res.status(400).send(err);
    } 
});

router.post('/' , verifyUser,  async function(req, res, next) {
    try{
        const userId = req.session.clientId;

        const newPurchace = await new Purchase({userId: userId, items: req.body.items, address: req.body.address, personal: req.body.personal});

        await newPurchace.save();

        return res.status(200).send({});
    }
    catch (err){
        return res.status(400).send(err);
    }    
});

module.exports = router;