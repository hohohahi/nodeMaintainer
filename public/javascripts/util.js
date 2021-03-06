function assembleFullURL(ipAddress, path){
	var fullURL = _protocol + '://' + ipAddress + ':' + _port + '/' + path;

	return fullURL;
}

function ajaxGetServerStatusAndUpdate(){
    $.ajax({
        type: 'GET',
        url: _nodes,
        cache: false,
        timeout: 5000,
        success: function(data){
            alert(data);
            //alert(JSON.stringify(data));
            //update(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
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
    var fullURL = assembleFullURL(ipAsKey, _node);
    $.ajax({
        type: 'POST',
        url: _nodes + '?time=' + new Date().getTime(),
        dataType: 'json',
        data: jsonResult,
        cache: false,
        async:false,
        timeout: 5000,
        success: function(data){
            alert(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
}