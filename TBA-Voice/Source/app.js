console.log('ehskdfjle');
var http = require('http');
var path= require('path');
var express = require('express');
var favicon = require('favicon');

console.log('ehskdfjle');
var app = express();
app.get('/',function(req,res){
     res.send('something in here').end();
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
     console.log('We have port number 3000, running');
});
