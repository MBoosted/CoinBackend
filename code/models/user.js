const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash'); 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastLogin: Date, 
    active: Boolean

});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this.id, username: this.username}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('user', userSchema); 

const complexityOptions = {
    min: 5,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
}

function validateUser(User){
    
    const schema = {
        username: Joi.string().min(3).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: new PasswordComplexity(complexityOptions).required()
    };

    return Joi.validate(User, schema);
};

exports.User = User;
exports.validate = validateUser;
