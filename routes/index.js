var express = require('express');
var router = express.Router();
var nodeUtil = require('../public/javascripts/nodeUtil.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/node', require('body-parser').json(), function(req, res){
  var status = req.body.status;
  var convertedStatus = nodeUtil.convertStatus(status);

  var isSupportedStatus = nodeUtil.isStatusSupported(convertedStatus);

  var rtnCode = 200;
  var isSuccess = true;
  var rtnMessage = "Well done, mate.";

  if (true == isSupportedStatus){
    var newContent = nodeUtil.assembleNewContent(convertedStatus);
    nodeUtil.writeContentToFile(newContent);

    rtnMessage = newContent;
    rtnCode = 200;
    isSuccess = true;
  }
  else {
    rtnMessage = "unsupported status. status:" + status;
    rtnCode = 500;
    isSuccess = false;
  }

  res.statusCode = rtnCode;
  return res.json({success: isSuccess, message: rtnMessage});
});

module.exports = router;
