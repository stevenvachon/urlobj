# urlobj [![NPM Version](http://badge.fury.io/js/urlobj.svg)](http://badge.fury.io/js/urlobj) [![Build Status](https://secure.travis-ci.org/stevenvachon/urlobj.svg)](http://travis-ci.org/stevenvachon/urlobj)
> Performant utilities for URL resolution and parsing built on core [url](https://nodejs.org/api/url.html) (Node.js)

> url-extra contains methods that aren't included in the vanilla Node.js [url](https://nodejs.org/api/url.html) package.

This module adds a few extra URL methods that aren't included in the native `url` module. It is a drop in replacement for `url`.

## Why?
I got tired of writing redundant functions and disliked the fact that my URL strings were constantly being reparsed.


This library provides additional functions for working with objects parsed from URL strings via [`url.parse()`](https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost).
