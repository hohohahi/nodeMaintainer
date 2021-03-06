var filePath = "/home/om/OddsMatrixDeploy/web/node"
var prefix = "server="
var INVALID_STATUS = "invalid status"
var fs = require('fs');

exports.isStatusSupported = function(status){
	var isSupported = true;
	if ("enabled" == status || "disabled" == status){
		isSupported = true;
	}
	else{
		isSupported = false;
	}
	
	return isSupported;
}

exports.writeContentToFile = function(content){
	fs.writeFile(filePath, content, function (err) {
		if (err) throw err;
		console.log(content + " has been saved.");
	});
}

exports.getContentFromFile = function(){
	var contentText = fs.readFileSync(filePath,'utf-8');
	return contentText;
}

exports.convertContentToServerStatus = function(content){
	var length = content.length;
	var status = content.substr(7, length-7);
	return status;
}

exports.assembleNewContent = function(status){
	content = prefix + status;

	return content;
}

exports.ajaxGetServerStatus = function(){

}