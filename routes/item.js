var express = require('express');

var Item = require('../services/item');
var router = express.Router();

router.get('/items', function(request, response){
   Item.list(function(items){
       //console.log(items); //DEBUG
       response.json(items);
   }, function(error){
       response.status(400).json(error);
   }); 
});

router.post('/items', function(request, response){
   Item.save(request.body.name, function(item){
       response.status(201).json(item);
   }, function(error){
      response.status(400).json(error); 
   });
});

router.put('/items/:id', function(request, response){
    Item.put(request.params.id, request.body.name, function(item){
       response.status(200).json(item);
   }, function(error){
      response.status(400).json(error); 
   });
});

router.delete('/items/:id', function(request, response){
    Item.delete(request.params.id, function(item){
       response.status(200).json(item);
   }, function(error){
      response.status(400).json(error); 
   });
});

module.exports = router;