"use strict";
var urllib = require("url");

var areSameDir     = require("./areSameDir");
var formatPath     = require("./formatPath");
var formatPathname = require("./formatPathname");
var normalizeDirs  = require("./normalizeDirs");
var parseUrl       = require("./parseUrl");
var resolveDirs    = require("./resolveDirs");
var urlRelation    = require("./urlRelation");
var UrlComponents  = require("./UrlComponents");



function maybeCopyDirectory(from, to)
{
	// If `to` is filename-or-more-relative
	if (to.extra.directory.length===0 && to.extra.directoryLeadingSlash===false)
	{
		to.extra.directory = from.extra.directory.slice();  // clone
		to.extra.directoryLeadingSlash = from.extra.directoryLeadingSlash;
		
		return true;
	}
	
	return false;
}



function maybeCopyFilename(from, to)
{
	// If `to` is query-or-more-relative
	if (to.extra.filename === null)
	{
		to.extra.filename = from.extra.filename;
		to.extra.filenameIsIndex = from.extra.filenameIsIndex;
		
		return true;
	}
	
	return false;
}



function maybeCopyHostAuth(from, to)
{
	// If `to` is path-or-more-relative
	if (to.hostname === null)
	{
		to.auth = from.auth;
		to.host = from.host;
		to.port = from.port;
		to.hostname = from.hostname;
		to.extra.portIsDefault = from.extra.portIsDefault;
		to.extra.protocolTruncated = from.extra.protocolTruncated;
		
		return true;
	}
	
	return false;
}



function maybeCopyProtocol(from, to)
{
	if (to.protocol === null)
	{
		to.protocol = from.protocol;
		to.slashes = from.slashes;
		
		return true;
	}
	
	return false;
}



function maybeCopyQuery(from, to)
{
	//if ()
	//{
		// Copy data in case `to` is hash-relative
		to.search = from.search;
		to.query = from.query;  // TODO :: if object, clone
		to.extra.query = Object.create(from.extra.query);  // clone
		
		return true;
	//}
	
	//return false;
}



function resolveDirectory(from, to/*, options*/)
{
	var resolvedDir;
	
	//if (options.normalize !== false)
	//{
		from.extra.directory = normalizeDirs(from.extra.directory, from.extra.directoryLeadingSlash).dir;
		to.extra.directory   = normalizeDirs(to.extra.directory,   to.extra.directoryLeadingSlash).dir;
	//}
	
	resolvedDir = resolveDirs
	(
		from.extra.directory, from.extra.directoryLeadingSlash,
		to.extra.directory,   to.extra.directoryLeadingSlash
	);
	
	to.extra.directory = resolvedDir.dir;
	to.extra.directoryLeadingSlash = resolvedDir.leadingSlash;
	
	return true;
}



// TODO :: write a urlType() that returns a numerical value corresponding to directory-relative, query-relative, etc?
function resolveUrl(from, to/*, options*/)
{
	var bothAreSameDir,relation;
	var changedDirectory = false;
	var changedFilename = false;
	var changedHostAuth = false;
	var changedQuery = false;
	
	from = parseUrl(from/*, true, options.slashesDenoteHost1*/);
	to   = parseUrl(to/*,   true, options.slashesDenoteHost2*/);
	
	relation = urlRelation(from, to/*, options*/);
	
	// If not at all related
	if (relation < UrlComponents.AUTH) return to;
	
	if (maybeCopyProtocol(from, to) === true)
	{
		changedHostAuth = maybeCopyHostAuth(from, to);
	}
	
	if (relation < UrlComponents.DIRECTORY)
	{
		changedDirectory = resolveDirectory(from, to);
		
		bothAreSameDir = areSameDir
		(
			from.extra.directory,
			from.extra.directoryLeadingSlash,
			
			to.extra.directory,
			to.extra.directoryLeadingSlash
		);
	}
	// If `to` is same path, or is path-or-more-relative
	else
	{
		changedDirectory = maybeCopyDirectory(from, to);
		
		bothAreSameDir = changedDirectory;
	}
	
	if (relation>=UrlComponents.DIRECTORY || bothAreSameDir===true)
	{
		if (relation >= UrlComponents.FILENAME)
		{
			changedFilename = maybeCopyFilename(to, from);
		}
		
		if (relation >= UrlComponents.QUERY)
		{
			changedQuery = maybeCopyQuery(from, to);
		}
	}
	
	if (                          changedDirectory===true || changedFilename===true                       ) to.pathname = formatPathname(to);
	if (                          changedDirectory===true || changedFilename===true || changedQuery===true) to.path = formatPath(to);
	if (changedHostAuth===true || changedDirectory===true || changedFilename===true || changedQuery===true) to.href = urllib.format(to);
	
	return to;
}



module.exports = resolveUrl;
