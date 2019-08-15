const Fawn = require('fawn');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash'); 
const {User, validate} = require('../models/user')
const express = require('express');
const router = express.Router();




router.post('/register',async (req, res) => {

    const{ error } = validate(req.body);
    if (error) {
        return res.send(error.details[0].message);   
    }

    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).send('email allready in use');
    }

    checkUsername = await User.findOne({username: req.body.username});
    if (checkUsername) {
        return res.status(400).send('User already registerd');
    }

    user = new User(_.pick(req.body, ['username', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
        
    var task = Fawn.Task(); 
    
            task.save("users", user)
            .save("balances", new Balance(_.pick(user, ['id'] )))
            .run();
            var userBalance = new Balance(_.pick(user, ['id'] ));
        res.status(200).send(_.pick(user, ['id'] ));
    
});

router.post('/login',async (req, res) => {

    user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send('Invalied username or password');
    }

    const validPassowrd = await bcrypt.compare(req.body.password, user.password)

    if (!validPassowrd) {
        return res.status(400).send('Invalied username or password');
    }

    const token = user.generateAuthToken();

    res.header('X-Auth-Token', token).send('logged in');
    
});

router.get('/getData', auth,  async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    //console.log(user);
    res.status(200).send(user);
});




module.exports = router; 