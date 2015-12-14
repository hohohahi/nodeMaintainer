function ajaxGetServerStatus(){
	alert(222);
	$.ajax({
		url: '/nodeStatus',
		dataType: 'json',
		cache: false,
		timeout: 5000,
		success: function(data){
			alert(data.server);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('error ' + textStatus + " " + errorThrown);
		}
	});

	alert(111);
}