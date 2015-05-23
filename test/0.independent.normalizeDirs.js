"use strict";
var normalizeDirs = require("../lib/normalizeDirs");
var expect = require("chai").expect;



describe("normalizeDirs", function()
{
	it("should work", function(done)
	{
		var dir,expectedDir;
		
		dir = ["dir-relative","dir","to"];
		expectedDir = dir;
		expect( normalizeDirs(dir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		dir = ["dir-relative","dir","to",".."];
		expectedDir = ["dir-relative","dir"];
		expect( normalizeDirs(dir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		dir = ["dir-relative","dir","..","to"];
		expectedDir = ["dir-relative","to"];
		expect( normalizeDirs(dir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		dir = ["..","dir-relative","dir","to"];
		expectedDir = ["..","dir-relative","dir","to"];
		expect( normalizeDirs(dir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		dir = ["..","dir-relative","dir","to"];
		expectedDir = ["dir-relative","dir","to"];
		expect( normalizeDirs(dir,true) ).to.deep.equal({ dir:expectedDir, leadingSlash:true });
		
		dir = ["..","..","dir-relative","dir","to"];
		expectedDir = ["..","..","dir-relative","dir","to"];
		expect( normalizeDirs(dir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		dir = ["..","..","dir-relative","dir","to"];
		expectedDir = ["dir-relative","dir","to"];
		expect( normalizeDirs(dir,true) ).to.deep.equal({ dir:expectedDir, leadingSlash:true });
		
		dir = [".","dir-relative","dir","to"];
		expectedDir = ["dir-relative","dir","to"];
		expect( normalizeDirs(dir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		dir = [".","dir-relative","dir","to"];
		expectedDir = ["dir-relative","dir","to"];
		expect( normalizeDirs(dir,true) ).to.deep.equal({ dir:expectedDir, leadingSlash:true });
		
		dir = ["."];
		expectedDir = [];
		expect( normalizeDirs(dir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		dir = ["dir-relative",".."];
		expectedDir = [];
		expect( normalizeDirs(dir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		dir = ["dir-relative","..",".."];
		expectedDir = [".."];
		expect( normalizeDirs(dir,false) ).to.deep.equal({ dir:expectedDir, leadingSlash:false });
		
		done();
	});
});
