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
var article_list = './www/files.json';
// init generate static files by www/files.json
var filesNeedInit = common.readJSON(article_list);

loadEjsView('views/article.ejs', function(err, data){
  template = data;
  initStaticHtml();
});

// generate/update file route
app.get('/api/make-html-by-id/:id', function(req, res){
  var article_id = req.params.id;
  generateStaticHtml(article_id, function(err, data){
    refreshCdn()
    res.json(data);
  });

  // update init article list and save
  if ( filesNeedInit.indexOf(article_id) == -1 ) {
    filesNeedInit.push(article_id);
    common.saveJSON(filesNeedInit, article_list);
  }

});

var port = 8111;
app.listen(port);
console.log('Server running at http://127.0.0.1:%s.', port);


// Functions
//

function initStaticHtml(){  // generate static html from www/files.json
  var generatorTasks = [];

  filesNeedInit.forEach(function(id){
    generatorTasks.push(makeStaticHtmlGenerator(id));
  });

  async.parallel(generatorTasks);
  refreshCdn()
}

function makeStaticHtmlGenerator(id, res) { // ( id, res -- generateStaticHtml(id) )
  return function(){
    generateStaticHtml(id, function(err, result){
      console.log(result);
    });
  };
}

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
  var html = ejs.render(templateStr, NotFound);
  if(data.Success){
    html = ejs.render(templateStr, data);
  }
  callback(null, html);
}

function saveFile(file, string, callback) { // (file, string -- )
  fs.writeFile(file, string, function(err){
    if(err) throw err;
    console.log('The %s was saved with %d chars.', file, string.length);
    callback(null, {Success: true});
  });
}

function refreshCdn(){
  /**
   * 如果环境变量存在qcloud 的SecretId 和 SecretKey 就认为需要刷新CDN
   * 环境变量需要:
   * QCLOUD_SECRETID : SecretId
   * QCLOUD_SECRETKEY : SecretKey
   * CDNURL : 需要刷新的Url或目录
   */
  var secretId = process.env.QCLOUD_SECRETID;
  var secretKey = process.env.QCLOUD_SECRETKEY;
  var cdnurl = process.env.CDNURL;

  if(secretId && secretKey && cdnurl){
    var QcloudApi = require('./QcloudApi')
    var qcloud = new QcloudApi({
      SecretId: secretId,
      SecretKey: secretKey,
      method: 'GET',
      serviceType:'cdn',
    })
    var params = {
      Region: 'gz',
      Action: 'RefreshCdnDir',
    };
    var cdnurls = cdnurl.split(',');
    cdnurls.forEach(function (item,index) {
      params['dirs.'+ index] = item;
    })
    qcloud.request(params, function(error, data) {
      console.log('Qcloud RefreshCdn result : ' + data);
    })
  }
}
