const { body } = require('express-validator');


const cartValidation = [
    body('items').isArray().isLength({ min: 1, max: 1000 }),
    body('items.*.product').isString().isLength({ max: 500 }).notEmpty(),
    body('items.*.qty').isNumeric().isLength({ max: 255 }).notEmpty(),
];

module.exports.cartValidation = cartValidation;