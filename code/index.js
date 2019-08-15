require('express-async-errors');
const winston = require('winston'); 
const error = require('./middleware/error');
const Fawn = require('fawn');
const hostname = require('./middleware/hostname');
const config = require('config');
const mongoose = require('mongoose');
const user = require("./routes/user");
const balance = require("./routes/balance");
const helmet = require('helmet');
const express = require('express');
const app = express();

winston.add(winston.transports.File, { filename: 'logfile.log'});

winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

process.on('unhandledPrjection', (ex) => {
    throw ex;
});

if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwt variable is not set');
    process.exit(1);
}

mongoose.connect("mongodb://localhost:27017/devpage", { useNewUrlParser: true })
    .then(() => console.log('Connected to DB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));

Fawn.init(mongoose);

app.use(express.json());
app.use(helmet());

//Route to user functionality// 
app.use('/api/user', hostname , user );
//Route to balance functionality// 
app.use('/api/balance', hostname, balance );

app.use(error);


app.listen(3000, () => console.log('Port 3000..'));