"use strict";
var parseUrl     = require("../lib/parseUrl");
var resolveDirs  = require("../lib/resolveDirs");
var UrlComponent = require("../lib/UrlComponents");
var urlRelation  = require("../lib/urlRelation");

var expect = require("chai").expect;



describe("Dependents", function()
{
	it("parseUrl", function(done)
	{
		var urlString = "http://user:pass@fakeurl.com:80/dir/to/filename.html?query=1&query=2&var2=#hash";
		var obj;
		
		obj = parseUrl(urlString);
		// Couldn't use deep.equal() because core url.parse() includes functions in its output
		expect(obj.protocol).to.equal("http:");
		expect(obj.slashes).to.be.true;
		expect(obj.auth).to.equal("user:pass");
		expect(obj.host).to.equal("fakeurl.com:80");
		expect(obj.port).to.equal("80");
		expect(obj.hostname).to.equal("fakeurl.com");
		expect(obj.hash).to.equal("#hash");
		expect(obj.search).to.equal("?query=1&query=2&var2=");
		expect(obj.query).to.equal("query=1&query=2&var2=");
		expect(obj.pathname).to.equal("/dir/to/filename.html");
		expect(obj.path).to.equal("/dir/to/filename.html?query=1&query=2&var2=");
		expect(obj.href).to.equal(urlString);
		expect(obj.extra.directory).to.deep.equal([ "dir","to" ]);
		expect(obj.extra.directoryLeadingSlash).to.be.true;
		expect(obj.extra.filename).to.equal("filename.html");
		expect(obj.extra.filenameIsIndex).to.be.false;
		expect(obj.extra.query).to.deep.equal({ query:["1","2"], var2:"" });
		
		obj = parseUrl(urlString, true);
		// Couldn't use deep.equal() because core url.parse() includes functions in its output
		expect(obj.protocol).to.equal("http:");
		expect(obj.slashes).to.be.true;
		expect(obj.auth).to.equal("user:pass");
		expect(obj.host).to.equal("fakeurl.com:80");
		expect(obj.port).to.equal("80");
		expect(obj.hostname).to.equal("fakeurl.com");
		expect(obj.hash).to.equal("#hash");
		expect(obj.search).to.equal("?query=1&query=2&var2=");
		expect(obj.query).to.deep.equal({ query:["1","2"], var2:"" });
		expect(obj.pathname).to.equal("/dir/to/filename.html");
		expect(obj.path).to.equal("/dir/to/filename.html?query=1&query=2&var2=");
		expect(obj.href).to.equal(urlString);
		expect(obj.extra.directory).to.deep.equal([ "dir","to" ]);
		expect(obj.extra.directoryLeadingSlash).to.be.true;
		expect(obj.extra.filename).to.equal("filename.html");
		expect(obj.extra.filenameIsIndex).to.be.false;
		expect(obj.extra.query).to.deep.equal(obj.query);
		
		// TODO :: parse probably should not auto-normalize dirs as it'd be inconsistent with core url package
		/*urlString = "http://user:pass@fakeurl.com:80/dir/to/../filename.html?query=1&query=2&var2=#hash";
		obj = parseUrl(urlString);
		// Couldn't use deep.equal() because core url.parse() includes functions in its output
		expect(obj.protocol).to.equal("http:");
		expect(obj.slashes).to.be.true;
		expect(obj.auth).to.equal("user:pass");
		expect(obj.host).to.equal("fakeurl.com:80");
		expect(obj.port).to.equal("80");
		expect(obj.hostname).to.equal("fakeurl.com");
		expect(obj.hash).to.equal("#hash");
		expect(obj.search).to.equal("?query=1&query=2&var2=");
		expect(obj.query).to.equal("query=1&query=2&var2=");
		expect(obj.pathname).to.equal("/dir/to/../filename.html");
		expect(obj.path).to.equal("/dir/to/../filename.html?query=1&query=2&var2=");
		expect(obj.href).to.equal(urlString);
		expect(obj.extra.directory).to.deep.equal([ "dir" ]);
		expect(obj.extra.directoryLeadingSlash).to.be.true;
		expect(obj.extra.filename).to.equal("filename.html");
		expect(obj.extra.filenameIsIndex).to.be.false;
		expect(obj.extra.query).to.deep.equal({ query:["1","2"], var2:"" });*/
		
		urlString = "//user:pass@fakeurl.com:80/dir/to/filename.html?query=1&query=2&var2=#hash";
		obj = parseUrl(urlString, true, true);
		// Couldn't use deep.equal() because core url.parse() includes functions in its output
		expect(obj.protocol).to.be.null;
		expect(obj.slashes).to.be.true;
		expect(obj.auth).to.equal("user:pass");
		expect(obj.host).to.equal("fakeurl.com:80");
		expect(obj.port).to.equal("80");
		expect(obj.hostname).to.equal("fakeurl.com");
		expect(obj.hash).to.equal("#hash");
		expect(obj.search).to.equal("?query=1&query=2&var2=");
		expect(obj.query).to.deep.equal({ query:["1","2"], var2:"" });
		expect(obj.pathname).to.equal("/dir/to/filename.html");
		expect(obj.path).to.equal("/dir/to/filename.html?query=1&query=2&var2=");
		expect(obj.href).to.equal(urlString);
		expect(obj.extra.directory).to.deep.equal([ "dir","to" ]);
		expect(obj.extra.directoryLeadingSlash).to.be.true;
		expect(obj.extra.filename).to.equal("filename.html");
		expect(obj.extra.filenameIsIndex).to.be.false;
		expect(obj.extra.query).to.deep.equal(obj.query);
		
		done();
	});
	
	
	
	it("resolveDirs", function(done)
	{
		var expectedDir,fromDir,toDir;
		
		fromDir     = ["root-dir-relative1","dir1","to1"];
		toDir       = ["root-dir-relative2","dir2","to2"];
		expectedDir = ["root-dir-relative2","dir2","to2"];
		expect( resolveDirs(fromDir,true,toDir,true) ).to.deep.equal({ dir:expectedDir, leadingSlash:true });
		
		fromDir     = ["dir-relative1","dir1","to1"];
		toDir       = ["root-dir-relative2","dir2","to2"];
		expectedDir = ["root-dir-relative2","dir2","to2"];
		expect( resolveDirs(fromDir,false,toDir,true) ).to.deep.equal({ dir:expectedDir, leadingSlash:true });
		
		fromDir     = ["root-dir-relative1","dir1","to1"];
		toDir       = ["dir-relative2","dir2","to2"];
		expectedDir = ["root-dir-relative1","dir1","to1","dir-relative2","dir2","to2"];
		expect( resolveDirs(fromDir,true,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:true });
		
		fromDir     = ["dir-relative1","dir1","to1"];
		toDir       = ["dir-relative2","dir2","to2"];
		expectedDir = ["dir-relative1","dir1","to1","dir-relative2","dir2","to2"];
		expect( resolveDirs(fromDir,false,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		fromDir     = ["..","dir-relative1","dir1","to1"];
		toDir       = ["..","dir-relative2","..","dir2","to2"];
		expectedDir = ["..","dir-relative1","dir1","dir2","to2"];
		expect( resolveDirs(fromDir,false,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		fromDir     = ["..","dir-relative1","dir1","to1"];
		toDir       = ["..","dir-relative2","..","dir2","to2"];
		expectedDir = ["dir-relative1","dir1","dir2","to2"];
		expect( resolveDirs(fromDir,true,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:true });
		
		fromDir     = ["..","..","dir-relative1"];
		toDir       = ["..","..","..","dir-relative2"];
		expectedDir = ["..","..","..","..","dir-relative2"];
		expect( resolveDirs(fromDir,false,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		fromDir     = [];
		toDir       = ["..","dir-relative2","..","dir2","to2"];
		expectedDir = ["..","dir2","to2"];
		expect( resolveDirs(fromDir,false,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		fromDir     = ["..","dir-relative1","dir1","to1"];
		toDir       = [];
		expectedDir = ["..","dir-relative1","dir1","to1"];
		expect( resolveDirs(fromDir,false,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		fromDir     = [];
		toDir       = [];
		expectedDir = [];
		expect( resolveDirs(fromDir,false,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		fromDir     = ["."];
		toDir       = [];
		expectedDir = [];
		expect( resolveDirs(fromDir,false,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		fromDir     = ["."];
		toDir       = [];
		expectedDir = [];
		expect( resolveDirs(fromDir,true,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:true });
		
		fromDir     = ["dir-relative1","dir1","to1"];
		toDir       = ["."];
		expectedDir = ["dir-relative1","dir1","to1"];
		expect( resolveDirs(fromDir,false,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		fromDir     = ["root-dir-relative1","dir1","to1"];
		toDir       = ["."];
		expectedDir = ["root-dir-relative1","dir1","to1"];
		expect( resolveDirs(fromDir,true,toDir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:true });
		
		done();
	});
	
	
	
	it("urlRelation", function(done)
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
