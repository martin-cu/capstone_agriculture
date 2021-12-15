const employeeModel = require('../models/employeeModel');
const farmModel = require('../models/farmModel');
const dataformatter = require('../public/js/dataformatter.js');
const materialModel = require('../models/materialModel.js');
const workOrderModel = require('../models/workOrderModel.js');
const cropCalendarModel = require('../models/cropCalendarModel.js');
const pestdiseaseModel = require('../models/pestdiseaseModel.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
var request = require('request');

//var key = '1d1823be63c5827788f9c450fb70c595'; // Unpaid
var key = '2ae628c919fc214a28144f699e998c0f'; // Paid API Key

var temp_lat = 13.073091;
var temp_lon = 121.388563;

exports.ajaxGetFarmList = function(req, res) {
	let where = req.query.where;
	farmModel.getFarmData({ where: where, group: 'farm_id'}, function(err, farms) {
		if (err)
			throw err;
		else {
			res.send(farms);
		}
	});
}

exports.getDashboard = function(req, res) {
	var html_data = {};
	html_data["title"] = "Dashboard";
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'dashboard');

	res.render('home', html_data);
}

exports.getFarms = function(req, res) {
	farmModel.getAllFarms(function(err, farm_list) {
		if (err)
			throw err;
		else {
			var html_data = { farm_list: farm_list };
			html_data = js.init_session(html_data, 'role', 'name', 'username', 'farms');
			res.render('farms', html_data);
		}
	});
}

// ADD FARMS PAGE (TO BE UPDATED)
exports.getAddFarm = function(req, res) {
	var html_data = {};
	html_data["title"] = "Farm Monitoring";
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'add_farm');
	res.render('add_farm', html_data);
}

