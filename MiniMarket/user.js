var express = require('express');

var router = express.Router();

router.get('/', function(req,res){
    console.log("Dummy");
    var dummy = [{name:"maito", price:"3"},
                 {name:"kalja", price:"1"}];
    res.send(dummy);
});

router.post(function(req,res){
    
});

router.put(function(req,res){
    
});

router.delete(function(req,res){
    
});

module.exports = router;