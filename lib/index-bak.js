"use strict";
var pathlib = require("path");
var urllib = require("url");

var _findUrlRelation = require("./findUrlRelation");
var _joinPath        = require("./joinPath");
var _joinQuery       = require("./joinQuery");
var _normalizePath   = require("./normalizePath");
var _parsePath       = require("./parsePath");
var _parseUrl        = require("./parseUrl");



function areInternal(url1, url2/*, defaultPorts*/)
{
	// If impossible to determine
	if (url1.protocol===null && url2.protocol===null) return null;
	if (url1.host===null     && url2.host===null)     return null;
	
	return url1.protocol===url2.protocol &&
	       url1.auth===url2.auth &&
	       url1.host===url2.host &&
	       url1.port===url2.port;
}



function areSamePage(url1, url2/*, defaultPorts*/, internalOverride)
{
	var isInternal = internalOverride===undefined ? areInternal(url1,url2) : internalOverride;
	
	// If internal could not be determined, than neither can same page
	if (isInternal === null)
	{
		return null;
	}
	
	return isInternal===true &&
	       url1.path===url2.path &&
	       url1.search===url2.search;
}



function format(urlObj/*, defaultPorts*/)
{
	return urllib.format(urlObj);
}



function normalize(url)
{
	
}



function resolve(from, to/*, defaultPorts, directoryIndexes*/)
{
	// TODO :: detect if `parseQueryString` was used in any non-strings
	if (typeof from==="string" || from instanceof String) from = parse(from);
	if (typeof to==="string"   || to instanceof String)   to   = parse(to);
	
	if (from.protocol!==to.protocol && from.protocol!==null && to.protocol!==null) return to;
	if (from.auth!==to.auth         && from.auth!==null     && to.auth!==null) return to;
	if (from.host!==to.host         && from.host!==null     && to.host!==null) return to;
	
	var resolved = 
	{
		protocol: to.protocol || from.protocol,
		slashes:  to.slashes  || from.slashes,
		auth:     to.auth     || from.auth,
		host:     to.host     || from.host,
		port:     to.port     || from.port,
		hostname: to.hostname || from.hostname,
		hash: null,
		search: null,
		query: null,
		pathname: null,
		path: null,
		href: null/*,
		extra:
		{
			
		}*/
	};
	
	// TODO :: can't use "/" because it cancels out relative urls
	resolved.pathname = pathlib.resolve(from.pathname || "/", to.pathname || "") || null;
	
	// TODO :: Normalize before resolve (and use as arg) -- if it's faster
	var from_pathname_normalized = pathlib.normalize(from.pathname || "") || null;
	
	if (resolved.pathname === from_pathname_normalized)
	{
		resolved.query  = to.query  || from.query;
		resolved.search = to.search || from.search;
	}
	else
	{
		resolved.query  = to.query;
		resolved.search = to.search;
	}
	
	resolved.hash = to.hash;
	resolved.path = (resolved.pathname || "") + (resolved.search || "") + (resolved.hash || "");
	resolved.path = resolved.path || null;
	resolved.href = format(resolved/*, defaultPorts*/);
	
	return resolved;
}



module.exports = 
{
	areInternal: areInternal,
	areSamePage: areSamePage,
	format: format,
	parse: _parseUrl,
	resolve: resolve
};
