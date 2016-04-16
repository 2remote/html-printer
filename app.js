var common = require('./lib/common');
var express = require('express');
var request = require('request');
var async = require('async');
var ejs = require('ejs');
var fs = require('fs');

var app = express();
app.use('/', express.static(__dirname + '/www'));

var NotFound = {Title: '文章没有找到！', Content: '抱歉，您需要的文章没有找到。', Cover: 'img/notfound.png'};

var template = '';
loadEjsView('views/article.ejs', function(err, data){
  template = data;
});

var article_list = './www/files.json';

// init generate static files by www/files.json
var filesNeedInit = common.readJSON(article_list);
filesNeedInit.forEach(function(id){
  generateStaticHtml(id, function(err, data){
    console.log(data);
  });
});

// generate/update file route
app.get('/api/make-html-by-id/:id', function(req, res){
  var article_id = req.params.id;
  generateStaticHtml(article_id, function(err, data){
    res.json(data);
  });

  // update init article list and save
  filesNeedInit.push(article_id);
  common.saveJSON(filesNeedInit, article_list);

});

var port = 8080;
app.listen(port);
console.log('Server running at http://127.0.0.1:%s.', port);


// Functions
//

function generateStaticHtml(id, callback) { // ( id -- static file)
  var file = 'www/' + id + '.html';

  async.waterfall([
      async.apply(fetchJson, id),
      async.apply(renderToFile, template),
      async.apply(saveFile, file)
    ],
    function(err, result){
      console.log(result);
      callback(null, {result: result});
    }
  );
}

function fetchJson(id, callback) { // (id -- data)
  request('http://api.aiyaopai.com/\?api\=Article.Get\&Id\=' + 
   id + 
   '\&Fields\=Title,Content,Cover', 
    function(err, res, body){
      if(!err && res.statusCode == 200){
        data = JSON.parse(body);
        callback(null, data);
      }
    }
  );
}

function loadEjsView(file, callback) { // (file -- ejsFileString)
  fs.exists(file, function(exists) {
    if(exists) {
      fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err;
        var ejsFileString = data.toString();
        callback(null, ejsFileString);
      });
    }
  });
}

function renderToFile(templateStr, data, callback){ // (templateStr, data -- html) 
  console.log(data);
  var html = ejs.render(templateStr, NotFound);
  if(data.Success){
    html = ejs.render(templateStr, data);
  }
  callback(null, html);
}

function saveFile(file, string, callback) { // (file, string -- )
  fs.writeFile(file, string, function(err){
    if(err) throw err;
    console.log('The %s was saved!', file);
    callback(null, {Success: true});
  });
}