//AJAX
exports.getFarmDetails = function(req, res) {
	var html_data = {};
	var query = req.query;
	var center = req.query.center;
	var coordinates = req.query.coordinates;
	var farm_id = req.query.farm_id;

	farmModel.filteredFarmDetails({farm_id : req.query.farm_id}, function(err, details) {
		if (err)
			throw err;
		else {
			html_data["details"] = details;
			//console.log(details);
		}

		materialModel.getFarmMaterialsSpecific({farm_id : farm_id}, {item_type : "Seed"}, function(err, seeds){
			if(err)
				throw err;
			else{
				if(seeds == null){
	
				}
				else{
					var ctr = seeds.length;
					if(seeds == null)
						ctr = 0;
					while(ctr < 5){
						seeds.push({});
						ctr++;
					}
					html_data["seed"] = seeds;
				}
	
				materialModel.getFarmMaterialsSpecific({farm_id : farm_id}, {item_type : "Fertilizer"}, function(err, fertilizers){
					if(err)
						throw err;
					else{
						if(fertilizers == null){
	
						}
						else{
							var ctr = fertilizers.length;
							if(fertilizers == null)
								ctr = 0;
							while(ctr < 5){
								fertilizers.push({});
								ctr++;
							}
							html_data["fertilizer"] = fertilizers;
						}
						materialModel.getFarmMaterialsSpecific({farm_id : farm_id}, {item_type : "Pesticide"}, function(err, pesticides){
							if(err)
								throw err;
							else{
								if(pesticides == null){
	
								}
								else{
									var ctr = pesticides.length;
									if(pesticides == null)
										ctr = 0;
									while(ctr < 5){
										pesticides.push({});
										ctr++;
									}
									html_data["pesticide"] = pesticides;
								}
								
								//console.log(req.query.center);
								//console.log("CENTER");
								var center = req.query.center;
								if(center == null){
									var lat = 13.073091;
									var lon = 121.388563;
								}
								else{
									var lat = center[1];
									var lon = center[0];
								}
								
								new Date(Date.now());

								var d1 = new Date(Date.now());
								var d2 = new Date(Date.now());
								d2.setDate(d2.getDate() - 2);
								d1.setDate(d1.getDate() - 1);

								var start_date = dataformatter.dateToUnix(d2);
								var end_date = dataformatter.dateToUnix(d1);
								
								var x = new Date();
								var url = 'http://api.agromonitoring.com/agro/1.0/weather/history?lat='+lat+'&lon='+lon+'&start='+start_date+'&end='+end_date+'&appid='+key;

								request(url, { json: true }, function(err, response, body) {
									if (err)
										throw err;
									else {
										// console.log(body);
										for (var i = 0; i < body.length; i++) {
											body[i].dt = dataformatter.unixtoDate(body[i].dt);
										}
										
										//***** Call Agro API for succeeding 5 day forecast
										var forecast_url = 'https://api.agromonitoring.com/agro/1.0/weather/forecast?lat='+lat+'&lon='+lon+'&appid='+key;
										request(forecast_url, { json: true }, function(err, response, forecast_body) {
											if (err)
												throw err;
											else {
												forecast_body.dt = dataformatter.unixtoDate(forecast_body.dt);
			
												var hour_arr = [];
												for (var i = 0; i < forecast_body.length; i++) {
													forecast_body[i].dt = dataformatter.unixtoDate((forecast_body[i].dt));
													hour_arr.push(dataformatter.formatDate(forecast_body[i].dt, 'HH:m'))
												}
												// console.log(forecast_body);
												
												//***** Get unique hour timestamps from forecast and filter data
												hour_arr = [...new Map(hour_arr.map(item =>
													[item, item])).values()];
							
												body = dataformatter.smoothHourlyData(body, hour_arr);
												forecast_body = dataformatter.smoothHourlyData(forecast_body, hour_arr);
							
												//***** Build on Agro API and use ANN to forecast remaining 9 days
												var result = analyzer.weatherForecast14D(dataformatter.prepareData(body, 1), dataformatter.prepareData(forecast_body, 1), hour_arr.length+1);
												var keys = ['min_temp', 'max_temp', 'humidity', 'pressure', 'rainfall', 'id'];
												
												result.forecast = dataformatter.convertForecastWeather(dataformatter.arrayToObject(result.forecast, keys));
							
												forecast = dataformatter.mapAndFormatForecastResult(result, hour_arr);
												
												// console.log(forecast[0]);
												var daily_ctr = 0;
												var dmin_temp = 0, dmax_temp = 0, dhumidity = 0, dpressure = 0, drainfall = 0;
												for(var i = 0; i < forecast.length; i++){
													// console.log(forecast[i]);
			
													var ctr = 0;
													var min_temp = 0, max_temp = 0, humidity = 0, pressure = 0, rainfall = 0;
													for(var y = 0;y < forecast[i].data.length; y++){
														if(!isNaN(forecast[i].data[y].min_temp)){
															min_temp = min_temp + forecast[i].data[y].min_temp;
															max_temp = max_temp + forecast[i].data[y].max_temp;
															humidity = humidity + forecast[i].data[y].humidity;
															pressure = pressure + forecast[i].data[y].pressure;
															rainfall = rainfall + forecast[i].data[y].rainfall;
				
															ctr++;
														}
														
													}
													if(ctr != 0){
														min_temp = min_temp / ctr;
														max_temp = max_temp / ctr;
														humidity = humidity / ctr;
														pressure = pressure / ctr;
														rainfall = rainfall / ctr;
													}
													
			
													dmin_temp = dmin_temp + min_temp;
													dmax_temp = dmax_temp + max_temp;
													dhumidity = dhumidity + humidity;
													dpressure = dpressure + pressure;
													drainfall = drainfall + rainfall;
			
													daily_ctr++;
												}
			
												var weather = {
													min_temp : ((dmin_temp / daily_ctr) - 32) / 1.8,
													max_temp : ((dmax_temp / daily_ctr) - 32) / 1.8,
													humidity : dhumidity / daily_ctr,
													precipitation : drainfall / daily_ctr
												}
												
												// console.log(weather);
			
			
												var season = {
													season_temp : 35,
													season_humidity : 65
												}
			
												var stage = {
													stage_name : "Reproductive"
												}
			
												pestdiseaseModel.getPDProbabilityPercentage(weather, season, null, stage,function(err, possible_pests){
													if(err){
														throw err;
													}else{
														var statements = new Array();
														for(i = 0; i < possible_pests.length; i++){
															stmt = possible_pests[i].pest_name + " - May occur due to ";
															if(possible_pests[i].weather_id != null)
																stmt = stmt + possible_pests[i].weather + " weather, ";
															if(possible_pests[i].season_id != null)
																stmt = stmt + possible_pests[i].season_name + " season ";
															if(possible_pests[i].stage_id != null)
																stmt = stmt + possible_pests[i].t_stage_name + " stage ";
															statements.push({ statement : stmt});
														}
			
														for(x =0; x < possible_pests.length; x++){
															if(x >= 3)
																possible_pests.pop(x);
														}
														//console.log(possible_pests);
													}
													farmModel.getFarmerQueries(farm_id, null, function(err, queries){
														if(err)
															throw err;
														else{
															
														}


														//ADD CROP CYCLE DETAILS (WORK ORDERS)
														var calendar_id = req.query.calendar_id;

														// console.log(calendar_id);
														var crop_calendar_query = { status: ['In-Progress', 'Active','Completed'] , where : {key : "calendar_id", val : calendar_id}}
														console.log("---------------------");
														cropCalendarModel.getCropCalendars(crop_calendar_query, function(err, crop_calendar_details){
															if(err)
																throw err;
															else{
																if(calendar_id != null){
																	var expected_harvest = crop_calendar_details[0].sowing_date;
																	crop_calendar_details[0].land_prep_date = dataformatter.formatDate(dataformatter.formatDate(new Date(crop_calendar_details[0].land_prep_date)), 'mm DD, YYYY');
																	var calendar_details = crop_calendar_details[0];
																	calendar_details["expected_harvest"] = new Date(expected_harvest);
																	calendar_details.expected_harvest.setDate(calendar_details.expected_harvest.getDate() +  crop_calendar_details[0].maturity_days);
																	calendar_details.expected_harvest = dataformatter.formatDate(dataformatter.formatDate(new Date(calendar_details.expected_harvest)), 'mm DD, YYYY')
																	html_data["crop_calendar_details"] = calendar_details;
																}
																

															}
															console.log(crop_calendar_details);
															var land_prep = crop_calendar_details[0].land_prep_date;
															var sowing = crop_calendar_details[0].sowing_date;
															var ripening = new Date(expected_harvest);
															ripening.setDate(ripening.getDate() + crop_calendar_details[0].maturity_days - 30);
															var reproductive = new Date(ripening);
															reproductive.setDate(reproductive.getDate() - 35);
															var vegetation = crop_calendar_details[0].sow_date_completed;
															var harvest = calendar_details.expected_harvest;
															console.log(land_prep);
															console.log(sowing);
															console.log(harvest);
															console.log(reproductive);
															console.log(vegetation);
															var wo_query = {
																where: {
																	key: ['crop_calendar_id'],
																	value: [calendar_id]
																},
																order: ['work_order_table.date_start ASC']
															};
															workOrderModel.getWorkOrders(wo_query, function(err, workorders){
																if(err)
																	 throw err;
																else{
																	var current = true;
																	for(i = 0; i < workorders.length; i++){
																		if(workorders[i].date_completed == null && current){
																			current = false;
																			workorders[i]["current"] = "current_wo";
																			console.log("THISSSSSSS");
																			console.log(workorders[i]);
																		}

																		if(workorders[i].type == "Land Preparation" || (workorders[i].date_start > land_prep && workorders[i].date_start < sowing))
																			workorders[i]["stage"] = "Land Preparation";
																		else if(workorders[i].type == "Sow Seed" || (workorders[i].date_start > sowing && workorders[i].date_start < vegetation))
																			workorders[i]["stage"] = "Sowing";
																		else if(workorders[i].type == "Harvest" || workorders[i].date_start > harvest)
																			workorders[i]["stage"] = "Harvest";
																		else if(workorders[i].date_start > vegetation && workorders[i].date_start < reproductive)
																			workorders[i]["stage"] = "Vegetation";
																		else if(workorders[i].date_start > reproductive && workorders[i].date_start < ripening)
																			workorders[i]["stage"] = "Reproductive";
																		else if(workorders[i].date_start > vegetation && workorders[i].date_start < reproductive)
																			workorders[i]["stage"] = "Ripening";

																		dataformatter.formatDate(dataformatter.unixtoDate(workorders[i].date_completed), 'mm DD, YYYY');
																		if(workorders[i].date_completed == null)
																			workorders[i].date_completed = "Not yet completed";
																		else
																			workorders[i].date_completed = dataformatter.formatDate(dataformatter.formatDate(new Date(workorders[i].date_completed)), 'mm DD, YYYY');
																		workorders[i].date_start = dataformatter.formatDate(dataformatter.formatDate(new Date(workorders[i].date_start)), 'mm DD, YYYY');
																		workorders[i].date_due = dataformatter.formatDate(dataformatter.formatDate(new Date(workorders[i].date_due)), 'mm DD, YYYY');
																		workorders[i].date_created = dataformatter.formatDate(dataformatter.formatDate(new Date(workorders[i].date_created)), 'mm DD, YYYY');
																	}
																}
																// console.log("WORKORDERS");
																console.log(workorders);
																
																html_data["workorders"] = workorders;
																html_data["queries"] = queries;
																html_data["statements"] = statements;
																html_data["probability"] = possible_pests;
																html_data["main"] = forecast_body[0].main;
																res.send(html_data);
															});
														});
													});
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
}

exports.getMonitorFarms = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'monitor_farms');
	res.render('farm_monitoring', html_data);
}

exports.assignFarmers = function(req, res) {
	var query = req.body.query;

	farmModel.addAssignedFarmers(query, function(err, result) {
		if (err)
			throw err;
		else {
			console.log(result);
			res.send({ success: true });
		}
	});
}

exports.retireFarm = function(req, res) {
	var update = {
		status: 'Inactive'
	};
	var filter = {
		farm_name: req.params.id
	};
	farmModel.updateFarm(update, filter, function(err, result) {
		if (err)
			throw err;
		else {
			res.redirect('/farms');
		}
	});
}

// exports.getCropCalendar = function(req, res) {
// 	var html_data = {};
// 	html_data = js.init_session(html_data, 'role', 'name', 'username', 'crop_calendar');
// 	res.render('crop_calendar', html_data); //crop_calendar
// }

// exports.getAddCropCalendar = function(req, res) {
// 	var html_data = {};
// 	html_data["title"] = "Crop Calendar";
// 	html_data = js.init_session(html_data, 'role', 'name', 'username', 'add_crop_calendar');
// 	res.render('add_crop_calendar', html_data); //crop_calendar_test
// }

// exports.getAddCropCalendar2 = function(req, res) { //delete later
// 	var html_data = {};
// 	html_data = js.init_session(html_data, 'role', 'name', 'username', 'crop_calendar');
// 	res.render('crop_calendar_test', html_data); //crop_calendar_test
// }

exports.getHarvestCycle = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'harvest_cycle');
	res.render('harvest_cycle', html_data);
}

exports.getGeoMap = function(req, res) {
	farmModel.getFarmData(null, function(err, farm_data) {
		if (err) {
			throw err;
		}
		else {
			farmModel.getPlotData(null, function(err, plot_data) {
				if (err) {
					throw err;
				}
				else {
					employeeModel.queryEmployee('allEmployees', null, function(err, employee_data) {
						if (err) {
							throw err;
						}
						else {
							var html_data = { farm_data: dataformatter.aggregateFarmData(farm_data, plot_data, employee_data)};
							//console.log(html_data);
							res.render('home', {});
						}
					})
				}
			})
		}
	});
}

exports.singleFarmDetails = function(req, res) {
	var query = { where: { key: 'farm_name', value: req.body.farm_name } };

	farmModel.getFarmData(query, function(err, result) {
		if (err)
			throw err;
		else {
			//console.log(result);
			res.send({ farm_list: result });
		}
	});
}

exports.createFarmRecord = function(req, res) {
	var query = {
		farm_name: req.body.farm_name,
		farm_desc: req.body.farm_desc == '' ? req.body.farm_desc : null,
		farm_area: req.body.polygon_area,
		land_type: req.body.land_type,
	};

	farmModel.addFarm(query, function(err, result) {
		if (err)
			throw err;
		else {
			var status = false;
			if (result.affectedRows)
				status = true;

			res.send({ success: status, farm_id: result.insertId });
		}
	});
}

//Environment Variable Queries

//**** NDVI and Satellite Imagery ****//
exports.getHistoricalNDVI = function(req, res) {
	var polygon_id = req.query.polyid;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var obj;

	var data = {
		polygon_id: polygon_id,
		start: start_date,
		end: end_date
	};

	var options = {
		url: 'https://api.agromonitoring.com/agro/1.0/ndvi/history?polyid='+polygon_id+'&start='+start_date+'&end='+end_date+'&appid='+key,
		method: 'GET',
		headers: {
			'Content-type':'application/json'
		},
		body: JSON.stringify(data)
	};

	request(options, function(err, response, body) {
		if (err)
			throw err;
		else {
			obj = body;
			
			var ndvi_data = analyzer.analyzeHistoricalNDVI(JSON.parse(body));

			//console.log(ndvi_data.stats);

			res.render('home', {});
		}
	})
}

exports.getSatelliteImageryData = function(req, res) {
	var polygon_id = req.query.polygon_id;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var obj;

	var data = {
		polygon_id: polygon_id,
		start: start_date,
		end: end_date,
		clouds_max: 1
	};
	var options = {
		url: 'https://api.agromonitoring.com/agro/1.0/image/search?polyid='+polygon_id+'&start='+start_date+'&end='+end_date+'&appid='+key+'&clouds_max='+60,
		method: 'GET',
		headers: {
			'Content-type':'application/json'
		},
		body: JSON.stringify(data)
	};
	request(options, function(err, response, body) {
		if (err)
			throw err;
		else {

			body = JSON.parse(body);

			for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.formatDate(dataformatter.unixtoDate(body[i].dt), 'mm DD, YYYY');
        	}
			//var result = body[body.length-1];
			//result.dt = dataformatter.unixtoDate(result.dt);
			//console.log(body);
			res.send(body);
		}
	})
}

//**** Soil Data ****//
exports.getCurrentSoilData = function(req, res){
	var polygon_id = req.query.polyid;
	var url = 'http://api.agromonitoring.com/agro/1.0/soil?polyid='+polygon_id+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
			body.dt = dataformatter.unixtoDate(body.dt);
			body.moisture *= 100;
			body = dataformatter.kelvinToCelsius(body, 'Soil');

        	res.send(body);
        }
    });
}

//!!!!! havent tested yet because of this is a premium feature !!!!!//
exports.getHistoricalSoilData = function(req, res){
	var polygon_id = req.query.polyid;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var url = 'http://api.agromonitoring.com/agro/1.0/soil/history?start='+start_date+'&end='+end_date+'&polyid='+polygon_id+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	res.render('home', {});
        }
    });
}


//!!!!! havent tested yet because of this is a premium feature !!!!!//
//**** Temperature and Precipitation ****//
exports.getAccumulatedTemperature = function(req, res){
	var polygon_id = req.query.polyid;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var lat = req.query.lat, lon = req.query.lon, threshold = req.query.threshold;

	lat = temp_lat;
	lon = temp_lon;

	var url = 'http://api.agromonitoring.com/agro/1.0/weather/history?accumulated_temperature?lat='+lat+'&lon='+lon+'&threshold='+threshold+'&start='+start_date+'&end='+end_date+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	res.render('home', {});
        }
    });
}

exports.getAccumulatedPrecipitation = function(req, res){
	var polygon_id = req.query.polyid;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var lat = req.query.lat, lon = req.query.lon, threshold = req.query.threshold;

	lat = temp_lat;
	lon = temp_lon;

	var url = 'http://api.agromonitoring.com/agro/1.0/weather/history?accumulated_precipitation?lat='+lat+'&lon='+lon+'&threshold='+threshold+'&start='+start_date+'&end='+end_date+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	res.render('home', {});
        }
    });
}

//**** Ultra Violet Index ****//
exports.getCurrentUVI = function(req, res){
	var polygon_id = req.query.polyid;
	var url = 'http://api.agromonitoring.com/agro/1.0/uvi?polyid='+polygon_id+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
			body.dt = dataformatter.unixtoDate(body.dt);


        	res.render('home', {});
        }
    });
}

