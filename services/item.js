var Item = require('../models/item');

exports.save = function(name, callback, errorback){
    Item.create({name: name},function(error, item){
       if(error){
           errorback(error);
           return;
       }
       callback(item);
    });
};

exports.list = function(callback, errorback){
  Item.find(function(error, items){
      if(error){
          errorback(error);
          return;
      }
      callback(items);
  });  
};

exports.put = function(identNum, newName, callback, errorback){
    Item.findOneAndUpdate({_id: identNum}, {name: newName}, {upsert:true}, function(error, item){
        if (error || !item){
            errorback(error);
            return;
        }
        callback(item);
    });
};

exports.delete = function(identNum, callback, errorback){
    Item.findOneAndRemove({_id: identNum}, function(error, item){
        if(error || !item){
            errorback(error);
            return;
        }
        callback(item);
    });
};