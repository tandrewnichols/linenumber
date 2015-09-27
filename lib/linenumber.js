(function() {
  // Decide what environment we're running in
  var isNode = typeof module !== 'undefined' && this.module !== module;

  /* istanbul ignore next */ 
  var fs = isNode ? require('fs') : {};
  var loader, args;

  var defaultLoader = fs.readFileSync;
  var defaultArgs = [{ encoding: 'utf8' }];

  var find = function(contents, query, file) {
    // Create a regex for the query if it's not one already
    var regex = query instanceof RegExp ? query : new RegExp(query, 'g');
    // For performance, make sure the contents actual contain the pattern
    // before we parse them.
    if (!regex.test(contents)) {
      return null;
    } else {
      // regex.test advances the search index, so we need to reset it
      regex.lastIndex = 0;
      var match;
      var matches = [];
      // Iterate over the matches
      while ((match = regex.exec(contents)) !== null) {
        // and construct an object of the matches that includes
        // line and the string that matches, as well as the file
        // name if there is one.
        var matchObj = {
          line: contents.substring(0, match.index).split('\n').length,
          match: match[0]
        };

        if (file) {
          matchObj.file = file;
        }

        matches.push(matchObj);
      }
      return matches;
    }
  };

  var linenumber = function(file, query, cb) {
    // If "file" looks like a filename
    if (file.indexOf('\n') === -1 && file.indexOf('.') > -1) {
      // Call the loader with the supplied args.
      var contents = loader.apply(null, [file].concat(args));
      return find(contents, query, file);
    } else {
      return find(file, query); 
    }
  };

  linenumber.loader = function(fn) {
    loader = fn;
    args = [].slice.call(arguments, 1);
  };

  linenumber.reset = function() {
    loader = defaultLoader;
    args = defaultArgs;
  };

  // Initialize loader and args
  linenumber.reset();

  /* istanbul ignore else */
  if (isNode) {
    module.exports = linenumber;
  } else {
    window.linenumber = linenumber;
  }

})();
