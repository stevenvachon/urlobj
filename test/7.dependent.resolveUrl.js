"use strict";
var parseUrl   = require("../lib/parseUrl");
var resolveUrl = require("../lib/resolveUrl");
var UrlType    = require("../lib/UrlType");
var expect = require("chai").expect;
var urllib = require("url");



function runTests(testNumber, from, to, slashesDenoteHost)
{
	var urlTest = eval("urlTest" + testNumber);
	
	urlTest( resolveUrl(              from                         ,                  to                          ) );
	urlTest( resolveUrl( urllib.parse(from,false,slashesDenoteHost),                  to                          ) );
	urlTest( resolveUrl(              from                         ,     urllib.parse(to,false,slashesDenoteHost) ) );
	urlTest( resolveUrl( urllib.parse(from,false,slashesDenoteHost),     urllib.parse(to,false,slashesDenoteHost) ) );
	urlTest( resolveUrl(     parseUrl(from,false,slashesDenoteHost),                  to                          ) );
	urlTest( resolveUrl(              from                         ,         parseUrl(to,false,slashesDenoteHost) ) );
	urlTest( resolveUrl(     parseUrl(from,false,slashesDenoteHost),         parseUrl(to,false,slashesDenoteHost) ) );
}



function urlTest1(obj)
{
	expect(obj.protocol).to.equal("http:");
	expect(obj.slashes).to.be.true;
	expect(obj.auth).to.be.null;
	expect(obj.host).to.equal("fakeurl2.com");
	expect(obj.port).to.be.null;
	expect(obj.hostname).to.equal("fakeurl2.com");
	expect(obj.hash).to.be.null;
	expect(obj.search).to.be.null;
	expect(obj.query).to.be.null;
	expect(obj.pathname).to.equal("/dir/to/filename.html");
	expect(obj.path).to.equal("/dir/to/filename.html");
	expect(obj.href).to.equal("http://fakeurl2.com/dir/to/filename.html");
	expect(obj.extra.protocolTruncated).to.equal("http");
	expect(obj.extra.portIsDefault).to.be.true;
	expect(obj.extra.directory).to.deep.equal([ "dir","to" ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal({});
	expect(obj.extra.type).to.equal(UrlType.ABSOLUTE);
}



function urlTest2(obj)
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
	expect(obj.extra.type).to.equal(UrlType.ABSOLUTE);
}



function urlTest3(obj)
{
	expect(obj.protocol).to.equal("http:");
	expect(obj.slashes).to.be.true;
	expect(obj.auth).to.be.null;
	expect(obj.host).to.equal("fakeurl.com");
	expect(obj.port).to.be.null;
	expect(obj.hostname).to.equal("fakeurl.com");
	expect(obj.hash).to.be.null;
	expect(obj.search).to.equal("?query");
	expect(obj.query).to.equal("query");
	expect(obj.pathname).to.equal("/dir/to/filename.html");
	expect(obj.path).to.equal("/dir/to/filename.html?query");
	expect(obj.href).to.equal("http://fakeurl.com/dir/to/filename.html?query");
	expect(obj.extra.protocolTruncated).to.equal("http");
	expect(obj.extra.portIsDefault).to.be.true;
	expect(obj.extra.directory).to.deep.equal([ "dir","to" ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal({ query:"" });
	expect(obj.extra.type).to.equal(UrlType.ABSOLUTE);
}



function urlTest4(obj)
{
	expect(obj.protocol).to.equal("http:");
	expect(obj.slashes).to.be.true;
	expect(obj.auth).to.be.null;
	expect(obj.host).to.equal("fakeurl.com");
	expect(obj.port).to.be.null;
	expect(obj.hostname).to.equal("fakeurl.com");
	expect(obj.hash).to.equal("#hash");
	expect(obj.search).to.equal("?query");
	expect(obj.query).to.equal("query");
	expect(obj.pathname).to.equal("/dir/to/filename.html");
	expect(obj.path).to.equal("/dir/to/filename.html?query");
	expect(obj.href).to.equal("http://fakeurl.com/dir/to/filename.html?query#hash");
	expect(obj.extra.protocolTruncated).to.equal("http");
	expect(obj.extra.portIsDefault).to.be.true;
	expect(obj.extra.directory).to.deep.equal([ "dir","to" ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal({ query:"" });
	expect(obj.extra.type).to.equal(UrlType.ABSOLUTE);
}



function urlTest5(obj)
{
	expect(obj.protocol).to.be.null;
	expect(obj.slashes).to.be.null;
	expect(obj.auth).to.be.null;
	expect(obj.host).to.be.null;
	expect(obj.port).to.be.null;
	expect(obj.hostname).to.be.null;
	expect(obj.hash).to.equal("#hash");
	expect(obj.search).to.equal("?query");
	expect(obj.query).to.equal("query");
	expect(obj.pathname).to.equal("dir/to/dir/to/filename.html");
	expect(obj.path).to.equal("dir/to/dir/to/filename.html?query");
	expect(obj.href).to.equal("dir/to/dir/to/filename.html?query#hash");
	expect(obj.extra.protocolTruncated).to.be.null;
	expect(obj.extra.portIsDefault).to.be.null;
	expect(obj.extra.directory).to.deep.equal([ "dir","to","dir","to" ]);
	expect(obj.extra.directoryLeadingSlash).to.be.false;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal({ query:"" });
	expect(obj.extra.type).to.equal(UrlType.DIRECTORY_RELATIVE);
}



describe("resolveUrl", function()
{
	it("should work", function(done)
	{
		var from,to;
		
		from = "http://fakeurl1.com/dir/to/filename.html";
		to   = "http://fakeurl2.com/dir/to/filename.html";
		runTests(1, from, to);
		
		from = "http://fakeurl1.com/dir/to/filename.html";
		to   = "//fakeurl2.com/dir/to/filename.html";
		runTests(1, from, to, true);
		
		from = "http://fakeurl.com/dir/to/filename.html";
		to   = "../filename.html";
		runTests(2, from, to);
		
		from = "http://fakeurl.com/dir/to/filename.html?query";
		to   = "?query";
		runTests(3, from, to);
		
		from = "http://fakeurl.com/dir/to/filename.html?query#hash";
		to   = "#hash";
		runTests(4, from, to);
		
		from = "dir/to/filename.html?query#hash";
		to   = "dir/to/filename.html?query#hash";
		runTests(5, from, to);
		
		/*from = "http://fakeurl.com/dir/to/filename.html?query";
		to   = "/";
		console.log( resolveUrl(              from ,              to  ) );
		console.log( urllib.resolve(          from ,              to  ) );*/
		
		//expect( resolveUrl("//localhost/path/to/filename.html", "/path/filename.html") ).to.equal("//localhost/path/filename.html");
		//expect( resolveUrl("http://fakeurl.com/", "//localhost/path/to/filename.html") ).to.equal("http://localhost/path/to/filename.html");  // should it have http: ?
		
		done();
	});
});
