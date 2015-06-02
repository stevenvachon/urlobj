"use strict";
var parseUrl      = require("../lib/parseUrl");
var UrlComponents = require("../lib/UrlComponents");
var urlRelation   = require("../lib/urlRelation");
var expect = require("chai").expect;



describe("urlRelation", function()
{
	// TODO :: test all url variations (including strings)
	it("should work", function(done)
	{
		var urlObj1,urlObj2
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.HASH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		urlObj2 = parseUrl("");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.HASH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.HASH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/");
		urlObj2 = parseUrl("");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.HASH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html#hash");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.PATH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html#hash");
		urlObj2 = parseUrl("");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.PATH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html?query");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.FILENAME);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html?query");
		urlObj2 = parseUrl("");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.HASH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html?query");
		urlObj2 = parseUrl("#hash");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.PATH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/filename.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.DIRECTORY);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.AUTH);
		
		urlObj1 = parseUrl("http://fakeurl.com:81/dir1/dir2/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.HOSTNAME);
		
		urlObj1 = parseUrl("http://fakeurl2.com/dir1/dir2/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.PROTOCOL);
		
		urlObj1 = parseUrl("https://fakeurl.com/dir1/dir2/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.NOTHING);
		
		// Will not resolve paths because there is no `from` and `to`
		urlObj1 = parseUrl("https://fakeurl.com/index.html");
		urlObj2 = parseUrl("../../../index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponents.AUTH);
		
		done();
	});
});
