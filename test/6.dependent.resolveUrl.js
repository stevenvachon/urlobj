"use strict";
var parseUrl   = require("../lib/parseUrl");
var resolveUrl = require("../lib/resolveUrl");
var expect = require("chai").expect;
var urllib = require("url");



function urlTest1(obj)
{
	expect(obj.protocol).to.equal("http:");
	expect(obj.slashes).to.be.true;
	expect(obj.auth).to.be.null;
	expect(obj.host).to.equal("fakeurl.com");
	expect(obj.port).to.be.null;
	expect(obj.hostname).to.equal("fakeurl.com");
	expect(obj.hash).to.be.null;
	expect(obj.search).to.be.null;
	expect(obj.query).to.be.null;
	expect(obj.pathname).to.equal("/dir/filename.html");
	expect(obj.path).to.equal("/dir/filename.html");
	expect(obj.href).to.equal("http://fakeurl.com/dir/filename.html");
	expect(obj.extra.protocolTruncated).to.equal("http");
	expect(obj.extra.portIsDefault).to.be.true;
	expect(obj.extra.directory).to.deep.equal([ "dir" ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal({});
}



describe("resolveUrl", function()
{
	it("should work", function(done)
	{
		var from,to;
		
		from = "http://fakeurl.com/dir/to/filename.html";
		to = "../filename.html"
		urlTest1( resolveUrl( from, to ) );
		urlTest1( resolveUrl( urllib.parse(from), urllib.parse(to) ) );
		urlTest1( resolveUrl( parseUrl(from), parseUrl(to) ) );
		
		//expect( resolveUrl("//localhost/path/to/filename.html", "/path/filename.html") ).to.equal("//localhost/path/filename.html");
		//expect( resolveUrl("http://fakeurl.com/", "//localhost/path/to/filename.html") ).to.equal("http://localhost/path/to/filename.html");  // should it have http: ?
		
		done();
	});
});
