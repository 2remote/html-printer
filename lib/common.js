var fs = require('fs');
var path = require('path');

exports.getFilePath = function(file) { // ( file -- fullpath )
  var filepath = path.join(process.cwd(), file);
  return filepath;
};

exports.readJSON = function(file) { // ( file -- data )
  var filePath = exports.getFilePath(file);
  var data = JSON.parse(fs.readFileSync(filePath, 'utf8') || []);
  return data;
}
