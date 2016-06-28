var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

var paramID;

describe('Shopping List', function(){
   before(function(done){
       seed.run(function(){
           done();
       });
   });
   
   it('should list items on GET',function(done){
		chai.request(app)
			.get('/items')
			.end(function(error, response){
				should.equal(error, null);
				response.should.have.status(200);
				response.should.be.json;
				response.body.should.be.a('array');
				response.body.should.have.length(3);
				response.body[0].should.be.a('object');
				response.body[0].should.have.property('_id');
				response.body[0].should.have.property('name');
				response.body[0].name.should.be.a('string');
				console.log(response.body);
				/*response.body[0].name.should.equal('Broad beans');
				response.body[1].name.should.equal('Tomatoes');
				response.body[2].name.should.equal('Peppers');*/
				done();
			});
	});
	
	it('should add Kale on POST', function(done){
		chai.request(app)
			.post('/items')
			.send({'name': 'Kale'})
			.end(function(error, response){
				should.equal(error,null);
				response.should.have.status(201);
				response.should.be.json;
				response.body.should.be.a('object');
				response.body.should.have.property('name');
				response.body.should.have.property('_id');
				response.body.name.should.be.a('string');
				response.body.name.should.equal('Kale');
				done();
			});
	});
	
	it('should list Kale on GET',function(done){
		chai.request(app)
			.get('/items')
			.end(function(error, response){
				should.equal(error, null);
				response.should.have.status(200);
				response.should.be.json;
				response.body.should.be.a('array');
				response.body.should.have.length(4);
				response.body[0].should.be.a('object');
				response.body[0].should.have.property('_id');
				response.body[0].should.have.property('name');
				response.body[0].name.should.be.a('string');
				response.body[0].name.should.equal('Broad beans');
				response.body[1].name.should.equal('Tomatoes');
				response.body[2].name.should.equal('Peppers');
				response.body[3].should.be.a('object');
				response.body[3].should.have.property('_id');
				response.body[3].should.have.property('name');
				response.body[3].name.should.be.a('string');
				response.body[3].name.should.equal('Kale');
				
				paramID = response.body[3]._id;
				done();
			});
	});
	
	it('should edit Kale on PUT',function(done){
		chai.request(app)
			.put('/items/'+paramID)
			.send({'name': 'Bacon'})
			.end(function(error, response){
				should.equal(error, null);
				response.should.have.status(200);
				response.should.be.json;
				response.body.should.be.a('object');
				response.body.should.have.property('name');
				response.body.should.have.property('_id');
				response.body.name.should.be.a('string');
				response.body.name.should.equal('Kale');
				response.body._id.should.equal(paramID);
				done();
			});
	});

    it('should list Bacon on GET',function(done){
		chai.request(app)
			.get('/items')
			.end(function(error, response){
				should.equal(error, null);
				response.should.have.status(200);
				response.should.be.json;
				response.body.should.be.a('array');
				response.body.should.have.length(4);
				response.body[3].should.be.a('object');
				response.body[3].should.have.property('_id');
				response.body[3].should.have.property('name');
				response.body[3].name.should.be.a('string');
				response.body[3].name.should.equal('Bacon');
				done();
			});
	});
	
	it('should delete Bacon on DELETE',function(done){
		chai.request(app)
			.delete('/items/'+paramID)
			.send({'name': 'Bacon','_id':paramID})
			.end(function(error, response){
				should.equal(error, null);
				response.should.have.status(200);
				response.should.be.json;
				
				response.body.should.have.property('_id');
				response.body._id.should.equal(paramID);
				response.body.should.have.property('name');
				response.body.name.should.equal('Bacon');
				done();
			});
	});
	
	it('should show shortened list on GET',function(done){
        chai.request(app)
    			.get('/items')
    			.end(function(error, response){
    				should.equal(error, null);
    				response.should.have.status(200);
    				response.should.be.json;
    				response.body.should.be.a('array');
    				response.body.should.have.length(3);
    				done();
    			});
    });
   
   after(function(done){
       Item.remove(function(){ //deletes all items
          done(); 
       });
   });
});