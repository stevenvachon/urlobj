"use strict";
var isObject = require("is-object");
var isString = require("is-string");
var urllib   = require("url");

var parsePath = require("./parsePath");

var _defaultPorts = { ftp:21, http:80, https:443 };
var _directoryIndexes = ["index.html"];



function isDefaultPort(protocol, port, defaultPorts)
{
	if (protocol!==null && port!==null && isObject(defaultPorts)===true)
	{
		if (defaultPorts.hasOwnProperty(protocol) === true)
		{
			return defaultPorts[protocol] === parseInt(port);
		}
	}
	
	// Uncertain
	return null;
}



function isDirectoryIndex(filename, directoryIndexes)
{
	if (filename!==null && Array.isArray(directoryIndexes)===true)
	{
		return directoryIndexes.indexOf(filename) > -1;
	}
	
	// Uncertain
	return null;
}



function parseOptions(parseQueryString, slashesDenoteHost)
{
	var options = {};
	
	// parseUrl(url, options)
	if (isObject(parseQueryString) === true)
	{
		options = parseQueryString;
	}
	// parseUrl(url, parseQueryString, slashesDenoteHost)
	else
	{
		options = 
		{
			defaultPorts: null,
			directoryIndexes: null,
			parseQueryString: parseQueryString,
			slashesDenoteHost: slashesDenoteHost
		};
	}
	
	if (isObject(options.defaultPorts) === false)
	{
		options.defaultPorts = _defaultPorts;
	}
	
	if (Array.isArray(options.directoryIndexes) === false)
	{
		options.directoryIndexes = _directoryIndexes;
	}
	
	return options;
}



function parseUrl(url, parseQueryString, slashesDenoteHost)
{
	var parsedPath;
	var options = parseOptions(parseQueryString, slashesDenoteHost);
	
	if (isString(url) === true)
	{
		url = urllib.parse(url, true, options.slashesDenoteHost);
	}
	// If urlObj from core url.parse()
	else
	{
		// If was parsed with parseQueryString=false
		if (isString(url.query) === true)
		{
			// Reparse
			// TODO :: use "querystring" package (that node uses) ?
			url = urllib.parse(url.href, true, options.slashesDenoteHost);
		}
		else
		{
			// Clone -- don't mutate input
			url = Object.create(url);
		}
	}
	
	parsedPath = parsePath(url.pathname);
	
	url.extra = {};
	
	if (isString(url.protocol) === true)
	{
		if (url.protocol[url.protocol.length-1] === ":")
		{
			url.extra.protocolTruncated = url.protocol.slice(0,-1);
		}
	}
	else
	{
		url.extra.protocolTruncated = null;
	}
	
	url.extra.portIsDefault         = isDefaultPort(url.extra.protocolTruncated, url.port, options.defaultPorts);
	url.extra.directory             = parsedPath.dir;
	url.extra.directoryLeadingSlash = parsedPath.leadingSlash;
	url.extra.filename              = parsedPath.filename;
	url.extra.filenameIsIndex       = isDirectoryIndex(parsedPath.filename, options.directoryIndexes);
	url.extra.query                 = url.query;
	
	// Preserve backwards compatibility with core url package
	if (options.parseQueryString !== true)
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
