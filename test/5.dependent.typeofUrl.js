"use strict";
var parseUrl  = require("../lib/parseUrl");
var typeofUrl = require("../lib/typeofUrl");
var UrlType   = require("../lib/UrlType");
var expect = require("chai").expect;



// TODO :: remove this and move the function to parseUrl.js ?
describe("typeofUrl", function()
{
	// TODO :: test all url variations (including strings)
	it("should work", function(done)
	{
		var urlObj;
		
		urlObj = parseUrl("http://fakeurl.com/dir1/dir2/index.html?query#hash");
		expect( typeofUrl(urlObj) ).to.equal(UrlType.ABSOLUTE);
		
		urlObj = parseUrl("//fakeurl.com/dir1/dir2/index.html?query#hash", {slashesDenoteHost:true});
		expect( typeofUrl(urlObj) ).to.equal(UrlType.PROTOCOL_RELATIVE);
		
		urlObj = parseUrl("//fakeurl.com/dir1/dir2/index.html?query#hash");
		expect( typeofUrl(urlObj) ).to.equal(UrlType.ROOT_RELATIVE);
		
		urlObj = parseUrl("/dir1/dir2/index.html?query#hash");
		expect( typeofUrl(urlObj) ).to.equal(UrlType.ROOT_RELATIVE);
		
		urlObj = parseUrl("/");
		expect( typeofUrl(urlObj) ).to.equal(UrlType.ROOT_RELATIVE);
		
		urlObj = parseUrl("dir1/dir2/index.html?query#hash");
		expect( typeofUrl(urlObj) ).to.equal(UrlType.DIRECTORY_RELATIVE);
		
		urlObj = parseUrl("../dir1/dir2/index.html?query#hash");
		expect( typeofUrl(urlObj) ).to.equal(UrlType.DIRECTORY_RELATIVE);
		
		urlObj = parseUrl("index.html?query#hash");
		expect( typeofUrl(urlObj) ).to.equal(UrlType.FILENAME_RELATIVE);
		
		urlObj = parseUrl("?query#hash");
		expect( typeofUrl(urlObj) ).to.equal(UrlType.QUERY_RELATIVE);
		
		urlObj = parseUrl("#hash");
		expect( typeofUrl(urlObj) ).to.equal(UrlType.HASH_RELATIVE);
		
		urlObj = parseUrl("");
		expect( typeofUrl(urlObj) ).to.equal(UrlType.EMPTY);
		
		done();
	});
});
