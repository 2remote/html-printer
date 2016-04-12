var express = require('express');
var request = require('request');
var async = require('async');

var app = express();
app.use('/', express.static(__dirname + '/www'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var data = {Title: 'Not found'};

app.get('/api/show/:id', function(req, res){
  var article_id = req.params.id;
  async.waterfall([
      async.apply(fetchJson, article_id)
    ], function(err, result){
    result = eval('(' + result + ')');
    res.render('article', result);
  });
});

var port = 6000;
app.listen(port);
console.log('Server running at http://127.0.0.1:%s.', port);

function renderBack(data, res, callback) {
  res.render('article', data);
}

function fetchJson(id, callback) {
  request('http://api.aiyaopai.com/\?api\=Article.Get\&Id\='
    + id
    + '\&Fields\=Title', 
    function(err, res, body){
      if(!err && res.statusCode == 200){
        callback(null, body);
      }
    }
  );
}
