describe 'linenumber with literal text', ->
  Given -> @linenumber = if typeof require == 'function' then require '../lib/linenumber' else window.linenumber
  Given -> @text = """
    exports.eat = function(bites, size) {
      var banana = new Banana(size);
      var quantity =  banana.length - bites;
      return 'You have ' + quantity + '/' banana.length + ' of a banana left';
    };

    exports.getColor = function() {
      return 'yellow';
    };
  """

  context 'on a literal string', ->
    context 'and a single match', ->
      When -> @match = @linenumber @text, 'getColor'
      Then -> @match.should.eql [
        line: 7
        match: 'getColor'
      ]

    context 'and no match', ->
      When -> @match = @linenumber @text, 'peel'
      Then -> (@match == null).should.be.true

    context 'and multiple matches', ->
      When -> @match = @linenumber @text, 'exports'
      Then -> @match.should.eql [
        line: 1
        match: 'exports'
      ,
        line: 7
        match: 'exports'
      ]

  context 'on a regex as a string', ->
    When -> @match = @linenumber @text, 'var [^ ]+'
    Then -> @match.should.eql [
      line: 2
      match: 'var banana'
    ,
      line: 3
      match: 'var quantity'
    ]

  context 'on a regex object', ->
    When -> @match = @linenumber @text, /var [^ ]+/g
    Then -> @match.should.eql [
      line: 2
      match: 'var banana'
    ,
      line: 3
      match: 'var quantity'
    ]

  context 'with a custom file loader', ->
    Given -> @get = (file) =>
      return @text
    Given -> @custom = @linenumber.loader @get
    When -> @match = @custom "foo/bar/banana.js", 'getColor'
    Then -> @match.should.eql [
      file: "foo/bar/banana.js"
      line: 7
      match: 'getColor'
    ]