exports.getHistoricalUVI = function(req, res){
	var polygon_id = req.query.polyid;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var url = 'http://api.agromonitoring.com/agro/1.0/uvi/history?polyid='+polygon_id+'&appid='+key+'&start='+start_date+'&end='+end_date;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	res.render('home', {});
        }
    });
}

//**** Weather API ****//
exports.getCurrentWeather = function(req, res){
	var polygon_id = req.query.polyid;
	var lat = req.query.lat, lon = req.query.lon;
	
	lat = temp_lat;
	lon = temp_lon;

	var url = 'https://api.agromonitoring.com/agro/1.0/weather?lat='+lat+'&lon='+lon+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	body.dt = dataformatter.unixtoDate(body.dt);
        	body = dataformatter.kelvinToCelsius(body, 'Weather');

        	res.send(body);
        }
    });
}

exports.getHistoricalWeather = function(req, res){
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var lat = req.query.lat, lon = req.query.lon;
	
	lat = temp_lat;
	lon = temp_lon;

	var url = 'http://api.agromonitoring.com/agro/1.0/weather/history?lat='+lat+'&lon='+lon+'&start='+start_date+'&end='+end_date+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	res.send({ result: body, success: true });
        }
    });
    //res.send({});
}

// 
exports.getForecastWeather = function(req, res) {
	var start_date = dataformatter.dateToUnix(req.query.start), 
	end_date = dataformatter.dateToUnix(req.query.end);
	
	var lat = req.query.lat, lon = req.query.lon;
	lat = temp_lat;
	lon = temp_lon;


	var url = 'http://api.agromonitoring.com/agro/1.0/weather/history?lat='+lat+'&lon='+lon+'&start='+start_date+'&end='+end_date+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	//***** Call Agro API for succeeding 5 day forecast

        	var forecast_url = 'https://api.agromonitoring.com/agro/1.0/weather/forecast?lat='+lat+'&lon='+lon+'&appid='+key;
        	// console.log(forecast_url);
		    request(forecast_url, { json: true }, function(err, forecast_response, forecast_body) {
		        if (err)
		        	throw err;
		        else {
		        	var hour_arr = [];
					//console.log(forecast_body);
		        	for (var i = 0; i < forecast_body.length; i++) {
		        		forecast_body[i].dt = dataformatter.unixtoDate((forecast_body[i].dt));
		        		hour_arr.push(dataformatter.formatDate(forecast_body[i].dt, 'HH:m'))
		        	}
		        	
		        	//***** Get unique hour timestamps from forecast and filter data
		        	hour_arr = [...new Map(hour_arr.map(item =>
	  					[item, item])).values()];

		        	body = dataformatter.smoothHourlyData(body, hour_arr);
		        	forecast_body = dataformatter.smoothHourlyData(forecast_body, hour_arr);

		        	//console.log(forecast_body);
		        	//***** Build on Agro API and use ANN to forecast remaining 9 days
		        	var result = analyzer.weatherForecast14D
		        	(dataformatter.prepareData(body, 1), dataformatter.prepareData(forecast_body, 1), hour_arr.length+1);
		        	var keys = ['min_temp', 'max_temp', 'humidity', 'pressure', 'rainfall', 'id'];
		        	
		        	result.forecast = 
		        	dataformatter.convertForecastWeather(dataformatter.arrayToObject(result.forecast, keys));

		        	forecast = dataformatter.mapAndFormatForecastResult(result, hour_arr);

		        	res.send({ forecast: forecast });
		        }
		    });
        }
    });
}

