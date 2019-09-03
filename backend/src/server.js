const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes');

const server = express();
mongoose.connect('mongodb+srv://salatiel:salatiel@cluster0-tjiqq.mongodb.net/Rocket2019Tindev?retryWrites=true&w=majority', {
    useNewUrlParser : true
});

server.use(express.json());
server.use(routes);

server.listen(3333);

// M-Model; V-Voew; C-Controller