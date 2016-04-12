var express = require('express');

var app = express();
app.use('/', express.static(__dirname + '/www'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/api/show/:id', function(req, res){
  res.render('article', { title: req.params.id });
});

var port = 6000;
app.listen(port);
console.log('Server running at http://127.0.0.1:%s.', port);

