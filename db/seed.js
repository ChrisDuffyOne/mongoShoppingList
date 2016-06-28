var Item = require('../models/item');

exports.run = function(callback, errorback){
    Item.create({name: 'Broad beans'},
                {name: 'Tomatoes'},
                {name: 'Peppers'}, function(error, items){
        if(error){
            errorback(error);
            return;
        }
        callback(items);
    });
};

if(require.main === module){
    require('./connect');
    exports.run(function(){
        var mongoose = require('mongoose');
        mongoose.disconnect();
    }, function(error){
        console.error(error);
    });
}