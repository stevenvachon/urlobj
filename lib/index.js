"use strict";

module.exports = 
{
	//format:        require("./formatUrl"),
	//normalize:     require("./normalizeUrl"),
	parse:         require("./parseUrl"),
	relation:      require("./urlRelation"),
	//resolve:       require("./resolveUrl"),
	
	// TODO :: flatten dirs and query into an "internal" key?
	dirs:
	{
		join:      require("./joinDirs"),
		normalize: require("./normalizeDirs"),
		parse:     require("./parsePath"),
		resolve:   require("./resolveDirs")
	},
	
	query:
	{
		join:      require("./joinQuery")
	},
	
	components:    require("./UrlComponents")
};
