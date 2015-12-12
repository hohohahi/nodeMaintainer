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

exports.convertStatus = function(status){
	var newStatus = INVALID_STATUS;
	
	if ("on" == status){
		newStatus = "enabled"
	}
	else if ("off" == status){
		newStatus = "disabled"
	}
	
	console.log("from " + status + " to " + newStatus);
	return newStatus;
}

exports.writeContentToFile = function(content){
	fs.writeFile(filePath, content, function (err) {
		if (err) throw err;
		console.log(content + " has been saved.");
	});
}

exports.assembleNewContent function(status){
	content = prefix + status;
	
	return content;
}