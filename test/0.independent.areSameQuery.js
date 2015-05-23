"use strict";
var areSameQuery = require("../lib/areSameQuery");
var expect = require("chai").expect;



describe("areSameQuery", function()
{
	it("should work", function(done)
	{
		var query1,query2;
		
		query1 = { query:["1","2"], var2:"" };
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.true;
		
		query1 = { query:["2","1"], var2:"" };
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.true;
		
		query1 = { query:["1"], var2:"" };
		query2 = { query:["2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = { query:["1","2"], var2:"" };
		query2 = { query:["1","3"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = { query:["1","2"], var2:"asdf" };
		query2 = { query:["1","2"], var2:"asdf" };
		expect( areSameQuery(query1,query2) ).to.be.true;
		
		query1 = { query:["1","2"], var2:"asdf" };
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = { query:["1","2"], var2:"" };
		query2 = { query:["1","2"] };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = { query:"1", var2:"" };
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = { var2:"" };
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = {};
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = {};
		query2 = {};
		expect( areSameQuery(query1,query2) ).to.be.true;
		
		done();
	});
});
