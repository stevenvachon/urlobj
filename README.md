# urlobj [![NPM Version](http://badge.fury.io/js/urlobj.svg)](http://badge.fury.io/js/urlobj) [![Build Status](https://secure.travis-ci.org/stevenvachon/urlobj.svg)](http://travis-ci.org/stevenvachon/urlobj)  [![Dependency Status](https://david-dm.org/stevenvachon/urlobj.svg)](https://david-dm.org/stevenvachon/urlobj)
> Performant utilities for URL resolution and parsing built on core [url](https://nodejs.org/api/url.html).

This module provides many tools for working with Objects parsed with [`url.parse()`](https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost). This performs faster because it avoids the need to constantly reparse URL Strings during multiple operations.

## Constants

### components

URL components used in comparison operations.

* `components.NOTHING`
* `components.PROTOCOL` or `components.SCHEME`
* `components.TLD`
* `components.DOMAIN`
* `components.SUB_DOMAIN`
* `components.HOSTNAME`
* `components.PORT`
* `components.HOST`
* `components.AUTH`
* `components.DIRECTORY`
* `components.FILENAME`
* `components.PATHNAME`
* `components.QUERY` or `components.SEARCH`
* `components.PATH`
* `components.HASH` or `components.FRAGMENT`

```
                                    HOST                         PATH
                                   ___|___                 _______|______
                                  /       \               /              \
               AUTH           HOSTNAME    PORT        PATHNAME          QUERY   HASH
         _______|_______   ______|______   |   __________|_________   ____|____   |
        /               \ /             \ / \ /                    \ /         \ / \
  foo://username:password@www.example.com:123/hello/world/there.html?name=ferret#foo
  \_/                     \_/ \_____/ \_/     \_________/ \________/
   |                       |     |     |           |           |
PROTOCOL              SUB_DOMAIN |    TLD      DIRECTORY   FILENAME
                                 |
                              DOMAIN
```

**Note:** there are a few breaks in the linearity of these values:

* `AUTH` is prioritized *after* `HOST` because matching authentication on a different domain is pointless
* `TLD` is prioritized *before* `DOMAIN` because matching a domain on a different top-level domain is pointless
* `SUB_DOMAIN` is prioritized *after* `DOMAIN`

## Methods

The following methods will accept URLs as Strings and/or Objects.

### minify(url, options)
Normalizes and minifies a URL with the following options:

* `defaultPorts`; a map of default ports for various protocols. Default value: `{ftp:21, gopher:70, http:80, https:443}`.
* `directoryIndexes`; a list of filenames that are expected to be treated as directory indexes. Default value: `["index.html"]`.
* `removeAuth`; when set to `true`, it will remove authentication information. Default value: `false`.
* `removeDefaultPorts`; when set to `true`, it will remove ports that match any found in `defaultPorts`. Default value: `true`.
* `removeDirectoryIndexes`; when set to `true`, it will remove filenames that match any found in `directoryIndexes`. Default value: `true`.
* `removeEmptyQueries`; when set to `true`, it will remove empty query data such as `?`, `?var=` and `&=`. Default value: `false`.
* `removeRootTrailingSlash`; when set to `true`, it will remove trailing slashes such as `http://domain.com/?var`. Default value: `true`.

### normalize(url)
Resolves dot segments (`"../"`, `"./"`) in a URL's path and removes the value of `port`.

### parse(url, parseQueryString, slashesDenoteHost)
### parse(url, options)
Parses (or re-parses) a URL into an Object containing its URL components with the following options:

* `defaultPorts`; a map of default ports for various protocols. Default value: `{ftp:21, gopher:70, http:80, https:443}`.
* `directoryIndexes`; a list of filenames that are expected to be treated as directory indexes. Default value: `["index.html"]`.
* `parseQueryString`; when set to `true`, it will parse the query string into an object. Default value: `false`.
* `slashesDenoteHost`; when set to `true`, it will parse "//domain.com/" as a url instead of a path. Default value: `false`.

### relation(url1, url2)
Returns a Number defining the relation between two URLs. That number corresponds to the value of a URL component in [`components`](#components).

Because the value returned is a Number, more complex comparisons are possible:

```js
var relation = urlobj.relation(url1, url2);

if (relation >= urlobj.components.HOST) {
	console.log("same server!");
}
```

### resolve(from, to)
Resolves a URL with a base URL like a browser would for an anchor tag.

## Exposed Internal Methods

### areSameDir(dirArray1, leadingSlash1, dirArray2, leadingSlash2)
Compares two directory Arrays to see if their paths are the same. `leadingSlash1` and `leadingSlash2` denote that the corresponding path is absolute and not relative. Input should first be normalized.

### areSameQuery(queryObj1, queryObj2)
Compares two query Objects to see if their data is the same. Order does not matter.

### joinDirs(dirArray, leadingSlash)
Joins all directories of a directory Array into a String. `leadingSlash` denotes that the path is absolute and not relative.

### joinQuery(queryObj, skipEmpties)
Joins all keys of an Object into a query String.

When `skipEmpties` is `true`, empty query data such as `?var=` and `&=` will be excluded. Its default value is `false`.

### normalizeDirs(dirArray, leadingSlash)
Resolves dot segments (`"../"`, `"./"`) in a directory Array and returns a new Array (within an Object). `leadingSlash` denotes that the path is absolute and not relative. This method will attempt to resolve to a root. If none is found, the parent-most dot segment will remain.

Examples **using Strings instead of Arrays**:

* Turns `"/dir1/dir2/../"` into `"/dir1/"`
* Turns `"dir/../"` into `""`
* Turns `"/../dir/"` into `"/dir/"`
* Leaves `"../dir/"` untouched
* Leaves `"../../dir/"` untouched

### parsePath(pathString)
Parses a path String into an Object containing a directory Array and a filename String.

### resolveDirs(fromDirArray, fromLeadingSlash, toDirArray, toLeadingSlash)
Resolves a base directory Array to another directory Array and returns a new, normalized Array (within an Object). `fromLeadingSlash` and `toLeadingSlash` denote that the corresponding path is absolute and not relative.
