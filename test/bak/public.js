"use strict";
var urlobj = require("../lib");

var expect = require("chai").expect;
var url = require("url");



describe("basic function", function()
{
	it("parse() should work", function(done)
	{
		var urlString = "http://user:pass@fakeurl2.com:80/path/resource.html?query#hash";
		var obj;
		
		obj = urlobj.parse(urlString);
		// Couldn't use deep.equal() because parse() includes functions in its output
		expect(obj.protocol).to.equal("http:");
		expect(obj.slashes).to.equal(true);
		expect(obj.auth).to.equal("user:pass");
		expect(obj.host).to.equal("fakeurl2.com:80");
		expect(obj.port).to.equal("80");
		expect(obj.hostname).to.equal("fakeurl2.com");
		expect(obj.hash).to.equal("#hash");
		expect(obj.search).to.equal("?query");
		expect(obj.query).to.equal("query");
		expect(obj.pathname).to.equal("/path/resource.html");
		expect(obj.path).to.equal("/path/resource.html?query");
		expect(obj.href).to.equal("http://user:pass@fakeurl2.com:80/path/resource.html?query#hash");
		
		obj = urlobj.parse(urlString, true);
		// Couldn't use deep.equal() because parse() includes functions in its output
		expect(obj.protocol).to.equal("http:");
		expect(obj.slashes).to.equal(true);
		expect(obj.auth).to.equal("user:pass");
		expect(obj.host).to.equal("fakeurl2.com:80");
		expect(obj.port).to.equal("80");
		expect(obj.hostname).to.equal("fakeurl2.com");
		expect(obj.hash).to.equal("#hash");
		expect(obj.search).to.equal("?query");
		expect(obj.query).to.deep.equal({ query:"" });
		expect(obj.pathname).to.equal("/path/resource.html");
		expect(obj.path).to.equal("/path/resource.html?query");
		expect(obj.href).to.equal("http://user:pass@fakeurl2.com:80/path/resource.html?query#hash");
		
		done();
	});
	
	
	
	it("format() should work", function(done)
	{
		var url = "http://user:pass@fakeurl2.com:80/path/resource.html?query#hash";
		var obj = urlobj.parse(url);
		
		expect( urlobj.format(obj) ).to.equal(url);
		done();
	});
	
	
	
	it.skip("areInternal() should work", function(done)
	{
		done();
	});
	
	
	
	it.skip("areSamePage() should work", function(done)
	{
		done();
	});
	
	
	
	it("resolve() should work", function(done)
	{
		expect( urlobj.resolve("http://user:pass@fakeurl2.com:80/path/resource.html?query", "#hash") ).to.deep.equal(
		{
			protocol: "http:",
			slashes: true,
			auth: "user:pass",
			host: "fakeurl2.com:80",
			port: "80",
			hostname: "fakeurl2.com",
			hash: "#hash",
			search: "?query",
			query: "query",
			pathname: "/path/resource.html",
			path: "/path/resource.html?query#hash",
			href: "http://user:pass@fakeurl2.com:80/path/resource.html?query#hash"
		});
		
		done();
	});
});



describe("parity with core url module", function()
{
	var type1,type2,url1,url2;
	var urls = 
	{
		"remote absolute":          "http://fakeurl2.com:80/path/resource.html?query#hash",	// add user:pass
		"local absolute":           "http://fakeurl.com/path/resource.html?query#hash",
		"remote protocol-relative": "//fakeurl2.com:80/path/resource.html?query#hash",
		"local protocol-relative":  "//fakeurl.com/path/resource.html?query#hash",
		"root-path-relative":       "/path/resource.html?query#hash",
		"path-relative":            "path/resource.html?query#hash",
		"resource-relative":        "resource.html?query#hash",
		"query-relative":           "?query#hash",
		"hash-relative":            "#hash",
		"empty":                    ""
		// TODO :: test a data or tel uri
	};
	
	for (type1 in urls)
	{
		url1 = urls[type1];
		
		for (type2 in urls)
		{
			url2 = urls[type2];
			
			var title = "should resolve "+ type1.toUpperCase() +" with "+ type2.toUpperCase();
			
			var code = "";
			code  = 'it("'+title+'", function(done)\n';
			code += '{\n';
			code += '	var url1 = urlobj.format( urlobj.resolve("'+url1+'", "'+url2+'") );\n';
			code += '	var url2 = url.resolve("'+url1+'", "'+url2+'");\n';
			code += '	\n';
			code += '	expect(url1).to.equal(url2);\n';
			code += '	done();\n';
			code += '});\n';
			
			eval(code);
		}
	}
});



describe("extra args", function()
{
	it.skip("format() should support defaultPorts", function()
	{
		done();
	});
	
	
	
	it.skip("parse() should support parsePath", function(done)
	{
		var result = urlobj.parse("http://fakeurl.com/path/to/something/like/this.html", null,null, true);
		console.log(result);
		done();
	});
	
	
	
	it.skip("resolve() should support defaultPorts", function()
	{
		done();
	});
});
