module.exports = {
  options: {
    targets: {
      test: '{{ version }}',
      when: 'v0.12',
      tasks: ['mochacov:lcov', 'matrix:v0.12']
    }
  }
};
