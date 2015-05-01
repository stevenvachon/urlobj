# urlobj [![NPM Version](http://badge.fury.io/js/urlobj.svg)](http://badge.fury.io/js/urlobj) [![Build Status](https://secure.travis-ci.org/stevenvachon/urlobj.svg)](http://travis-ci.org/stevenvachon/urlobj)
> Performant utilities for URL resolution and parsing built on core [url](https://nodejs.org/api/url.html).

This module provides many tools for working with Objects parsed with [`url.parse()`](https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost). This performs faster because it avoids the need to constantly reparse URL Strings during multiple operations.

## Constants

### components

* components.NOTHING
* components.PROTOCOL
* components.AUTHORITY
* components.HOSTNAME
* components.PORT
* components.DIRECTORY
* components.FILENAME
* components.QUERY
* components.FRAGMENT

## Methods

The following methods will accept URLs as Strings and/or Objects.

### minify(url, options)
Normalizes and minifies a url with the following options:

* `defaultPorts`; a map of default ports for various protocols. Default value: `{ftp:21, http:80, https:443}`.
* `directoryIndexes`; a list of filenames that are expected to be treated as directory indexes. Default value: `["index.html"]`.
* `removeAuth`; when set to `true`, it will remove authentication information. Default value: `false`.
* `removeDefaultPorts`; when set to `true`, it will remove ports that match any found in `defaultPorts`. Default value: `true`.
* `removeDirectoryIndexes`; when set to `true`, it will remove filenames that match any found in `directoryIndexes`. Default value: `true`.
* `removeEmptyQueries`; when set to `true`, it will remove empty query data such as `?`, `?var=` and `&=`. Default value: `false`.
* `removeRootTrailingSlash`; when set to `true`, it will remove trailing slashes such as `http://domain.com/?var`. Default value: `true`.

### normalize(url)
Resolves dot segments (`"../"`, `"./"`) in a URL's path.

### parse(url, parseQueryString, slashesDenoteHost, defaultPorts, directoryIndexes)
Parses a URL String into an Object containing its URL components.

### relation(url1, url2)
Returns a Number defining the relation between two URLs. That number corresponds to the value of a URL component in [`components`](#components).

### resolve(from, to)
Resolves a base URL with an href URL as a browser would for an anchor tag.

## Exposed Inernal Methods

### areSameDir(dirArray1, dir1LeadingSlash, dirArray2, dir2LeadingSlash)
Compares two dir Arrays to see if their paths are the same. `dir1LeadingSlash` and `dir2LeadingSlash` denote that the corresponding dir Array is absolute and not relative. Input should first be normalized.

### areSameQuery(queryObj1, queryObj2)
Compares two query Objects to see if their data is the same. Order does not matter.

### joinDirs(dirArray, leadingSlash)
Joins all dirs of a dir Array into a String. `leadingSlash` denotes that the dir Array is absolute and not relative.

### joinQuery(queryObj, skipEmpties)
Joins all keys of an Object into a query String.

When `skipEmpties` is `true`, empty query data such as `?var=` and `&=` will be excluded. Its default value is `false`.

### normalizeDirs(dirArray, leadingSlash)
Resolves dot segments (`"../"`, `"./"`) in a dir Array. `leadingSlash` denotes that the dir Array is absolute and not relative. This method will attempt to resolve to a root. If none is found, the parent-most dot segment will remain.

Examples using Strings instead of Arrays:

Turns "/dir1/dir2/../" into "/dir1/"
Turns "dir/../" into ""
Turns "/../dir/" into "/dir/"
Leaves "../dir/" untouched
Leaves "../../dir/" untouched

### parsePath(pathString)
Parses a path String into an Object containing a dir Array and a filename String.

### resolveDirs(fromDirArray, fromLeadingSlash, toDirArray, toLeadingSlash)
Resolves a base dir Array to another dir Array and normalizes. `fromLeadingSlash` and `toLeadingSlash` denote that the corresponding dir Array is absolute and not relative.
