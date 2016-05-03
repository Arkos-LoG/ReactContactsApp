
'use strict'

var supertest = require('supertest');
var should = require('should');
var _ = require('lodash');
var constants = require('./constants');

var server = supertest.agent(constants.url)


describe("Images SearchByKeywords: ", function () {
	
	var images;
	
	//first get the app session data
	before(function (done) {
		server
			.get("/V4/Lookups/GetAppSessionData?appName=Kepler")
			.expect(200)
			.end(function (err, res) {
			
			if (err) throw err;
			
			server.saveCookies(res);
			
			done();
		});

	});
	
	// then make the image search call  
	
	before(function (done) {
		
		server
            .get("/V4/images/SearchByKeywords?categoryFilter=&entitledOnly=false&freeOnly=false&imageSetFilter=&keywords=&layerType=All&patternFilter=&purchaseOnly=false&resultCount=200&searchOrder=Descending&searchSort=Relevance&startIndex=1&subscriptionOnly=false&typeFilter=&userType=Both")
            .expect(200)
            .end(function (err, res) {
			
			res.status.should.equal(200);
			
			if (err) throw err;
			
			images = res.body;
			
			images.images.should.be.instanceof(Array);
			images.images.length.should.be.above(0);

			done();
		});

	});
		
	it('IsFill false for all images', function (done) {
		
		// RED LIGHT - for making sure the test works
		//images.images[0].isFill = true 
		
		images.images.should.be.instanceof(Array);
		images.images.length.should.be.above(0);
		
		_.each(images.images, function (image) {
			
			image.should.have.property('isFill', false);
			
		});
		
		done();

	});
	
	it('InAccess Flag Test For Each Image Returned', function (done) {
		
		var imageIDs = _.flatten(_.map(images.images, 'imageId')).toString();

		server
		.get("/V4/IntegrationTests/Images_SearchByKeywords_InAccess?imageIDs=" + imageIDs)
		.expect(200)
		.end(function (err, res) {
					
			res.status.should.equal(200);
					
			if (err) throw err;
					
			var verify = res.body;
					
			verify.should.be.instanceof(Array);
			verify.length.should.be.above(0);		
			(verify.length).should.eql(images.images.length);

			_.each(images.images, function (image) {
						
				image.should.have.property('inAccess');

				var compare = _.filter(verify, { id: image.imageId })
				compare[0].should.have.property('inAccess');
						
				(compare[0].id).should.eql(image.imageId);
				(compare[0].inAccess).should.eql(image.inAccess);

			});
					
			done();
		});

				
	});


	// TODO: extendedAttributes test (neptune)
	// TODO: 324 should return only neptune images (neptune)
	// TODO: 324 and another categoryid should return only neptune images within the given category (neptune)
	

});
