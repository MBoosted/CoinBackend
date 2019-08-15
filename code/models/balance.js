const mongoose = require('mongoose');
const _ = require('lodash'); 
const Joi = require('joi');

const balanceSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    actualBalance: {
        type: Number,
        required: true,
        default: 0.0
    },
    completeBalance: {
        type: Number,
        required: true,
        default: 0.0
    },
    BalancePerDay: {
        numbers: [Number]
    }
});

const Balance = mongoose.model('balance', balanceSchema); 

function validateBalance(Balance){
    
    const schema = {
        amount: Joi.number().min(2).required(),
    };

    return Joi.validate(Balance, schema);
};

exports.Balance = Balance;
exports.validate = validateBalance;
