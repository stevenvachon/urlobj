"use strict";
var areSameDir    = require("./areSameDir");
var areSameQuery  = require("./areSameQuery");
var normalizeDirs = require("./normalizeDirs");
var UrlComponent  = require("./UrlComponents");



function urlRelation(url1, url2)
{
	if (url1.protocol!==url2.protocol && url1.protocol!==null && url2.protocol!==null) return UrlComponent.NOTHING;
	if (url1.auth    !==url2.auth     && url1.auth    !==null && url2.auth    !==null) return UrlComponent.PROTOCOL;
	if (url1.hostname!==url2.hostname && url1.hostname!==null && url2.hostname!==null) return UrlComponent.AUTHORITY;
	if (url1.port    !==url2.port     && url1.port    !==null && url2.port    !==null) return UrlComponent.HOSTNAME;
	
	// TODO :: is this necessary? maybe just run resolveDirs() which normalizes after -- unlikely since resolveDirs is `from` and `to` while this function is not
	// TODO :: get rid of these vars and put them into the function args below
	// Directories may not necessarily have been normalized prior to this
	// Does not mutate input
	var url1_extra_directory__normalized = normalizeDirs(url1.extra.directory, url1.extra.directoryLeadingSlash);
	var url2_extra_directory__normalized = normalizeDirs(url2.extra.directory, url2.extra.directoryLeadingSlash);
	
	var bothAreSameDir = areSameDir
	(
		url1_extra_directory__normalized,
		url1.extra.directoryLeadingSlash,
		url2_extra_directory__normalized,
		url2.extra.directoryLeadingSlash
	);
	
	//console.log(url1_extra_directory__normalized, url2_extra_directory__normalized)
	
	if (bothAreSameDir === false) return UrlComponent.PORT;
	
	if (url1.filename!==url2.filename && url1.filename!==null && url2.filename!==null)
	{
		if (url1.extra.resourceIsIndex===false && url2.extra.resourceIsIndex===false)
		{
			return UrlComponent.DIRECTORY;
		}
	}
	
	if (areSameQuery(url1.extra.query, url2.extra.query) === false) return UrlComponent.FILENAME;
	
	if (url1.fragment!==url2.fragment && url1.fragment!==null && url2.fragment!==null) return UrlComponent.QUERY;
	
	return UrlComponent.FRAGMENT;
}



module.exports = urlRelation;
