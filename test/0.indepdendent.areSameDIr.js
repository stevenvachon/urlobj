"use strict";
var areSameDir = require("../lib/areSameDir");
var expect = require("chai").expect;



describe("areSameDir", function()
{
	it("should work", function(done)
	{
		var dir1,dir2;
		
		dir1 = ["dir-relative","dir","to"];
		dir2 = ["dir-relative","dir","to"];
		expect( areSameDir(dir1,false,dir2,false) ).to.be.true;
		
		dir1 = ["root-dir-relative","dir","to"];
		dir2 = ["root-dir-relative","dir","to"];
		expect( areSameDir(dir1,true,dir2,true) ).to.be.true;
		
		dir1 = ["dir","to"];
		dir2 = ["dir","to"];
		expect( areSameDir(dir1,true,dir2,false) ).to.be.false;
		
		dir1 = ["dir","to"];
		dir2 = ["dir","to"];
		expect( areSameDir(dir1,false,dir2,true) ).to.be.false;
		
		dir1 = ["dir-relative1","dir","to"];
		dir2 = ["dir-relative2","dir","to"];
		expect( areSameDir(dir1,false,dir2,false) ).to.be.false;
		
		dir1 = ["dir-relative1","dir","to"];
		dir2 = ["dir-relative2","dir","to"];
		expect( areSameDir(dir1,true,dir2,true) ).to.be.false;
		
		dir1 = ["dir-relative","dir","to1"];
		dir2 = ["dir-relative","dir","to2"];
		expect( areSameDir(dir1,false,dir2,false) ).to.be.false;
		
		dir1 = ["dir-relative","dir","to1"];
		dir2 = ["dir-relative","dir","to2"];
		expect( areSameDir(dir1,false,dir2,true) ).to.be.false;
		
		// Empty array with no leading slash is an empty path (relative)
		dir1 = ["dir-relative","dir","to1"];
		dir2 = [];
		expect( areSameDir(dir1,false,dir2,false) ).to.be.true;
		
		// Empty array with no leading slash is an empty path (relative)
		dir1 = ["dir-relative","dir","to1"];
		dir2 = [];
		expect( areSameDir(dir1,true,dir2,false) ).to.be.true;
		
		done();
	});
});
