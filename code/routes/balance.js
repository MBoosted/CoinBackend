const _ = require('lodash'); 
const auth = require('../middleware/auth');
const {Balance, validate} = require('../models/balance')
const express = require('express');
const router = express.Router();

router.get('/getData', auth, async (req, res) => {

    checkBalance = await Balance.findOne({id: req.user.id});
    res.status(200).send(_.pick(user, ['id'] ));
    
});

router.put('/addBalance', auth, async (req, res) => {

    const{ error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);   
    }
    try {
        userBalance = await Balance.findOne({id: req.user.id});
    } catch (error) {
        res.status(404).send('critical error');
    }

    userBalance.actualBalance = userBalance.actualBalance + req.body.amount;
    userBalance.completeBalance = userBalance.completeBalance + req.body.amount;

    var conditions = {
        actualBalance: userBalance.actualBalance,
        completeBalance: userBalance.completeBalance
    };

    userBalance.update(conditions, req.body)
    .then(doc => {
        if(!doc) { return res.status(404)}
    })


    res.status(200).send(_.pick(userBalance, ['actualBalance', 'completeBalance', 'BalancePerDay'] ));
  
});

router.put('/addBalance', auth, async (req, res) => {

    const{ error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);   
    }
    try {
        userBalance = await Balance.findOne({id: req.user.id});
    } catch (error) {
        res.status(404).send('critical error');
    }

    userBalance.actualBalance = userBalance.actualBalance + req.body.amount;
    userBalance.completeBalance = userBalance.completeBalance + req.body.amount;
    userBalance.BalancePerDay.numbers.push(actualBalance);

    var conditions = {
        actualBalance: userBalance.actualBalance,
        completeBalance: userBalance.completeBalance,
        
    };

    userBalance.update(conditions, req.body)
    .then(doc => {
        if(!doc) { return res.status(404)}
    })


    res.status(200).send(_.pick(userBalance, ['actualBalance', 'completeBalance', 'BalancePerDay'] ));
  
});

router.put('/withdrawBalance', auth, async (req, res) => {

    const{ error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);   
    }
    try {
        userBalance = await Balance.findOne({id: req.user.id});
    } catch (error) {
        res.status(404).send('critical error');
    }

    userBalance.actualBalance = userBalance.actualBalance - req.body.amount;

    var conditions = {
        actualBalance: userBalance.actualBalance,
        completeBalance: userBalance.completeBalance
    };

    userBalance.update(conditions, req.body)
    .then(doc => {
        if(!doc) { return res.status(404)}
    })


    res.status(200).send(_.pick(userBalance, ['actualBalance', 'completeBalance', 'BalancePerDay'] ));
  
});

router.get('/getBalance', auth, async (req, res) => {

    const{ error } = validate(req.body);
    try {
        userBalance = await Balance.findOne({id: req.user.id});
    } catch (error) {
        res.status(404).send('critical error');
    }

    res.status(200).send(_.pick(userBalance, ['actualBalance', 'completeBalance', 'BalancePerDay'] ));
  
});
module.exports = router; 