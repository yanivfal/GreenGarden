const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 1024,
        match: /^[0-9]+$/
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    userType: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    }
});

//////////////////// Pre Methods ////////////////////
userSchema.pre('save', function(next) {
    const user = this;

    //Check if the password was modified
    if(!user.isModified('password')){
        return next();
    }

    //Hash the password
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

//////////////////// Schema Methods ////////////////////
userSchema.method.checkPassword = async function(guess) {
    return bcrypt.compare(guess, this.password);
}

module.exports = new mongoose.model('User', userSchema);