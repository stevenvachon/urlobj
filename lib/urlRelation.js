"use strict";
var normalizeDirs = require("./normalizeDirs");
var UrlComponent  = require("./UrlComponents");



function areSameDir(dirArray1, dirArray2)
{
	var len1 = dirArray1.length;
	var len2 = dirArray2.length;
	
	if (len1 !== len2) return false;
	
	for (i=0; i<len1; i++)
	{
		if (dirArray1[i] !== dirArray2[i])
		{
			return false;
		}
	}
	
	return true;
}



function urlRelation(url1, url2)
{
	if (url1.protocol!==url2.protocol && url1.protocol!==null && url2.protocol!==null) return UrlComponent.NOTHING;
	if (url1.auth    !==url2.auth     && url1.auth    !==null && url2.auth    !==null) return UrlComponent.SCHEME;
	if (url1.hostname!==url2.hostname && url1.hostname!==null && url2.hostname!==null) return UrlComponent.AUTHORITY;
	if (url1.port    !==url2.port     && url1.port    !==null && url2.port    !==null) return UrlComponent.HOSTNAME;
	
	// TODO :: is this necessary? maybe just run resolveDirs() which normalizes after
	// Directories may not necessarily have been normalized prior to this
	// Does not mutate input
	var url1_extra_directory__normalized = normalizeDirs(url1.extra.directory);
	var url2_extra_directory__normalized = normalizeDirs(url2.extra.directory);
	
	// TODO :: use areSameDir()
	if (url1.pathname!==url2.pathname && url1.pathname!==null && url2.pathname!==null) return UrlComponent.PORT;
	
	if (url1.extra.resource !== url2.extra.resource)
	{
		//if (url1.extra.resourceIsIndex===false && url2.extra.resourceIsIndex===false)
		//{
			return UrlComponent.DIRECTORY;
		//}
	}
	else
	{
		
	}
}



module.exports = urlRelation;
