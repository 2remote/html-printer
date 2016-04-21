var test = require('tape');
var common = require('../lib/common'); 

test('read json from file: files.json into array', function(t) {
  t.plan(2);
  var current_path = common.getFilePath('./test/files.json');
  t.equal(true, current_path.indexOf('files.json') >= 0);
  var data = common.readJSON('./test/files.json');
  t.equal(data.length, 5, data);
});
