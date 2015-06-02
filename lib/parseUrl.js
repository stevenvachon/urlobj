"use strict";
var isObject = require("is-object");
var isString = require("is-string");
var urllib   = require("url");

var inputType  = require("./inputType");
var InputTypes = require("./InputTypes");
var parsePath  = require("./parsePath");

var _defaultPorts = { ftp:21, gopher:70, http:80, https:443 };
var _directoryIndexes = ["index.html"];



function isDefaultPort(protocol, port, defaultPorts)
{
	if (protocol !== null)
	{
		if (port === null) return true;
		
		if (isObject(defaultPorts)===true && defaultPorts.hasOwnProperty(protocol)===true)
		{
			return defaultPorts[protocol] === parseInt(port);
		}
	}
	
	// Uncertain
	return null;
}



function isDirectoryIndex(filename, directoryIndexes)
{
	if (filename === null) return true;
	
	if (Array.isArray(directoryIndexes) === true)
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
		// TODO :: clone options to avoid mutating input?
		options.defaultPorts = _defaultPorts;
	}
	
	if (Array.isArray(options.directoryIndexes) === false)
	{
		// TODO :: clone options to avoid mutating input?
		options.directoryIndexes = _directoryIndexes;
	}
	
	return options;
}



function parseUrl(url, parseQueryString, slashesDenoteHost)
{
	var parsedPath;
	var options = parseOptions(parseQueryString, slashesDenoteHost);
	var type = inputType(url);
	
	// TODO :: support url objects not from core? (see urllib.format)
	switch (type)
	{
		case InputTypes.STRING:
		{
			url = urllib.parse(url, true, options.slashesDenoteHost);
			break;
		}
		case InputTypes.CORE_URL_OBJECT:
		{
			// If was parsed with parseQueryString=false
			if (
			    ( url.search==null && url.query==null ) ||
			    ( isString(url.search)===true && isString(url.query)===true )
			   )
			{
				// Reparse
				// TODO :: use "querystring" package (that node uses) ?
				url = urllib.parse(url.href, true, options.slashesDenoteHost);
			}
			
			break;
		}
		case InputTypes.URLOBJ:
		{
			return url;
		}
		default:
		{
			throw new Error("invalid input type");
		}
	}
	
	parsedPath = parsePath(url.pathname);
	
	url.extra = {};
	
	if (isString(url.protocol) === true)
	{
		if (url.protocol[url.protocol.length-1] === ":")
		{
			url.extra.protocolTruncated = url.protocol.substr(0, url.protocol.length-1);
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
		// `search` is always a string since we parsed query
		if (url.search !== "")
		{
			if (url.search[0] === "?")
			{
				// Remove prefixed "?"
				url.query = url.search.substr(1);
			}
			else
			{
				// TODO :: add test for this
				url.query = url.search;
			}
		}
		else
		{
			url.search = null;
			url.query = null;
		}
	}
	
	return url;
}



module.exports = parseUrl;
