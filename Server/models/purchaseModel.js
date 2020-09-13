const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require,
        trim: true,
    },
    personal: {
        firstName: {
            type: String,
            require,
            trim: true,
        },
        lastName: {
            type: String,
            require,
            trim: true,
        },
        email: {
            type: String,
            require,
            trim: true,
        },
    },
    items: [{
        product: {
            name: {
                type: String,
                require: true,
                trim: true
            },
            price : {
                type: Number,
                require: true,
            },
            imageUrl : {
                type: String,
                require: true,
            },
        },
        qty: {
            type: Number,
            required: true,
            trim: true,
        },
        
    }],
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    isPaid: {
        type: Boolean,
        require,
        trim: true,
        default: true
    },
    total: {
        type: Number,
        require,
        trim: true,
    },
    address: {
        city: {
            type: String,
            require,
            trim: true,
        },
        street: {
            type: String,
            require,
            trim: true,
        },
        homeNumber: {
            type: String,
            require,
            trim: true,
        },
        apartment: {
            type: String,
            require,
            trim: true,
        },
    },
});

module.exports = new mongoose.model('Purchase', purchaseSchema);