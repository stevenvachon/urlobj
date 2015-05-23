"use strict";
var joinQuery = require("../lib/joinQuery");
var expect = require("chai").expect;



describe("joinQuery", function()
{
	it("should work", function(done)
	{
		expect( joinQuery({}) ).to.equal("");
		expect( joinQuery({ "":"" }) ).to.equal("?=");
		expect( joinQuery({ " ":" " }) ).to.equal("?%20=+");
		expect( joinQuery({ query:"" }) ).to.equal("?query=");
		expect( joinQuery({ query:"value" }) ).to.equal("?query=value");
		expect( joinQuery({ var1:"value1", var2:"", var3:"value3" }) ).to.equal("?var1=value1&var2=&var3=value3");
		expect( joinQuery({ query:["value1","","value3"] }) ).to.equal("?query=value1&query=&query=value3");
		
		expect( joinQuery({},true) ).to.equal("");
		expect( joinQuery({ "":"" },true) ).to.equal("");
		expect( joinQuery({ " ":"" },true) ).to.equal("");
		expect( joinQuery({ query:"" },true) ).to.equal("");
		expect( joinQuery({ query:"value" },true) ).to.equal("?query=value");
		expect( joinQuery({ var1:"value1", var2:"", var3:"value3" },true) ).to.equal("?var1=value1&var3=value3");
		expect( joinQuery({ query:["value1","","value3"] },true) ).to.equal("?query=value1&query=value3");
		
		done();
	});
});
