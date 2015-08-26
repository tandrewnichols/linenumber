module.exports = {
  mocha: ['mochaTest:test'],
  'default': ['jshint:all', 'mocha'],
  coverage: ['istanbul:unit', 'open:coverage'],
  ci: ['test', 'travis']
};
