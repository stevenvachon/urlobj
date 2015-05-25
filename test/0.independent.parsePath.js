"use strict";
var parsePath = require("../lib/parsePath");
var expect = require("chai").expect;



describe("parsePath", function()
{
	it("should work", function(done)
	{
		var expectedDir,expectedFilename,path;
		
		path = "/root-path-relative/path/to/resource.html";
		expectedDir = ["root-path-relative", "path", "to"];
		expectedFilename = "resource.html";
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:true });
		
		path = "path-relative/path/to/resource.html";
		expectedDir = ["path-relative", "path", "to"];
		expectedFilename = "resource.html";
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = "path-relative/path/to/";
		expectedDir = ["path-relative", "path", "to"];
		expectedFilename = null;
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = "path-relative/path/to/../";
		expectedDir = ["path-relative", "path", "to", ".."];
		expectedFilename = null;
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = "resource.html";
		expectedDir = [];
		expectedFilename = path;
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = "../resource.html";
		expectedDir = [".."];
		expectedFilename = "resource.html";
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = "./resource.html";
		expectedDir = ["."];
		expectedFilename = "resource.html";
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = "..resource.html";
		expectedDir = [];
		expectedFilename = "..resource.html";
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = ".resource.html";
		expectedDir = [];
		expectedFilename = ".resource.html";
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = "..";
		expectedDir = [".."];
		expectedFilename = null;
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = ".";
		expectedDir = ["."];
		expectedFilename = null;
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = "";
		expectedDir = [];
		expectedFilename = null;
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = null;
		expectedDir = [];
		expectedFilename = null;
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:false });
		
		path = "/";
		expectedDir = [];
		expectedFilename = null;
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:true });
		
		path = "/resource.html";
		expectedDir = [];
		expectedFilename = "resource.html";
		expect( parsePath(path) ).to.deep.equal({ dir:expectedDir, filename:expectedFilename, leadingSlash:true });
		
		done();
	});
});
