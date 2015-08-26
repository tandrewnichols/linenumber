module.exports = {
  mocha: ['mochaTest:test'],
  test: ['jshint:all', 'mocha', 'testem:ci:browser'],
  'default': ['browserify:dist', 'test'],
  coverage: ['mochacov:html', 'open:coverage'],
  ci: ['test', 'travis'],
  build: ['clean:dist', 'browserify:dist', 'uglify:dist'],
  browser: ['browserify:dist', 'testem:run:browser']
};
