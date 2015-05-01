"use strict";



function areSameDir(dirArray1, dir1LeadingSlash, dirArray2, dir2LeadingSlash)
{
	var i,len1;
	
	if (dir1LeadingSlash !== dir2LeadingSlash) return false;
	
	len1 = dirArray1.length;
	
	if (len1 !== dirArray2.length) return false;
	
	for (i=0; i<len1; i++)
	{
		if (dirArray1[i] !== dirArray2[i])
		{
			return false;
		}
	}
	
	return true;
}



module.exports = areSameDir;
