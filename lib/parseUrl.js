"use strict";
var isObject = require("is-object");
var isString = require("is-string");
var urllib = require("url");

var parsePath = require("./parsePath");

var _defaultPorts = { ftp:21, http:80, https:443 };
var _directoryIndexes = ["index.html"];



function isDefaultPort(protocol, port, defaultPorts)
{
	if (protocol!==null && port!==null && isObject(defaultPorts)===true)
	{
		if (defaultPorts.hasOwnProperty(protocol) === true)
		{
			return defaultPorts[protocol] === port;
		}
	}
	
	// Uncertain
	return null;
}



function isDocumentIndex(filename, documentIndexes)
{
	if (filename!==null /*&& Array.isArray(documentIndexes)===true*/)
	{
		return documentIndexes.indexOf(filename) > -1;
	}
	
	// Uncertain
	return null;
}



function parseUrl(url, parseQueryString, slashesDenoteHost, defaultPorts, directoryIndexes)
{
	var parsedPath;
	
	if (isString(url) === true)
	{
		url = urllib.parse(url, true, slashesDenoteHost);
	}
	// If urlObj from core url.parse()
	else if (isObject(url) === true)
	{
		// If was parsed with parseQueryString=false
		if (isObject(url.query) === true)
		{
			// Reparse
			url = urllib.parse(url.href, true, slashesDenoteHost);
		}
		else
		{
			// Clone -- don't mutate input
			url = Object.create(url);
		}
	}
	else
	{
		// Invalid input
		return null;
	}
	
	if (isObject(defaultPorts) === false)
	{
		defaultPorts = _defaultPorts;
	}
	
	if (Array.isArray(directoryIndexes) === false)
	{
		directoryIndexes = _directoryIndexes;
	}
	
	// TODO :: what if url is object parsed with slashesDenoteHost?
	
	parsedPath = parsePath(url.pathname);
	
	url.extra = {};
	url.extra.portIsDefault         = isDefaultPort(url.protocol, url.port, defaultPorts);
	url.extra.directory             = parsedPath.dir;
	url.extra.directoryLeadingSlash = parsedPath.leadingSlash;
	url.extra.filename              = parsedPath.filename;
	url.extra.filenameIsIndex       = isDocumentIndex(parsedPath.filename, directoryIndexes);
	url.extra.query                 = url.query;
	
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
