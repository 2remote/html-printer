var express = require('express');
var request = require('request');
var async = require('async');

var app = express();
app.use('/', express.static(__dirname + '/www'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var NotFound = {Title: 'Not found'};

app.get('/api/show/:id', function(req, res){
  var article_id = req.params.id;
  async.waterfall([
      async.apply(fetchJson, article_id)
    ], 
  function(err, result){
    result = eval('(' + result + ')');
    if (result.Success){
      res.render('article', result);
    }else{
      res.render('article', NotFound);
    }
  });
});

var port = 6000;
app.listen(port);
console.log('Server running at http://127.0.0.1:%s.', port);

function fetchJson(id, callback) {
  request('http://api.aiyaopai.com/\?api\=Article.Get\&Id\='
    + id
    + '\&Fields\=Title', 
    function(err, res, body){
      if(!err && res.statusCode == 200){
        console.log(body);
        callback(null, body);
      }
    }
  );
}
