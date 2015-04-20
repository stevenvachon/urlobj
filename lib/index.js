"use strict";

module.exports = 
{
	//format:        require("./formatUrl"),
	//normalize:     require("./normalizeUrl"),
	parse:         require("./parseUrl"),
	relation:      require("./urlRelation"),
	//resolve:       require("./resolveUrl"),
	
	// For `relation`
	components:    require("./UrlComponents"),
	
	// Exposed internals
	areSameDir:    require("./areSameDir"),
	areSameQuery:  require("./areSameQuery"),
	joinDirs:      require("./joinDirs"),
	joinQuery:     require("./joinQuery"),
	normalizeDirs: require("./normalizeDirs"),
	parsePath:     require("./parsePath"),
	resolveDirs:   require("./resolveDirs")
};
