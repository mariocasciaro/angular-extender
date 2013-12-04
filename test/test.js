var expect = require('chai').expect,
  fs = require('fs'),
  angularExtend = require('../index.js');



describe('extend', function() {
  it('should extend module declaration with no dependencies', function() {
    var src = "angular.module('moduleName');";
    var res = angularExtend(src, {moduleName: ['test']});
    expect(res).to.be.equal("angular.module('moduleName', [\"test\"]);");
  });


  it('should extend module declaration with existing dependencies', function() {
    var src = "angular.module('moduleName', ['test']);";
    var res = angularExtend(src, {moduleName: ['test1']});
    expect(res).to.be.equal("angular.module('moduleName', [\"test\",\"test1\"]);");
  });


  it('should extend multiple module declaration in the same source', function() {
    var src = fs.readFileSync('test/fixtures/multiple.js', 'utf-8');
    var res = angularExtend(src, {
      mod1: ['test1', 'test2'],
      mod2: ['test3']
    });
    var expected = fs.readFileSync('test/expected/multiple.js', 'utf-8');
    expect(res).to.be.equal(expected);
  });
});