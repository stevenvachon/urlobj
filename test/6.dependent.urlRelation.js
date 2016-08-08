"use strict";
var parseUrl     = require("../lib/parseUrl");
var UrlComponent = require("../lib/UrlComponent");
var urlRelation  = require("../lib/urlRelation");
var expect = require("chai").expect;



describe("urlRelation", function()
{
	// TODO :: test all url variations (including strings)
	it("should work", function(done)
	{
		var urlObj1,urlObj2;
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.HASH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		urlObj2 = parseUrl("");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.HASH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.HASH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/");
		urlObj2 = parseUrl("");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.HASH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html#hash");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.PATH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html#hash");
		urlObj2 = parseUrl("");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.PATH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html?query");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.FILENAME);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html?query");
		urlObj2 = parseUrl("");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.HASH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html?query");
		urlObj2 = parseUrl("?query");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.HASH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index.html?query");
		urlObj2 = parseUrl("#hash");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.PATH);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index2.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index1.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.DIRECTORY);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/index2.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.DIRECTORY);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.AUTH);
		
		urlObj1 = parseUrl("http://fakeurl.com/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.AUTH);
		
		urlObj1 = parseUrl("http://fakeurl.com:81/dir1/dir2/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.HOSTNAME);
		
		urlObj1 = parseUrl("http://fakeurl2.com/dir1/dir2/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.PROTOCOL);
		
		urlObj1 = parseUrl("https://fakeurl.com/dir1/dir2/index.html");
		urlObj2 = parseUrl("http://fakeurl.com/dir1/dir2/index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.NOTHING);
		
		urlObj1 = parseUrl("http://fakeurl.com/dir1/dir2/filename.html?query");
		urlObj2 = parseUrl("");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.HASH);
		
		// Will not resolve paths because there is no `from` and `to`
		urlObj1 = parseUrl("https://fakeurl.com/index.html");
		urlObj2 = parseUrl("../../../index.html");
		expect( urlRelation(urlObj1,urlObj2) ).to.equal(UrlComponent.AUTH);
		
		done();
	});
});
