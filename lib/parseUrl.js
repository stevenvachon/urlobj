"use strict";
var urllib = require("url");

var parsePath = require("./parsePath");

var _defaultPorts = { ftp:21, http:80, https:443 };
var _directoryIndexes = ["index.html"];



function isDocumentIndex(filename, documentIndexes)
{
	if (filename!==null && Array.isArray(documentIndexes)===true)
	{
		return (documentIndexes.indexOf(filename) > -1);
	}
	
	return null;
}



function parseUrl(url, parseQueryString, slashesDenoteHost, defaultPorts, directoryIndexes)
{
	var parsedPath;
	
	// If string
	if (typeof url==="string" || url instanceof String)
	{
		url = urllib.parse(url, true, slashesDenoteHost);
	}
	// If urlObj from core url.parse(str,FALSE)
	else if (typeof url==="object" && url.query!==null && typeof url.query!=="object")
	{
		// Reparse
		url = urllib.parse(url.href, true, slashesDenoteHost);
	}
	
	if (defaultPorts!==null && typeof defaultPorts!=="object")
	{
		defaultPorts = _defaultPorts;
	}
	
	if (Array.isArray(directoryIndexes) === false)
	{
		directoryIndexes = _directoryIndexes;
	}
	
	url.extra = {};
	
	// TODO :: what if url is object parsed with slashesDenoteHost?
	
	parsedPath = parsePath(url.pathname);
	
	url.extra.directory = parsedPath.dir;
	url.extra.directoryLeadingSlash = parsedPath.leadingSlash;
	
	url.extra.filename = parsedPath.filename;
	url.extra.filenameIsIndex = isDocumentIndex(parsedPath.filename, directoryIndexes);
	url.extra.query = url.query;
	
	// Preserve backwards compatibility with core url package
	if (parseQueryString !== true)
	{
		if (url.search!==null && url.search[0]==="?")
		{
			// Remove prefixed "?"
			url.query = url.search.substr(1);
		}
		else
		{
			url.query = url.search;
		}
	}
	
	return url;
}



module.exports = parseUrl;
