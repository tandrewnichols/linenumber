module.exports = {
  mocha: ['mochaTest:test'],
  test: ['jshint:all', 'mocha', 'testem:ci:browser'],
  'default': ['test'],
  coverage: ['istanbul:unit', 'open:coverage'],
  ci: ['test', 'travis'],
  build: ['clean:dist', 'copy:dist', 'uglify:dist']
};
