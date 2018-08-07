// express | postgres | sequelize | morgan | cors | body-parser 

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http')
const cors = require('cors');
const db = require('./models/index.js');
const router = require('./router')
const app = express()

//Database Initialization
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://localhost:3306/database')


app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: '*/*' }))
app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('What have you done...')
})
app.use(function (req, res, next) {
    res.status(404).send('Not found...')
})

router(app);
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port, function () {
    console.log('Server connected')
});

console.log('Server listening on: ', port)