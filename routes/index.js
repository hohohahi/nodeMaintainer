var express = require('express');
var router = express.Router();
var nodeUtil = require('../public/javascripts/nodeUtil.js');

var httpsync = require('httpsync');
var stageUrlList = ["10.0.11.126", '10.0.11.127'];
var _onStatus = 'enabled';
var _offStatus = 'disabled';
var _port = 8406;
var _protocol = 'http';
var _node = 'node';
var _nodes = 'nodes';
var _serverStatus = 'status';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/nodeMaintainer', function(req, res){
  res.sendfile("public/html/main.html");
});

router.get('/nodes', function(req, res){
  var urlListSize = stageUrlList.length;
  var joinCount = 0;
  var jsonResult = {};
  for (var i=0;i<urlListSize;i++) {
    var ip = stageUrlList[i];
    var url = "http://" + ip + ':' + _port + '/' + _node + '?time=' + new Date().getTime();

    console.log('ip:' + ip + '--url:' + url);

    //var req = httpsync.get({ url : url});
    //var res = req.end();

    var req = httpsync.get({ url : "http://cnodejs.org"});
    var res = req.end();
    console.log(res);

    jsonResult[ip] = '';
  }

  res.send('abc');
});

router.get('/node', function(req, res){
  console.log("get node in.");
  var content = nodeUtil.getContentFromFile();
  var status = nodeUtil.convertContentToServerStatus(content);
  var jsonResult = {};
  jsonResult['server'] = status;

  res.statusCode = 200;
  //res.write('callback' + '(' + JSON.stringify(jsonResult) + ')');
  //res.write('jsonpCallback' + '(' + JSON.stringify(jsonResult) + ')');
  //res.end();
  return res.json({server: status});
});

router.post('/nodes', require('body-parser').json(), function(req, res){
  var jsonResult = req.body.data;
  console.log(JSON.stringify(jsonResult));
});

router.post('/node', function(req, res){
  var status = req.body.status;
  var isSupportedStatus = nodeUtil.isStatusSupported(status);

  var rtnCode = 200;
  var rtnMessage = "Well done, mate.";
  var jsonResult = {};

  if (true == isSupportedStatus){
    var newContent = nodeUtil.assembleNewContent(status);
    nodeUtil.writeContentToFile(newContent);

    rtnMessage = newContent;
    rtnCode = 200;
  }
  else {
    rtnMessage = "unsupported status. status:" + status;
    rtnCode = 500;
  }

  res.statusCode = rtnCode;
  jsonResult[rtnCode] = rtnCode;
  jsonResult[rtnMessage] = rtnMessage;

  res.write('jsonpCallback' + '(' + JSON.stringify(jsonResult) + ')');
  res.end();

  //return res.json({rtnCode: rtnCode, message: rtnMessage});
});

module.exports = router;
