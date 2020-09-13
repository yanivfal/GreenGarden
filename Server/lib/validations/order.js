const { body } = require('express-validator');


const orderValidation = [
    // body('name').isAlpha().isLength({ min: 2, max: 255 }),
    // body('price').isNumeric().isLength({ max: 255 }),
    // body('categories').isArray()
  ];

module.exports.orderValidation = orderValidation;