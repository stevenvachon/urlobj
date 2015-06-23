"use strict";
var resolveDirs = require("../lib/resolveDirs");
var expect = require("chai").expect;



describe("resolveDirs", function()
{
	it("should work", function(done)
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
		
		fromDir     = ["root-dir-relative1","dir1","to1"];
		toDir       = [];
		expectedDir = [];
		expect( resolveDirs(fromDir,true,toDir,true) ).to.deep.equal({ dir:expectedDir, leadingSlash:true });
		
		done();
	});
});
