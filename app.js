const http = require('http');
var express = require('express');
const bodyParser = require('body-parser');

var app = module.exports =  express();

bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

(require('./routes/appRoutes')(app));

http.createServer(app).listen(4000);



