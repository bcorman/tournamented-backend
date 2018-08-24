const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./models/index.js');
const router = require('./router');
const mongoose = require('mongoose');
const app = express();



app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: '*/*'}));

router(app);
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port, function () {
    console.log('Server connected');
});

console.log('Server listening on: ', port);

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('What have you done...');
});
app.use(function (req, res, next) {
    res.status(404).send('Not found...');
});
// Database Initialization

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/tournamented',
    {useNewUrlParser: true }
);
