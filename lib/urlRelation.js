"use strict";
var areSameDir    = require("./areSameDir");
var areSameQuery  = require("./areSameQuery");
var normalizeDirs = require("./normalizeDirs");
var parseUrl      = require("./parseUrl");
var UrlComponents = require("./UrlComponents");



function urlRelation(url1, url2/*, options*/)
{
	var bothAreSameDir;
	
	url1 = parseUrl(url1/*, true, options.slashesDenoteHost1*/);
	url2 = parseUrl(url2/*, true, options.slashesDenoteHost2*/);
	
	// If unmatching protocols and neither is relative
	if (url1.protocol!==url2.protocol && url1.protocol!==null && url2.protocol!==null) return UrlComponents.NOTHING;
	
	// If unmatching hostname and neither is relative
	if (url1.hostname!==url2.hostname && url1.hostname!==null && url2.hostname!==null)
	{
		// TODO :: implement domain parts
		
		return UrlComponents.PROTOCOL;
	}
	
	// If unmatching port and neither is relative
	if (url1.port!==url2.port && url1.extra.portIsDefault!==null && url2.extra.portIsDefault!==null) return UrlComponents.HOSTNAME;
	
	// If unmatching authentication and neither is relative
	if (url1.auth!==url2.auth && url1.auth!==null && url2.auth!==null) return UrlComponents.HOST;
	
	// TODO :: make normalize optional (speed optimization)
	//if (options.normalize !== false)
	//{
		// This is immutable
		bothAreSameDir = areSameDir
		(
			normalizeDirs(url1.extra.directory, url1.extra.directoryLeadingSlash).dir,
			url1.extra.directoryLeadingSlash,
			
			normalizeDirs(url2.extra.directory, url2.extra.directoryLeadingSlash).dir,
			url2.extra.directoryLeadingSlash
		);
	/*}
	else
	{
		bothAreSameDir = areSameDir
		(
			url1.extra.directory,
			url1.extra.directoryLeadingSlash,
			url2.extra.directory,
			url2.extra.directoryLeadingSlash
		);
	}*/
	
	// If unmatching directories
	if (bothAreSameDir === false) return UrlComponents.AUTH;
	
	// If unmatching filenames
	if (url1.extra.filename !== url2.extra.filename)
	{
		// If one is a document index and the other is not
		if (url1.extra.filenameIsIndex !== url2.extra.filenameIsIndex)
		{
			return UrlComponents.DIRECTORY;
		}
	}
	
	// If unmatching queries
	if (areSameQuery(url1.extra.query, url2.extra.query) === false)
	{
		// If neither is hash-relative nor empty URL
		if (url1.href!=="" && url1.href[0]!=="#" && url2.href!=="" && url2.href[0]!=="#")
		{
			return UrlComponents.FILENAME;
		}
	}
	
	// If unmatching hashes
	if (url1.hash !== url2.hash) return UrlComponents.PATH;
	
	return UrlComponents.HASH;
}



module.exports = urlRelation;
