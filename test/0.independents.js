"use strict";
var areSameDir    = require("../lib/areSameDir");
var areSameQuery  = require("../lib/areSameQuery");
var joinDirs      = require("../lib/joinDirs");
var joinQuery     = require("../lib/joinQuery");
var normalizeDirs = require("../lib/normalizeDirs");
var parsePath     = require("../lib/parsePath");
var resolveDirs   = require("../lib/resolveDirs");

var expect = require("chai").expect;



describe("Independents", function()
{
	it("areSameDir", function(done)
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
		
		done();
	});
	
	
	
	it("areSameQuery", function(done)
	{
		var query1,query2;
		
		query1 = { query:["1","2"], var2:"" };
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.true;
		
		query1 = { query:["2","1"], var2:"" };
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.true;
		
		query1 = { query:["1"], var2:"" };
		query2 = { query:["2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = { query:["1","2"], var2:"" };
		query2 = { query:["1","3"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = { query:["1","2"], var2:"asdf" };
		query2 = { query:["1","2"], var2:"asdf" };
		expect( areSameQuery(query1,query2) ).to.be.true;
		
		query1 = { query:["1","2"], var2:"asdf" };
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = { query:["1","2"], var2:"" };
		query2 = { query:["1","2"] };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = { query:"1", var2:"" };
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = { var2:"" };
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = {};
		query2 = { query:["1","2"], var2:"" };
		expect( areSameQuery(query1,query2) ).to.be.false;
		
		query1 = {};
		query2 = {};
		expect( areSameQuery(query1,query2) ).to.be.true;
		
		done();
	});
	
	
	
	it("joinDirs", function(done)
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
	
	
	
	it("joinQuery", function(done)
	{
		expect( joinQuery({}) ).to.equal("");
		expect( joinQuery({ "":"" }) ).to.equal("?=");
		expect( joinQuery({ " ":" " }) ).to.equal("?%20=+");
		expect( joinQuery({ query:"" }) ).to.equal("?query=");
		expect( joinQuery({ query:"value" }) ).to.equal("?query=value");
		expect( joinQuery({ var1:"value1", var2:"", var3:"value3" }) ).to.equal("?var1=value1&var2=&var3=value3");
		expect( joinQuery({ query:["value1","","value3"] }) ).to.equal("?query=value1&query=&query=value3");
		
		expect( joinQuery({},true) ).to.equal("");
		expect( joinQuery({ "":"" },true) ).to.equal("");
		expect( joinQuery({ " ":"" },true) ).to.equal("");
		expect( joinQuery({ query:"" },true) ).to.equal("");
		expect( joinQuery({ query:"value" },true) ).to.equal("?query=value");
		expect( joinQuery({ var1:"value1", var2:"", var3:"value3" },true) ).to.equal("?var1=value1&var3=value3");
		expect( joinQuery({ query:["value1","","value3"] },true) ).to.equal("?query=value1&query=value3");
		
		done();
	});
	
	
	
	it("normalizeDirs", function(done)
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
	
	
	
	it("parsePath", function(done)
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
});
