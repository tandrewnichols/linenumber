module.exports = {
  browser: {
    src: [
      'lib/linenumber.js',
      'node_modules/mocha-given/browser/mocha-given.js',
      'test/helpers/should.coffee',
      'node_modules/should/should.js',
      'test/*.coffee'
    ],
    options: {
      framework: 'mocha',
      parallel: 2,
      launch_in_ci: ['PhantomJS'],
      launch_in_dev: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],
      reporter: 'dot'
    }
  }
};
