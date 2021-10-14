function preparePolygonCoordinates(data) {
	var temp_arr = [];
	var result_arr = [];
	var nested_arr = [];
	for (var i = 0; i < data.length-1; i++) {
		temp_arr.push(parseFloat(data[i].value));
		temp_arr.push(parseFloat(data[i+1].value));
		i++;

		result_arr.push(temp_arr);
		temp_arr = [];
	}

	temp_arr.push(parseFloat(data[0].value));
	temp_arr.push(parseFloat(data[1].value));

	result_arr.push(temp_arr);

	return result_arr;
}

$(document).ready(function() {
	$('#forecast_check').on('click', function() {
		$.get('/agroapi/weather/forecast', {}, function(result) {
			for (var i = 0; i < result.msg.forecast.length; i++) {
				console.log(result.msg.forecast[i]);
			}
		});
	});

	$('#create_farm_form').on('submit', function(e) {
		e.preventDefault();

		var form_data = $('#create_farm_form').serializeJSON()

		form_data.coordinates = [];

		form_data.coordinates.push(preparePolygonCoordinates($('[name="coordinates"]').serializeArray()));

		$.post('/readFarmDetails', form_data, function(farm_record) {
			if (farm_record.farm_list.length == 0) {

				$.post('/agroapi/polygon/create', form_data, function(result) {
					// Create db record of farm
		        	if (result.success) {
		        		$.post('/createFarmRecord', form_data, function(db_record) {
		        			if (db_record.success) {
		        				window.location.href = "/farms";
		        			}
		        			// Show error message
		        			else {

		        			}
		        		});
		        	}
		        	// Something went wrong with API create error message
		        	else {

		        	}
		        });
			}
			// Create error message that farm name already exists
			else {

			}

		});
	});
})