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

	$('.farm_delete').on('click', function() {
		var delete_name = $(this).val();
		var polyid, name;
		$.get('/agroapi/polygon/readAll', { }, function(list) {
			for (var i = 0; i < list.polygon_list.length; i++) {
				polyid = list.polygon_list[i].id;
				name = list.polygon_list[i].name

				if (delete_name === name)
					i == list.polygon_list.length
			}

			$.get('/agroapi/polygon/delete', { polyid: polyid }, function(result) {
				window.location.href = "/deleteFarmRecord/"+name;
			});
		});
	})

	$('#create_farm_form').on('submit', function(e) {
		e.preventDefault();

		var form_data = $('#create_farm_form').serializeJSON()

		form_data.coordinates = [];

		form_data.coordinates.push(preparePolygonCoordinates($('[name="coordinates"]').serializeArray()));

		$.post('/readFarmDetails', form_data, function(farm_record) {
			if (farm_record.farm_list.length == 0) {

				$.post('/agroapi/polygon/create', form_data, function(result) {
					// Create db record of farm
					console.log(result);
		        	if (result.success) {
		        		$.post('/createFarmRecord', form_data, function(db_record) {
		        			if (db_record.success) {
		        				window.location.href = "/farms";
		        			}
		        			// Show error message
		        			else {
		        				console.log('db error:');
		        				console.log(db_record);
		        			}
		        		});
		        	}
		        	// Something went wrong with API create error message
		        	else {
		        		console.log('api err:');
		        		console.log(result);
		        	}
		        });
			}
			// Create error message that farm name already exists
			else {

			}

		});
	});


})