module.exports = {
  options: {
    reporter: 'spec',
    ui: 'mocha-given',
    require: ['coffee-script/register', 'should']
  },
  test: {
    src: ['test/**/*.coffee']
  }
};