//Polygon Queries
exports.createPolygon = function(req, res) {
	var data = ({
		name: req.body.farm_name,
		geo_json: {
			type:"Feature",
			properties:{},
			geometry:{
				type:"Polygon",
				coordinates: typeof req.body.coordinates == 'undefined' || req.body.coordinates == null ? 0 : 
				dataformatter.coordinateToFloat(req.body.coordinates)// dataformatter.parseCoordinate(req.body.coordinates.split(',')) 
			}}
		});

	var options = {
		url: 'http://api.agromonitoring.com/agro/1.0/polygons?appid='+key,
		method: 'POST',
		headers: {
			'Content-type':'application/json'
		},
		body: JSON.stringify(data)
	}

	request(options, function(err, response, body) {
		if (err)
			throw err;
		else {
			body = JSON.parse(body);
			var success = true;

			if (body.name == 'UnprocessableEntityError') {
				success = false;
			}

			res.send(success);
		}
	})
}

exports.getPolygonInfo = function(req, res){
	var polygon_id = req.query.polyid;
	var url = 'http://api.agromonitoring.com/agro/1.0/polygons/'+polygon_id+'?appid='+key;
    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	console.log(body);

        	res.render('home', {});
        }
    });
}

exports.getAllPolygons = function(req, res){
	var url = 'http://api.agromonitoring.com/agro/1.0/polygons?appid='+key;
    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	//console.log(body);

        	res.send(body);
        }
    });
}

exports.updatePolygonName = function(req, res){
	var polygon_id = req.query.polyid;

	var data = {
		geo_json: {
			something: "something",
		},
		name: req.query.name
	};

	var options = {
		url: 'http://api.agromonitoring.com/agro/1.0/polygons/'+polygon_id+'?appid='+key,
		method: 'PUT',
		headers: {
			'Content-type':'application/json'
		},
		body: JSON.stringify(data)
	}

    request(options, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	console.log(body);

        	res.render('home', {});
        }
    });
}

exports.removePolygon = function(req, res){
	var polygon_id = req.query.polyid;
	
	var options = {
		url: 'http://api.agromonitoring.com/agro/1.0/polygons/'+polygon_id+'?appid='+key,
		method: 'DELETE',
		followRedirect: false,
		followAllRedirects: false
	}

    request(options, function(err, response, body) {
        if (err)
        	throw err;
        else {

        	res.send({ success: true });
        }
    });

}