var test = require('tape');
var common = require('../lib/common'); 

test('read demo.json into array', function(t) {
  t.plan(2);
  var current_path = common.getFilePath('./www/files.json');
  t.equal(true, current_path.indexOf('files.json') >= 0);
  var data = common.readJSON('./www/files.json');
  t.equal(3, data.files.length);
});
