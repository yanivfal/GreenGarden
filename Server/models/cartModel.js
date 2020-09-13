const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require,
        trim: true,
        unique: true
    },
    items: [{
        qty: {
            type: Number,
            required: true,
            trim: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            require: true,
            trim: true
        }
    }],
    modifiedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model('Cart', cartSchema);