var stageUrlList = ["10.0.11.126", '10.0.11.126'];
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
			timeout: 5000,
			success: function(data){
				jsonResult[ipAddress] = data.server;
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('error ' + textStatus + " " + errorThrown);
			}
		});
	}

	JSON.stringify(jsonResult);
}