"use strict";
var joinDirs = require("../lib/joinDirs");
var expect = require("chai").expect;



describe("joinDirs", function()
{
	it("should work", function(done)
	{
		expect( joinDirs([]) ).to.equal("");
		expect( joinDirs([""]) ).to.equal("");
		expect( joinDirs(["dir"]) ).to.equal("dir/");
		expect( joinDirs(["dir","to"]) ).to.equal("dir/to/");
		
		expect( joinDirs([],true) ).to.equal("/");
		expect( joinDirs([""],true) ).to.equal("/");
		expect( joinDirs(["dir"],true) ).to.equal("/dir/");
		expect( joinDirs(["dir","to"],true) ).to.equal("/dir/to/");
		
		done();
	});
});
