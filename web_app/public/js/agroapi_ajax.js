

$(document).ready(function() {
	$('#forecast_check').on('click', function() {
		$.get('/agroapi/weather/forecast', {}, function(result) {
			for (var i = 0; i < result.msg.forecast.length; i++) {
				console.log(result.msg.forecast[i]);
			}
		});
	});
})