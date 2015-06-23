"use strict";
var chai = require("chai");
var parseUrl = require("../lib/parseUrl");
var UrlType  = require("../lib/UrlType");
var urllib = require("url");

var expect = chai.expect;
chai.config.includeStack = true;



// NOTE :: Couldn't use deep.equal() because it doesn't use hasOwnProperty()
// and core url.parse() includes functions in its output



function url0_noquery(str, obj)
{
	expect(obj.protocol).to.equal("http:");
	expect(obj.slashes).to.be.true;
	expect(obj.auth).to.equal("user:pass");
	expect(obj.host).to.equal("fakeurl.com:81");
	expect(obj.port).to.equal("81");
	expect(obj.hostname).to.equal("fakeurl.com");
	expect(obj.hash).to.equal("#hash");
	expect(obj.search).to.equal("?query=1&query=2&var2=");
	expect(obj.query).to.equal("query=1&query=2&var2=");
	expect(obj.pathname).to.equal("/dir/to/../filename.html");
	expect(obj.path).to.equal("/dir/to/../filename.html?query=1&query=2&var2=");
	expect(obj.href).to.equal(str);
	expect(obj.extra.protocolTruncated).to.equal("http");
	expect(obj.extra.portIsDefault).to.be.false;
	expect(obj.extra.directory).to.deep.equal([ "dir","to",".." ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal({ query:["1","2"], var2:"" });
	expect(obj.extra.type).to.equal(UrlType.ABSOLUTE);
}

function url0_query(str, obj)
{
	expect(obj.protocol).to.equal("http:");
	expect(obj.slashes).to.be.true;
	expect(obj.auth).to.equal("user:pass");
	expect(obj.host).to.equal("fakeurl.com:81");
	expect(obj.port).to.equal("81");
	expect(obj.hostname).to.equal("fakeurl.com");
	expect(obj.hash).to.equal("#hash");
	expect(obj.search).to.equal("?query=1&query=2&var2=");
	expect(obj.query).to.deep.equal({ query:["1","2"], var2:"" });
	expect(obj.pathname).to.equal("/dir/to/../filename.html");
	expect(obj.path).to.equal("/dir/to/../filename.html?query=1&query=2&var2=");
	expect(obj.href).to.equal(str);
	expect(obj.extra.protocolTruncated).to.equal("http");
	expect(obj.extra.portIsDefault).to.be.false;
	expect(obj.extra.directory).to.deep.equal([ "dir","to",".." ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal(obj.query);
	expect(obj.extra.type).to.equal(UrlType.ABSOLUTE);
}



function url1_noquery(str, obj)
{
	expect(obj.protocol).to.be.null;
	expect(obj.slashes).to.be.true;
	expect(obj.auth).to.be.null;
	expect(obj.host).to.equal("fakeurl.com:81");
	expect(obj.port).to.equal("81");
	expect(obj.hostname).to.equal("fakeurl.com");
	expect(obj.hash).to.equal("#hash");
	expect(obj.search).to.equal("?query=1&query=2&var2=");
	expect(obj.query).to.equal("query=1&query=2&var2=");
	expect(obj.pathname).to.equal("/dir/to/../filename.html");
	expect(obj.path).to.equal("/dir/to/../filename.html?query=1&query=2&var2=");
	expect(obj.href).to.equal(str);
	expect(obj.extra.protocolTruncated).to.be.null;
	expect(obj.extra.portIsDefault).to.be.null;
	expect(obj.extra.directory).to.deep.equal([ "dir","to",".." ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal({ query:["1","2"], var2:"" });
	expect(obj.extra.type).to.equal(UrlType.PROTOCOL_RELATIVE);
}

function url1_noslash_noquery(str, obj)
{
	expect(obj.protocol).to.be.null;
	expect(obj.slashes).to.be.null;
	expect(obj.auth).to.be.null;
	expect(obj.host).to.be.null;
	expect(obj.port).to.be.null;
	expect(obj.hostname).to.be.null;
	expect(obj.hash).to.equal("#hash");
	expect(obj.search).to.equal("?query=1&query=2&var2=");
	expect(obj.query).to.equal("query=1&query=2&var2=");
	expect(obj.pathname).to.equal("//fakeurl.com:81/dir/to/../filename.html");
	expect(obj.path).to.equal("//fakeurl.com:81/dir/to/../filename.html?query=1&query=2&var2=");
	expect(obj.href).to.equal(str);
	expect(obj.extra.protocolTruncated).to.be.null;
	expect(obj.extra.portIsDefault).to.be.null;
	expect(obj.extra.directory).to.deep.equal([ "fakeurl.com:81","dir","to",".." ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal({ query:["1","2"], var2:"" });
	expect(obj.extra.type).to.equal(UrlType.ROOT_RELATIVE);
}

function url1_noslash_query(str, obj)
{
	expect(obj.protocol).to.be.null;
	expect(obj.slashes).to.be.null;
	expect(obj.auth).to.be.null;
	expect(obj.host).to.be.null;
	expect(obj.port).to.be.null;
	expect(obj.hostname).to.be.null;
	expect(obj.hash).to.equal("#hash");
	expect(obj.search).to.equal("?query=1&query=2&var2=");
	expect(obj.query).to.deep.equal({ query:["1","2"], var2:"" });
	expect(obj.pathname).to.equal("//fakeurl.com:81/dir/to/../filename.html");
	expect(obj.path).to.equal("//fakeurl.com:81/dir/to/../filename.html?query=1&query=2&var2=");
	expect(obj.href).to.equal(str);
	expect(obj.extra.protocolTruncated).to.be.null;
	expect(obj.extra.portIsDefault).to.be.null;
	expect(obj.extra.directory).to.deep.equal([ "fakeurl.com:81","dir","to",".." ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal(obj.query);
	expect(obj.extra.type).to.equal(UrlType.ROOT_RELATIVE);
}

function url1_query(str, obj)
{
	expect(obj.protocol).to.be.null;
	expect(obj.slashes).to.be.true;
	expect(obj.auth).to.be.null;
	expect(obj.host).to.equal("fakeurl.com:81");
	expect(obj.port).to.equal("81");
	expect(obj.hostname).to.equal("fakeurl.com");
	expect(obj.hash).to.equal("#hash");
	expect(obj.search).to.equal("?query=1&query=2&var2=");
	expect(obj.query).to.deep.equal({ query:["1","2"], var2:"" });
	expect(obj.pathname).to.equal("/dir/to/../filename.html");
	expect(obj.path).to.equal("/dir/to/../filename.html?query=1&query=2&var2=");
	expect(obj.href).to.equal(str);
	expect(obj.extra.protocolTruncated).to.be.null;
	expect(obj.extra.portIsDefault).to.be.null;
	expect(obj.extra.directory).to.deep.equal([ "dir","to",".." ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal(obj.query);
	expect(obj.extra.type).to.equal(UrlType.PROTOCOL_RELATIVE);
}



function url2_noquery(str, obj)
{
	expect(obj.protocol).to.be.null;
	expect(obj.slashes).to.be.null;
	expect(obj.auth).to.be.null;
	expect(obj.host).to.be.null;
	expect(obj.port).to.be.null;
	expect(obj.hostname).to.be.null;
	expect(obj.hash).to.be.null;
	expect(obj.search).to.be.null;
	expect(obj.query).to.be.null;
	expect(obj.pathname).to.equal("/dir/to/../filename.html");
	expect(obj.path).to.equal("/dir/to/../filename.html");
	expect(obj.href).to.equal(str);
	expect(obj.extra.protocolTruncated).to.be.null;
	expect(obj.extra.portIsDefault).to.be.null;
	expect(obj.extra.directory).to.deep.equal([ "dir","to",".." ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal({});
	expect(obj.extra.type).to.equal(UrlType.ROOT_RELATIVE);
}

function url2_query(str, obj)
{
	expect(obj.protocol).to.be.null;
	expect(obj.slashes).to.be.null;
	expect(obj.auth).to.be.null;
	expect(obj.host).to.be.null;
	expect(obj.port).to.be.null;
	expect(obj.hostname).to.be.null;
	expect(obj.hash).to.be.null;
	expect(obj.search).to.equal("");
	expect(obj.query).to.deep.equal({});
	expect(obj.pathname).to.equal("/dir/to/../filename.html");
	expect(obj.path).to.equal("/dir/to/../filename.html");
	expect(obj.href).to.equal(str);
	expect(obj.extra.protocolTruncated).to.be.null;
	expect(obj.extra.portIsDefault).to.be.null;
	expect(obj.extra.directory).to.deep.equal([ "dir","to",".." ]);
	expect(obj.extra.directoryLeadingSlash).to.be.true;
	expect(obj.extra.filename).to.equal("filename.html");
	expect(obj.extra.filenameIsIndex).to.be.false;
	expect(obj.extra.query).to.deep.equal(obj.query);
	expect(obj.extra.type).to.equal(UrlType.ROOT_RELATIVE);
}



describe("parseUrl", function()
{
	var urls = 
	[
		"http://user:pass@fakeurl.com:81/dir/to/../filename.html?query=1&query=2&var2=#hash",
		
		// Auth removed because it reveals that "//" denotes a host
		"//fakeurl.com:81/dir/to/../filename.html?query=1&query=2&var2=#hash",
		
		"/dir/to/../filename.html"
		
		// TODO :: add path-relative, query-relative, hash-relative URLs?
	];
	
	
	
	describe("with string input", function()
	{
		it("should work", function(done)
		{
			url0_noquery( urls[0], parseUrl(urls[0],false,false) );
			url0_noquery( urls[0], parseUrl(urls[0],false,true) );
			url0_query(   urls[0], parseUrl(urls[0],true,false) );
			url0_query(   urls[0], parseUrl(urls[0],true,true) );
			
			url1_noslash_noquery( urls[1], parseUrl(urls[1],false,false) );
			url1_noquery(         urls[1], parseUrl(urls[1],false,true) );
			url1_noslash_query(   urls[1], parseUrl(urls[1],true,false) );
			url1_query(           urls[1], parseUrl(urls[1],true,true) );
			
			url2_noquery( urls[2], parseUrl(urls[2],false,false) );
			url2_noquery( urls[2], parseUrl(urls[2],false,true) );
			url2_query(   urls[2], parseUrl(urls[2],true,false) );
			url2_query(   urls[2], parseUrl(urls[2],true,true) );
			
			done();
		});
	});
	
	
	
	describe("with object input", function()
	{
		it("should work with matching standard options", function(done)
		{
			url0_noquery( urls[0], parseUrl( urllib.parse(urls[0],false,false), false,false ) );
			url0_noquery( urls[0], parseUrl( urllib.parse(urls[0],false,true), false,true ) );
			url0_query(   urls[0], parseUrl( urllib.parse(urls[0],true,false), true,false ) );
			url0_query(   urls[0], parseUrl( urllib.parse(urls[0],true,true), true,true ) );
			
			url1_noslash_noquery( urls[1], parseUrl( urllib.parse(urls[1],false,false), false,false ) );
			url1_noquery(         urls[1], parseUrl( urllib.parse(urls[1],false,true), false,true ) );
			url1_noslash_query(   urls[1], parseUrl( urllib.parse(urls[1],true,false), true,false ) );
			url1_query(           urls[1], parseUrl( urllib.parse(urls[1],true,true), true,true ) );
			
			url2_noquery( urls[2], parseUrl( urllib.parse(urls[2],false,false), false,false ) );
			url2_noquery( urls[2], parseUrl( urllib.parse(urls[2],false,true), false,true ) );
			url2_query(   urls[2], parseUrl( urllib.parse(urls[2],true,false), true,false ) );
			url2_query(   urls[2], parseUrl( urllib.parse(urls[2],true,true), true,true ) );
			
			done();
		});
		
		
		
		it("should work with mismatched standard options", function(done)
		{
			url0_noquery( urls[0], parseUrl( urllib.parse(urls[0],false,true), false,false ) );
			url0_noquery( urls[0], parseUrl( urllib.parse(urls[0],false,false), false,true ) );
			url0_noquery( urls[0], parseUrl( urllib.parse(urls[0],true,false), false,false ) );
			url0_query(   urls[0], parseUrl( urllib.parse(urls[0],false,false), true,false ) );
			url0_query(   urls[0], parseUrl( urllib.parse(urls[0],false,false), true,true ) );
			url0_noquery( urls[0], parseUrl( urllib.parse(urls[0],true,true), false,false ) );
			
			url1_noslash_noquery( urls[1], parseUrl( urllib.parse(urls[1],false,true), false,false ) );
			url1_noquery(         urls[1], parseUrl( urllib.parse(urls[1],false,false), false,true ) );
			url1_noslash_noquery( urls[1], parseUrl( urllib.parse(urls[1],true,false), false,false ) );
			url1_noslash_query(   urls[1], parseUrl( urllib.parse(urls[1],false,false), true,false ) );
			url1_query(           urls[1], parseUrl( urllib.parse(urls[1],false,false), true,true ) );
			url1_noquery(         urls[1], parseUrl( urllib.parse(urls[1],true,true), false,false ) );
			
			url2_noquery( urls[2], parseUrl( urllib.parse(urls[2],false,true), false,false ) );
			url2_noquery( urls[2], parseUrl( urllib.parse(urls[2],false,false), false,true ) );
			url2_noquery( urls[2], parseUrl( urllib.parse(urls[2],true,false), false,false ) );
			url2_query(   urls[2], parseUrl( urllib.parse(urls[2],false,false), true,false ) );
			url2_query(   urls[2], parseUrl( urllib.parse(urls[2],false,false), true,true ) );
			url2_noquery( urls[2], parseUrl( urllib.parse(urls[2],true,true), false,false ) );
			
			done();
		});
	});
	
	
	
	describe("with options object", function()
	{
		it("should work", function(done)
		{
			url0_noquery( urls[0], parseUrl(urls[0],{parseQueryString:false,slashesDenoteHost:false}) );
			url0_noquery( urls[0], parseUrl(urls[0],{parseQueryString:false,slashesDenoteHost:true}) );
			url0_query(   urls[0], parseUrl(urls[0],{parseQueryString:true,slashesDenoteHost:false}) );
			url0_query(   urls[0], parseUrl(urls[0],{parseQueryString:true,slashesDenoteHost:true}) );
			
			url0_noquery( urls[0], parseUrl( urllib.parse(urls[0],false,false),{parseQueryString:false,slashesDenoteHost:false} ) );
			url0_noquery( urls[0], parseUrl( urllib.parse(urls[0],false,true), {parseQueryString:false,slashesDenoteHost:true} ) );
			url0_query(   urls[0], parseUrl( urllib.parse(urls[0],true,false), {parseQueryString:true,slashesDenoteHost:false} ) );
			url0_query(   urls[0], parseUrl( urllib.parse(urls[0],true,true),  {parseQueryString:true,slashesDenoteHost:true} ) );
			
			done();
		});
		
		
		
		it("should support options.defaultPorts", function(done)
		{
			var obj = parseUrl("fakeprotocol://fakeurl.com:1234/", { defaultPorts:{ fakeprotocol:1234 } });
			
			expect(obj.protocol).to.equal("fakeprotocol:");
			expect(obj.port).to.equal("1234");
			expect(obj.extra.protocolTruncated).to.equal("fakeprotocol");
			expect(obj.extra.portIsDefault).to.be.true;
			done();
		});
		
		
		
		it("should support options.directoryIndexes", function(done)
		{
			var obj = parseUrl("http://fakeurl.com:1234/filename.html", { directoryIndexes:["index.html","filename.html"] });
			
			expect(obj.pathname).to.equal("/filename.html");
			expect(obj.path).to.equal("/filename.html");
			expect(obj.extra.directory).to.deep.equal([]);
			expect(obj.extra.directoryLeadingSlash).to.be.true;
			expect(obj.extra.filename).to.equal("filename.html");
			expect(obj.extra.filenameIsIndex).to.be.true;
			done();
		});
	});
});
