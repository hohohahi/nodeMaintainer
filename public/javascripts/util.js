var stageUrlList = ["10.0.11.126", '10.0.11.126'];
var _onStatus = 'enabled';
var _offStatus = 'disabled';

function ajaxGetServerStatus(){
	var port = 8406;
	var protocol = 'http';
	var path = 'nodeStatus';

	var jsonResult = {};
	for (var i=0;i<stageUrlList.length;i++) {
		var ipAddress = stageUrlList[i];
		var fullUrl = protocol + '://' + ipAddress + ':' + port + '/' + path;

		$.ajax({
			url: fullUrl,
			dataType: 'json',
			cache: false,
			async:false,
			timeout: 5000,
			success: function(data){
				jsonResult[ipAddress.replace(/\./g, "_")] = data.server.replace(/[\r\n]/g,"");
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('error ' + textStatus + " " + errorThrown);
			}
		});
	}

	return jsonResult;
}

function showCheckBox_ByServerStatus(key, value){
	if (value == _onStatus) {
		$('#'+key).attr("checked", 'true');
	}
	else if (value == _offStatus){
		$('#'+key).attr("checked", 'false');
	}
	else{
		alert('error key/value. key:' + key + '--value:' + value);
	}
}