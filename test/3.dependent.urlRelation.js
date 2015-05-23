"use strict";
var parseUrl     = require("../lib/parseUrl");
var UrlComponent = require("../lib/UrlComponents");
var urlRelation  = require("../lib/urlRelation");
var expect = require("chai").expect;



describe("urlRelation", function()
{
	it("should work", function(done)
	{
		var urlObj1,urlObj2
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal( UrlComponent.FRAGMENT );
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal( UrlComponent.FRAGMENT );
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/");
		urlObj2 = parseUrl("../index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal( UrlComponent.PORT );
		
		done();
	});
});
