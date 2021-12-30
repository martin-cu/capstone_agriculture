$(document).ready(function() {
	jQuery.ajaxSetup({async: false });

	if (view == 'add_crop_calendar') {
		var farm_name;
		var chosen_seed;
		$('.next_step').on('click', function() {
			if (currentTab == 1) {
				farm_name = $('#farm_id option:selected').text();
				chosen_seed = $('#seed_id option:selected').val();
				$.get('/agroapi/polygon/readAll', {}, function(polygons) {
					var selected = polygons.filter(e => e.name == farm_name)[0];

					$.get('/get_calendar_variables', { farm_name: farm_name }, function(cal_item) {
						console.log(cal_item);
						if (cal_item.result != null || cal_item.result != undefined) {

							var training_set = [];
							$.get('/get_nutrient_details', { farm_id: cal_item[0].farm_id }, function(nutrient_details) {
								for (var m = 0; m < cal_item.length; m++) {

									$.get('/forecast_yield_farm', { polyid: selected.id, start: formatDate(new Date(cal_item[m].sowing_date), 'YYYY-MM-DD'), 
										end: formatDate(new Date(cal_item[m].harvest_date), 'YYYY-MM-DD') }, function(env_variables) {
										//console.log(cal_item[m]);
										var details = nutrient_details.filter(e => e.calendar_id == cal_item[m].calendar_id);

										env_variables['seed_id'] = cal_item[m].seed_planted;
										env_variables['harvest_yield'] = cal_item[m].harvest_yield;
										env_variables['deficient_N'] = details[0].deficient_N;
										env_variables['deficient_P'] = details[0].deficient_P;
										env_variables['deficient_K'] = details[0].deficient_K;
			
										training_set.push(Object.values(env_variables));
										if (m == cal_item.length-1) {
											var testing_set = training_set.slice();
				
											for (var i = 0; i < testing_set.length/2; i++) {
												//testing_set.shift();
											}
											testing_set[testing_set.length-1][4] = chosen_seed;
											$.ajax({
												url: '/create_yield_forecast',
												type: 'GET',
												data: { training: training_set, testing: testing_set },
												contentType: "application/json; charset=utf-8",
												dataType: "json",
												success: function(forecast) {
													console.log(forecast);
													var forecasted_yield = forecast[0][5];
													$('#seed_expected_yield').val(Math.round(forecasted_yield));
												},
												error: function(err) {
													console.log('Oops something went wrong!');
													$('#seed_expected_yield').val('Insufficient data cannot make forecast!!');
												}
											})
										}					
									});
								}
							});				
						}
						else {
							console.log('Insufficient historical data to make forecast');
							$('#seed_expected_yield').val('Insufficient historical data to make forecast');
						}

					});

				});
			}
		});

		$('#farm_id').on('change', function() {
			farm_name = $('#farm_id option:selected').text();
		});

		$('#seed_id').on('change', function() {
			chosen_seed = $('#seed_id option:selected').val();
			$.get('/agroapi/polygon/readAll', {}, function(polygons) {
				var selected = polygons.filter(e => e.name == farm_name)[0];

				$.get('/get_calendar_variables', { farm_name: farm_name }, function(cal_item) {
					console.log(cal_item);
					if (cal_item.result != null || cal_item.result != undefined) {

						var training_set = [];
						$.get('/get_nutrient_details', { farm_id: cal_item[0].farm_id }, function(nutrient_details) {
							for (var m = 0; m < cal_item.length; m++) {

								$.get('/forecast_yield_farm', { polyid: selected.id, start: formatDate(new Date(cal_item[m].sowing_date), 'YYYY-MM-DD'), 
									end: formatDate(new Date(cal_item[m].harvest_date), 'YYYY-MM-DD') }, function(env_variables) {
									//console.log(cal_item[m]);
									var details = nutrient_details.filter(e => e.calendar_id == cal_item[m].calendar_id);

									env_variables['seed_id'] = cal_item[m].seed_planted;
									env_variables['harvest_yield'] = cal_item[m].harvest_yield;
									env_variables['deficient_N'] = details[0].deficient_N;
									env_variables['deficient_P'] = details[0].deficient_P;
									env_variables['deficient_K'] = details[0].deficient_K;
		
									training_set.push(Object.values(env_variables));
									if (m == cal_item.length-1) {
										var testing_set = training_set.slice();
			
										for (var i = 0; i < testing_set.length/2; i++) {
											//testing_set.shift();
										}
										testing_set[testing_set.length-1][4] = chosen_seed;
										// $.get('/create_yield_forecast', { training: training_set, testing: testing_set }, function(forecast) {
										// 	console.log(forecast);
										// 	var forecasted_yield = forecast[0][5];
										// 	$('#seed_expected_yield').val(Math.round(forecasted_yield));
										// });

										$.ajax({
											url: '/create_yield_forecast',
											type: 'GET',
										  data: { training: training_set, testing: testing_set },
										  contentType: "application/json; charset=utf-8",
    										dataType: "json",
										  success: function(forecast) {
										  		console.log(forecast);
											var forecasted_yield = forecast[0][5];
											$('#seed_expected_yield').val(Math.round(forecasted_yield));
										  },
										  error: function(err) {
										  	console.log('Oops something went wrong!');
											$('#seed_expected_yield').val('Insufficient historical data to make forecast');
										  }
										})
									}					
								});
							}
						});				
					}
					else {
						console.log('Insufficient historical data to make forecast');
						$('#seed_expected_yield').val('Insufficient historical data to make forecast');
					}
				});

			});
		});
	}

});