"use strict";

// Numbers used to enable arithmetics
module.exports = 
{
	NOTHING:  -1,
	
	PROTOCOL:  0,
	AUTHORITY: 1,
	HOSTNAME:  2,	// TODO :: add subdomain, domain, top-level domain
	PORT:      3,
	DIRECTORY: 4,
	FILENAME:  5,
	QUERY:     6,
	FRAGMENT:  7
};
