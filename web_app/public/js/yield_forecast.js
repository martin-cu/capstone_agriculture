$(document).ready(function() {
	jQuery.ajaxSetup({async: false });

	if (view == 'add_crop_calendar') {
		var farm_name;
		var chosen_seed;
		var training_set = [];
		var testing_set = [];
		$('.next_step').on('click', function() {
			if (currentTab == 1) {
				farm_name = $('#farm_id option:selected').text();
				chosen_seed = $('#seed_id option:selected').val();
				//console.log(chosen_seed);
				$.get('/agroapi/polygon/readAll', {}, function(polygons) {
					var selected = polygons.filter(e => e.name == farm_name)[0];
					console.log(selected);
					$.get('/get_calendar_variables', { farm_name: selected.name }, function(cal_item) {
						console.log(cal_item);
						if (cal_item.result != null || cal_item.result != undefined) {
							cal_item = cal_item.result;

							$.get('/get_forecast_records', { calendar_id: cal_item.map(({ calendar_id }) => calendar_id) }, function(forecast_records) {
								delete forecast_records.forecast;

								for (var o = 0; o < forecast_records.length; o++) {
									training_set.push(Object.values(forecast_records[o]));
								}
								console.log(training_set);
								testing_set = training_set.slice();
				
								for (var i = 0; i < testing_set.length/2; i++) {
									testing_set.shift();
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
							});

							// $.get('/get_nutrient_details', { }, function(nutrient_details) {
							// 	//console.log(cal_item.length);
							// 	for (var m = 0; m < cal_item.length; m++) {
							// 		selected = polygons.filter(e => e.name == cal_item[m].farm_name)[0];
							// 		$.get('/forecast_yield_farm', { polyid: selected.id, start: formatDate(new Date(cal_item[m].sowing_date), 'YYYY-MM-DD'), 
							// 			end: formatDate(new Date(cal_item[m].harvest_date), 'YYYY-MM-DD') }, function(env_variables) {
							// 			//console.log(cal_item[m]);
							// 			var details = nutrient_details.filter(e => e.calendar_id == cal_item[m].calendar_id);
							// 			console.log(details);
							// 			env_variables.avg_humidity = Math.round(env_variables.avg_humidity * 100) / 100;
							// 			env_variables.avg_pressure = Math.round(env_variables.avg_pressure * 100) / 100;
							// 			env_variables.avg_rainfall = Math.round(env_variables.avg_rainfall * 100) / 100;
							// 			env_variables.avg_temp = Math.round(env_variables.avg_temp * 100) / 100;
							// 			env_variables['seed_id'] = cal_item[m].seed_planted;
							// 			env_variables['harvest_yield'] = cal_item[m].harvest_yield;
							// 			env_variables['deficient_N'] = details[0].deficient_N;
							// 			env_variables['deficient_P'] = details[0].deficient_P;
							// 			env_variables['deficient_K'] = details[0].deficient_K;
							// 			env_variables['seed_rate'] = cal_item[m].seed_rate;
							// 			console.log(env_variables);
							// 			training_set.push(Object.values(env_variables));
							// 			if (m == cal_item.length-1) {
							// 				testing_set = training_set.slice();
				
							// 				for (var i = 0; i < testing_set.length/2; i++) {
							// 					testing_set.shift();
							// 				}
							// 				testing_set[testing_set.length-1][4] = chosen_seed;
							// 				$.ajax({
							// 					url: '/create_yield_forecast',
							// 					type: 'GET',
							// 					data: { training: training_set, testing: testing_set },
							// 					contentType: "application/json; charset=utf-8",
							// 					dataType: "json",
							// 					success: function(forecast) {
							// 						console.log(forecast);
							// 						var forecasted_yield = forecast[0][5];
							// 						$('#seed_expected_yield').val(Math.round(forecasted_yield));
							// 					},
							// 					error: function(err) {
							// 						console.log('Oops something went wrong!');
							// 						$('#seed_expected_yield').val('Insufficient data cannot make forecast!!');
							// 					}
							// 				})
							// 			}					
							// 		});
							// 	}
							// });				
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
			console.log(training_set);
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
		});
	}
	else if (view == 'farm_monitoring' || view == 'farm_monitoring_test') {
		console.log('!');
		var selected_farm;
		var curr_calendar;

		curr_calendar = parseInt($("#crop_calendar_list").val());
			console.log('Calendar: '+curr_calendar);

		$.get('/get_forecast_records', { calendar_id: [curr_calendar] }, function(forecast_records) {
			console.log(forecast_records);

			if (forecast_records.length != 0) {
				$('#forecast_yield').html((Math.round(forecast_records[0].forecast))+' sacks/ha');
			}
		});

		//On active farm change
		$('#monitor_farm_list').on('click', '.farm_li', function() {
			//Initialize selected farm and active calendar
			//selected_farm = $($('#monitor_farm_list').children()[0]).html();
			//curr_calendar = $("#crop_calendar_list").val();
			selected_farm = $(this).html();
			curr_calendar = null;
			curr_calendar = $("#crop_calendar_list").val();
			console.log('Calendar: '+curr_calendar);

			$.get('/get_forecast_records', { calendar_id: [curr_calendar] }, function(forecast_records) {
				console.log(forecast_records);

				if (forecast_records.length != 0) {
					$('#forecast_yield').html((Math.round(forecast_records[0].forecast))+' sacks/ha');
				}
			});

			// $.get('/agroapi/polygon/readAll', {}, function(polygons) {
			// 	var selected = polygons.filter(e => e.name == farm_name)[0];

			// 	$.get('/get_calendar_variables', { farm_name: selected_farm }, function(cal_item) {
			// 		//console.log(cal_item);
			// 		if (cal_item.result != null || cal_item.result != undefined) {
			// 			if (curr_calendar == null) {
			// 				curr_calendar = cal_item.current_calendar == null || 
			// 				cal_item.current_calendar == undefined ? null : cal_item.current_calendar;
			// 			}
						
			// 			cal_item = cal_item.result;
		
			// 			var training_set = [];
			// 			$.get('/get_nutrient_details', { }, function(nutrient_details) {
			// 				//console.log(cal_item.length);
			// 				for (var m = 0; m < cal_item.length; m++) {
			// 					selected = polygons.filter(e => e.name == cal_item[m].farm_name)[0];
			// 					$.get('/forecast_yield_farm', { polyid: selected.id, start: formatDate(new Date(cal_item[m].sowing_date), 'YYYY-MM-DD'), 
			// 						end: formatDate(new Date(cal_item[m].harvest_date), 'YYYY-MM-DD') }, function(env_variables) {

			// 						var details = nutrient_details.filter(e => e.calendar_id == cal_item[m].calendar_id);

			// 						env_variables['seed_id'] = cal_item[m].seed_planted;
			// 						env_variables['harvest_yield'] = cal_item[m].harvest_yield;
			// 						env_variables['deficient_N'] = details[0].deficient_N;
			// 						env_variables['deficient_P'] = details[0].deficient_P;
			// 						env_variables['deficient_K'] = details[0].deficient_K;
			// 						env_variables['seed_rate'] = cal_item[m].seed_rate;
		
			// 						training_set.push(Object.values(env_variables));
			// 						if (m == cal_item.length-1) {
			// 							var testing_set = training_set.slice();
			
			// 							for (var i = 0; i < testing_set.length/2; i++) {
			// 								//testing_set.shift();
			// 							}

			// 							if (curr_calendar != null) {
			// 								//Get applied resources and current env avgs
			// 								var selected_polygon = polygons.filter(e => e.name == selected_farm)[0];
			// 								var start_date = new Date(curr_calendar.sowing_date), end_date = new Date(curr_calendar.harvest_date);
			// 								start_date = start_date > new Date() ? new Date() : start_date;
			// 								end_date = end_date > new Date() ? new Date() : end_date;
			// 								$.get('/forecast_yield_farm', { polyid: selected_polygon.id, start: formatDate(start_date, 'YYYY-MM-DD'), 
			// 								end: formatDate(end_date, 'YYYY-MM-DD') }, function(current_variables) {
			// 									//console.log(testing_set[testing_set.length-1]);

			// 									$.get('/get_nutrient_details', { specific: { calendar_id: curr_calendar.calendar_id } }, function(curr_nutrient_details) {
			// 										current_variables['seed_id'] = curr_calendar.seed_id;
			// 										current_variables['harvest_yield'] = testing_set[testing_set.length-1][5];
			// 										current_variables['deficient_N'] = curr_nutrient_details[0].deficient_N;
			// 										current_variables['deficient_P'] = curr_nutrient_details[0].deficient_P;
			// 										current_variables['deficient_K'] = curr_nutrient_details[0].deficient_K;

			// 										testing_set[testing_set.length-1] = Object.values(current_variables);
			// 									});
			// 								});
			// 							}

			// 							$.ajax({
			// 								url: '/create_yield_forecast',
			// 								type: 'GET',
			// 								data: { training: training_set, testing: testing_set },
			// 								contentType: "application/json; charset=utf-8",
			// 								dataType: "json",
			// 								success: function(forecast) {
			// 									console.log(forecast);
			// 									var forecasted_yield = forecast[0][5];
			// 									$('#forecast_yield').html(Math.round(forecasted_yield)+' sacks/ha');
			// 								},
			// 								error: function(err) {
			// 									console.log('Oops something went wrong!');
			// 									$('#forecast_yield').val('Insufficient data cannot make forecast!!');
			// 								}
			// 							})
			// 						}					
			// 					});
			// 				}
			// 			});				
			// 		}
			// 		else {
			// 			console.log('Insufficient historical data to make forecast');
			// 			$('#forecast_yield').val('Insufficient historical data to make forecast');
			// 		}

			// 	});

			// });
		});
	
		//On active calendar change
		$('#detailed_cont').on('change', '#crop_calendar_list', function() {
			curr_calendar = null;
			curr_calendar = $("#crop_calendar_list").val();
			console.log('Calendar: '+curr_calendar);

			$.get('/get_forecast_records', { calendar_id: [curr_calendar] }, function(forecast_records) {
				console.log(forecast_records);

				if (forecast_records.length != 0) {
					$('#forecast_yield').html((Math.round(forecast_records[0].forecast))+' sacks/ha');
				}
			});

			// $.get('/agroapi/polygon/readAll', {}, function(polygons) {
			// 	var selected = polygons.filter(e => e.name == farm_name)[0];

			// 	$.get('/get_calendar_variables', { farm_name: selected_farm }, function(cal_item) {
			// 		//console.log(cal_item);
			// 		if (cal_item.result != null || cal_item.result != undefined) {
			// 			if (curr_calendar == null) {
			// 				curr_calendar = cal_item.current_calendar == null || 
			// 				cal_item.current_calendar == undefined ? null : cal_item.current_calendar;
			// 			}
						
			// 			cal_item = cal_item.result;
		
			// 			var training_set = [];
			// 			$.get('/get_nutrient_details', { }, function(nutrient_details) {
			// 				//console.log(cal_item.length);
			// 				for (var m = 0; m < cal_item.length; m++) {
			// 					selected = polygons.filter(e => e.name == cal_item[m].farm_name)[0];
			// 					$.get('/forecast_yield_farm', { polyid: selected.id, start: formatDate(new Date(cal_item[m].sowing_date), 'YYYY-MM-DD'), 
			// 						end: formatDate(new Date(cal_item[m].harvest_date), 'YYYY-MM-DD') }, function(env_variables) {

			// 						var details = nutrient_details.filter(e => e.calendar_id == cal_item[m].calendar_id);

			// 						env_variables['seed_id'] = cal_item[m].seed_planted;
			// 						env_variables['harvest_yield'] = cal_item[m].harvest_yield;
			// 						env_variables['deficient_N'] = details[0].deficient_N;
			// 						env_variables['deficient_P'] = details[0].deficient_P;
			// 						env_variables['deficient_K'] = details[0].deficient_K;
			// 						env_variables['seed_rate'] = cal_item[m].seed_rate;
		
			// 						training_set.push(Object.values(env_variables));
			// 						if (m == cal_item.length-1) {
			// 							var testing_set = training_set.slice();
			
			// 							for (var i = 0; i < testing_set.length/2; i++) {
			// 								//testing_set.shift();
			// 							}

			// 							if (curr_calendar != null) {
			// 								//Get applied resources and current env avgs
			// 								var selected_polygon = polygons.filter(e => e.name == selected_farm)[0];
			// 								var start_date = new Date(curr_calendar.sowing_date), end_date = new Date(curr_calendar.harvest_date);
			// 								start_date = start_date > new Date() ? new Date() : start_date;
			// 								end_date = end_date > new Date() ? new Date() : end_date;
			// 								$.get('/forecast_yield_farm', { polyid: selected_polygon.id, start: formatDate(start_date, 'YYYY-MM-DD'), 
			// 								end: formatDate(end_date, 'YYYY-MM-DD') }, function(current_variables) {
			// 									//console.log(testing_set[testing_set.length-1]);

			// 									$.get('/get_nutrient_details', { specific: { calendar_id: curr_calendar.calendar_id } }, function(curr_nutrient_details) {
			// 										current_variables['seed_id'] = curr_calendar.seed_id;
			// 										current_variables['harvest_yield'] = testing_set[testing_set.length-1][5];
			// 										current_variables['deficient_N'] = curr_nutrient_details[0].deficient_N;
			// 										current_variables['deficient_P'] = curr_nutrient_details[0].deficient_P;
			// 										current_variables['deficient_K'] = curr_nutrient_details[0].deficient_K;
			// 										current_variables['seed_rate'] = curr_nutrient_details[0].deficient_K;

			// 										testing_set[testing_set.length-1] = Object.values(current_variables);
			// 									});
			// 								});
			// 							}

			// 							$.ajax({
			// 								url: '/create_yield_forecast',
			// 								type: 'GET',
			// 								data: { training: training_set, testing: testing_set },
			// 								contentType: "application/json; charset=utf-8",
			// 								dataType: "json",
			// 								success: function(forecast) {
			// 									console.log(forecast);
			// 									var forecasted_yield = forecast[0][5];
			// 									$('#forecast_yield').html(Math.round(forecasted_yield)+' sacks/ha');
			// 								},
			// 								error: function(err) {
			// 									console.log('Oops something went wrong!');
			// 									$('#forecast_yield').val('Insufficient data cannot make forecast!!');
			// 								}
			// 							})
			// 						}					
			// 					});
			// 				}
			// 			});				
			// 		}
			// 		else {
			// 			console.log('Insufficient historical data to make forecast');
			// 			$('#forecast_yield').val('Insufficient historical data to make forecast');
			// 		}

			// 	});

			// });
		});
	}

});