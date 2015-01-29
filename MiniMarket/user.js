var express = require('express');

var router = express.Router();

var dummy = [];

router.get('/', function(req,res){
    console.log("Dummy");

    res.send(dummy);
});

router.post('/', function(req,res){
    dummy.push(req.body);
    res.send("Save OK");
});

router.put('/', function(req,res){
    
});

router.delete('/', function(req,res){
    dummy.splice(req.query.id,1);
    res.send("Delete OK");
});

module.exports = router;