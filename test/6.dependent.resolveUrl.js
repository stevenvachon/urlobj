"use strict";
var parseUrl = require("../lib/parseUrl");
//var resolveUrl = require("../lib/resolveUrl");



describe("resolveUrl", function()
{
	it.skip("should work", function(done)
	{
		expect( resolveUrl("//localhost/path/to/filename.html", "/path/filename.html") ).to.equal("//localhost/path/filename.html");
		expect( resolveUrl("http://fakeurl.com/", "//localhost/path/to/filename.html") ).to.equal("http://localhost/path/to/filename.html");	// should it have http: ?
		
		done();
	});
});
