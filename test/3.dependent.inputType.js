"use strict";
var inputType  = require("../lib/inputType");
var InputTypes = require("../lib/InputTypes");
var parseUrl   = require("../lib/parseUrl");
var expect = require("chai").expect;
var urllib = require("url");



describe("inputType", function()
{
	it("should work", function(done)
	{
		var urlString = "http://fakeurl.com/";
		
		expect( inputType(1) ).to.equal(InputTypes.OTHER);
		expect( inputType([]) ).to.equal(InputTypes.OTHER);
		expect( inputType({}) ).to.equal(InputTypes.OTHER);
		
		expect( inputType(urlString) ).to.equal(InputTypes.STRING);
		expect( inputType(urllib.parse(urlString)) ).to.equal(InputTypes.CORE_URL_OBJECT);
		expect( inputType(parseUrl(urlString)) ).to.equal(InputTypes.URLOBJ);
		
		done();
	});
});
