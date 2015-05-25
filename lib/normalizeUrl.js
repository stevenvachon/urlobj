"use strict";
var joinDirs      = require("./joinDirs");
var normalizeDirs = require("./normalizeDirs");
var parseUrl      = require("./parseUrl");
var isString = require("is-string");
var urllib = require("url");



// TODO :: document options
function normalizeUrl(url, options)
{
	var portSuffix;
	url = parseUrl(url, options);
	
	// Remove default port
	if (url.extra.portIsDefault===true && url.port!==null)
	{
		if (isString(url.host) === true)
		{
			portSuffix = ":" + url.port;
			
			// Remove ":123" suffix from host
			if (url.host.slice(-portSuffix.length) === portSuffix)
			{
				url.host = url.host.slice(0, -portSuffix.length);
			}
		}
		
		url.port = null;
	}
	
	url.extra.directory = normalizeDirs(url.extra.directory, url.extra.directoryLeadingSlash).dir;
	
	// TODO :: have an updatePath() for reuse in resolveUrl() ?
	url.pathname = joinDirs(url.extra.directory, url.extra.directoryLeadingSlash);
	
	if (url.extra.filename !== null)
	{
		url.pathname += url.extra.filename;
	}
	
	url.path = url.pathname;
	
	if (url.search !== null)
	{
		url.path += url.search;
	}
	
	url.href = urllib.format(url);
	
	return url;
}



module.exports = normalizeUrl;
