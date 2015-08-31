[![Build Status](https://travis-ci.org/tandrewnichols/linenumber.png)](https://travis-ci.org/tandrewnichols/linenumber) [![downloads](http://img.shields.io/npm/dm/linenumber.svg)](https://npmjs.org/package/linenumber) [![npm](http://img.shields.io/npm/v/linenumber.svg)](https://npmjs.org/package/linenumber) [![Code Climate](https://codeclimate.com/github/tandrewnichols/linenumber/badges/gpa.svg)](https://codeclimate.com/github/tandrewnichols/linenumber) [![Test Coverage](https://codeclimate.com/github/tandrewnichols/linenumber/badges/coverage.svg)](https://codeclimate.com/github/tandrewnichols/linenumber) [![dependencies](https://david-dm.org/tandrewnichols/linenumber.png)](https://david-dm.org/tandrewnichols/linenumber) ![Size](https://img.shields.io/badge/size-0.7kb-brightgreen.svg)

# linenumber

Get the line number of one or more matches in a file

## Installation

`npm install --save linenumber`

## Summary

Pass in the contents of a file or a filename, along with a pattern, and get back an array that includes the line numbers of any matches in that file.

## Usage

Linenumber takes two arguments, the content to search (which can also be a filename) and the string or regular expression pattern to search for.

For example, given _lib/foo.json_,

```js
{
  "foo": 1,
  "bar": true,
  "baz": "a string"
}
```

any of the following will work:

```js
var linenumber = require('linenumber');

// With string content and query
linenumber('Foo\nbar\nbaz', 'bar'); // [{ line: 2, match: 'bar' }]

// With a filename
linenumber('lib/foo.json', 'bar'); // [{ line: 3, match: 'bar', file: 'lib/foo.json' }]

// With a regular expression
linenumber('lib/foo.json', /ba./g); // [{ line: 3, match: 'bar', file: 'lib/foo.json' }, { line: 4, match: 'baz', file: 'lib/foo.json' }]

// Without a match
linenumber('lib/foo.json', 'hello'); // null
```

By default, `linenumber` will use `fs.readFileSync` to read in the contents of a file, but you can set it up to use a different file loader if desired. For instance, since our examples above use a `.json` file, we can make `linenumber` use `require` as the loader instead.

```js
linenumber.loader(require);
linenumber('lib/foo.json', 'bar');
```

### Browser

Use whatever serving mechanism you prefer and serve `dist/expand-path.js` or `dist/expand-path.min.js`, then access it globally with `expandPath`.

```html
<script src="/dist/expand-path.js"></script>
<script>
  var paths = expandPath('foo.ba[r,z]');
</script>
```

This script is a measly 1.7kb minified.

### With object paths

```js
var expand = require('expand-path');
var list = expand('foo.bar.[baz,quux].[hello,goodbye].world');

/*
 * "list" equals:
 *  [
 *    'foo.bar.baz.hello.world',
 *    'foo.bar.quux.hello.world',
 *    'foo.bar.baz.goodbye.world',
 *    'foo.bar.quux.goodbye.world'
 *  ]
 */
```

### With file paths

```js
var expand = require('expand-path');
var list = expand('foo/bar/[baz,quux]/hello/world[.js,spec-coffee]');

/*
 * "list" equals:
 *  [
 *    'foo/bar/baz/hello/world.js',
 *    'foo/bar/quux/hello/world.js',
 *    'foo/bar/baz/hello/world-spec.coffee',
 *    'foo/bar/quux/hello/world-spec.coffee'
 *  ]
 */
```

Note that `expand-path` does not do any disk I/O. It does not read in these file paths or check that they exist. All it does is expand brackets into a list of paths. There are plenty of other modules that can make use of a list of paths (`async`, in combination with `fs` is enough).

## Contributing

I'll be happy to merge any pull request that adds value and has passing tests. Be sure to add a test both for node and for the browser. Tests are run with `grunt`.
