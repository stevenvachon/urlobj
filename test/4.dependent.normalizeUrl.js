"use strict";
var normalizeUrl = require("../lib/normalizeUrl");
var parseUrl     = require("../lib/parseUrl");
var expect = require("chai").expect;
var urllib = require("url");



function urlTest(obj)
{
	expect(obj.protocol).to.equal("http:");
	expect(obj.slashes).to.be.true;
	expect(obj.auth).to.equal("user:pass");
	expect(obj.host).to.equal("fakeurl.com");
	expect(obj.port).to.be.null;
	expect(obj.hostname).to.equal("fakeurl.com");
	expect(obj.hash).to.equal("#hash");
	expect(obj.search).to.equal("?query=1&query=2&var2=");
	expect(obj.query).to.equal("query=1&query=2&var2=");
	expect(obj.pathname).to.equal("/dir/filename.html");
	expect(obj.path).to.equal("/dir/filename.html?query=1&query=2&var2=");
	expect(obj.href).to.equal("http://user:pass@fakeurl.com/dir/filename.html?query=1&query=2&var2=#hash");
	expect(obj.extra.protocolTruncated).to.equal("http");
	expect(obj.extra.portIsDefault).to.be.true;
	expect(obj.extra.directory).to.deep.equal([ "dir" ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal({ query:["1","2"], var2:"" });
}



describe("normalizeUrl", function()
{
	it("should work", function(done)
	{
		var urlString;
		
		urlString = "http://user:pass@fakeurl.com:80/dir/to/../filename.html?query=1&query=2&var2=#hash";
		urlTest( normalizeUrl( urlString ) );
		urlTest( normalizeUrl( urllib.parse(urlString) ) );
		urlTest( normalizeUrl( parseUrl(urlString) ) );
		
		urlString = "http://user:pass@fakeurl.com:80/dir/filename.html?query=1&query=2&var2=#hash";
		urlTest( normalizeUrl( urlString ) );
		urlTest( normalizeUrl( urllib.parse(urlString) ) );
		urlTest( normalizeUrl( parseUrl(urlString) ) );
		
		done();
	});
});