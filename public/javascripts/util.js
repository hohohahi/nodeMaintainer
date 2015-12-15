function assembleFullURL(ipAddress, path){
	var fullURL = _protocol + '://' + ipAddress + ':' + _port + '/' + path;

	return fullURL;
}

function ajaxGetServerStatus(){
	var jsonResult = {};
	for (var i=0;i<stageUrlList.length;i++) {
		var ipAddress = stageUrlList[i];
		var fullURL = assembleFullURL(ipAddress, _node);

		$.jsonp({
			type: 'GET',
			url: fullURL,
			dataType: 'jsonp',
            jsonp: 'callback',
			cache: false,
			async:false,
			timeout: 5000,
			success: function(data){
                var key = ipAddress.replace(/\./g, "_");
                var serverStatus = data.server;
                var value = serverStatus.replace(/[\r\n]/g,"");

                alert(key);
                alert(value);
                alert(serverStatus);

				jsonResult[key] = value;

                alert(JSON.stringify(jsonResult));
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('error ' + textStatus + " " + errorThrown);
			}
		});
	}
    alert(JSON.stringify(jsonResult));

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

function convert_Id_Ip(id){
	var ip = id.replace(/_/g, ".");
	return ip;
}

function getJsonResult_FromCheckBox(){
	var jsonResult = {};
	$("input[type='checkbox']").each(function(){
		var id = $(this).attr("id");
		var status = '';
		if($(this).is(':checked') == true)
		{
			status = _onStatus;
		}
		else
		{
			status = _offStatus;
		}

		var ip = convert_Id_Ip(id);
		jsonResult[ip] = status;
	});

	return jsonResult;
}

function updateServerStatus_ByCheckBox(){
	var jsonResult = getJsonResult_FromCheckBox();

	for(var ipAsKey in jsonResult){
		var serverStatus = jsonResult[ipAsKey];
		var fullURL = assembleFullURL(ipAsKey, _node);
		var jsonResult = {};
		var jsonInputData = {};
		jsonInputData[_serverStatus] = serverStatus;

		if ('10.0.11.127' == ipAsKey){
			alert('ip:' + ipAsKey + '. continue');
			continue;
		}

		$.jsonp({
			type: 'POST',
			url: fullURL,
			dataType: 'jsonp',
			data: jsonInputData,
            jsonp: "callback",
			cache: false,
			async:false,
			timeout: 5000,
			success: function(data){

			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('error ' + textStatus + " " + errorThrown);
			}
		});
	}
}