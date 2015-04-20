"use strict";



/*
	Compares two query Objects to see if their data is the same.
	
	Order does not matter.
*/
function areSameQuery(queryObj1, queryObj2)
{
	var i,j,len,value1,value1clone,value2,value2clone;
	var queryObj1_length = 0;
	
	for (i in queryObj1)
	{
		value1 = queryObj1.hasOwnProperty(i);
		value2 = queryObj2.hasOwnProperty(i);
		
		if (value1===false || value2===false || value1!==value2) return false;
		
		value1 = queryObj1[i];
		value2 = queryObj2[i];
		
		// If strings don't match
		if (value1 !== value2)
		{
			// Only other type allowed is Array
			// "?var1=a&var1=b" would've been parsed to { var1: ["a","b"] }
			if (Array.isArray(value1) !== Array.isArray(value2)) return false;
			
			len = value1.length;
			
			if (len !== value2.length) return false;
			
			// Clone so that sort does not mutate input
			// Sort so that values can possibly match at same indexes
			value1clone = value1.slice().sort();
			value2clone = value2.slice().sort();
			
			for (j=0; j<len; j++)
			{
				if (value1clone[j] !== value2clone[j]) return false;
			}
		}
		
		queryObj1_length++;
	}
	
	if (queryObj1_length !== Object.keys(queryObj2).length) return false;
	
	return true;
}



module.exports = areSameQuery;