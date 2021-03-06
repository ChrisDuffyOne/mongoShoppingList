require('./db/connect');
var express = require('express');
var bodyParser = require('body-parser');
var itemRoutes = require('./routes/item');
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', itemRoutes);
app.use('*', function(request, response){
    response.status(404).json({message: 'Not Found'});
});

//app.listen(8080, function(){ //Can't seem to bind $Port trying this
app.listen(process.env.PORT || 8080, function(){
   console.log('Listening on port 8080'); 
});

exports.app = app;