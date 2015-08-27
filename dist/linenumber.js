(function() {
  // require fs or stub it if we're in a browser
  var fs = typeof window === 'undefined' ? require('fs') : {};

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

  var linenumber = function(file, query, loader) {
    // If "file" looks like a filename
    if (file.indexOf('\n') === -1 && file.indexOf('.') > -1) {
      // If a specific file loading function is provided, provide
      // the filename to that loader. As an example, in an angular app,
      // you could pass $templateCache.get as the loader to parse cached
      // templates. If no loader is provided, use fs.readFileSync.
      var contents = loader ? loader(file) : fs.readFileSync(file, { encoding: 'utf8' });
      return find(contents, query, file);
    } else {
      return find(file, query); 
    }
  };

  // Maybe slightly over-simplified but should be sufficient in most cases
  if (typeof module === 'object' && module.exports) {
    module.exports = linenumber;
  } else {
    window.linenumber = linenumber;
  }

})();
