var express = require('express');

var app = express();
app.use('/', express.static(__dirname + '/www'));

var port = 6000;
app.listen(port);
console.log('Server running at http://127.0.0.1:%s.', port);

