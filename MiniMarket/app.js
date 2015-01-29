var express = require('express');
var path = require('path');
var user = require('./user.js');
var parser = require('body-parser');

var app = express();

// use body parser middleware
app.use(parser.json());

//this function is executed for every request
//must be declared before any other middleware
app.use(function(req,res,next){
    //check e.g. user session here
    //console.log("---");
    console.log(req.method + ": " + req.query.id);
    next();
});

app.use('/data', user);

/*app.use('/add', function(){
   console.log("/add"); 
});*/

app.use(express.static(path.join(__dirname, 'public')));
app.use("/add", express.static(path.join(__dirname, 'public')));

app.listen(3000);