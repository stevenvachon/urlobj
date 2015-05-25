"use strict";

module.exports = 
{
	//format:        require("./formatUrl"),	// TODO :: might not need this
	//minify:        require("./minifyUrl"),	// TODO :: put in separate package? remove directory indexes, query optimizations
	normalize:     require("./normalizeUrl"),
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
