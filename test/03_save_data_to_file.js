var fs = require('fs');
var test = require('tape');
var common = require('../lib/common');

test('save data to file', function(t){
  var data = ["1", "2", "3", "4", "5"];
  var file = './test/files.json';
  var filepath = common.getFilePath(file);

  common.saveJSON(data, file);
  t.plan(2);
  fs.exists(filepath, function(exists){
    if(exists) {
      t.equal(true, true); // file exists
      var data = common.readJSON(file);
      t.equal(data.length, 5);
    }
  });
});

