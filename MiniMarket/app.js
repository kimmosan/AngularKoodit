var express = require('express');
var path = require('path');
var user = require('./user.js');

var app = express();

//this function is executed for every request
app.use(function(req,res,next){
    //check e.g. user session here
    //console.log("---");
    //console.log(req.method);
    next();
});

app.use('/data', user);

app.use('/add', function(){
   console.log("nahka"); 
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);