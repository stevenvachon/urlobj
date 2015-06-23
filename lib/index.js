"use strict";

module.exports = 
{
	//absolute:      require("./absolute"),   // TODO :: alias to resolve() ?
	//format:        require("./formatUrl"),  // TODO :: might not need this
	//isAbsolute:    require("./isAbsolute"),
	//isRelative:    require("./isRelative"),
	//minify:        require("./minifyUrl"),  // TODO :: put in separate package? remove directory indexes, query optimizations
	normalize:     require("./normalizeUrl"),
	parse:         require("./parseUrl"),
	relation:      require("./urlRelation"),
	resolve:       require("./resolveUrl"),
	
	// For `relation`
	component:     require("./UrlComponent"),
	
	// For `parseUrl().extra.type`
	type:          require("./UrlType"),
	
	// Exposed internals
	areSameDir:    require("./areSameDir"),
	areSameQuery:  require("./areSameQuery"),
	joinDirs:      require("./joinDirs"),
	joinQuery:     require("./joinQuery"),
	normalizeDirs: require("./normalizeDirs"),
	parsePath:     require("./parsePath"),
	resolveDirs:   require("./resolveDirs")
};
