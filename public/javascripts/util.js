function assembleFullURL(ipAddress, path){
	var fullURL = _protocol + '://' + ipAddress + ':' + _port + '/' + path;

	return fullURL;
}

function ajaxGetServerStatusAndUpdate(){
	var jsonResult = {};
    var messageCount = 0;
    var urlListSize = stageUrlList.length;

    for (var i=0;i<urlListSize;i++) {
		var ipAddress = stageUrlList[i];
		var fullURL = assembleFullURL(ipAddress, _node);

		$.ajax({
			type: 'GET',
			url: fullURL,
			dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'jsonpCallback',
			cache: false,
            async:false,
			timeout: 5000,
			success: function(data){
                messageCount++;
                var key = ipAddress.replace(/\./g, "_");
                var serverStatus = data.server;
                var value = serverStatus.replace(/[\r\n]/g,"");

				jsonResult[key] = value;

                if (messageCount == urlListSize){
                    update(jsonResult);
                }
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('error ' + textStatus + " " + errorThrown);
			}
		});
	}
}

function jsonpCallback(){

}

function update(serverStatusJson){
    for(var checkBoxId_AsKey in serverStatusJson){
        showCheckBox_ByServerStatus(checkBoxId_AsKey, serverStatusJson[checkBoxId_AsKey]);
    }
}
function showCheckBox_ByServerStatus(key, value){
	if (value == _onStatus) {
		$('#'+key).attr("checked", true);
	}
	else if (value == _offStatus){
        $('#'+key).attr("checked", false);
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
		var jsonInputData = {};
		jsonInputData[_serverStatus] = serverStatus;

        $.ajax({
            type: 'POST',
            url: fullURL,
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'jsonpCallback',
            data: jsonInputData,
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