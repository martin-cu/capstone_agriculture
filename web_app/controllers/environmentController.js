const dataformatter = require('../public/js/dataformatter.js');
const similarity = require('../public/js/similarity.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
const weatherForecastModel = require('../models/weatherForecastModel.js');
const farmModel = require('../models/farmModel.js');
const nutrientModel = require('../models/nutrientModel.js');
const cropCalendarModel = require('../models/cropCalendarModel.js');
const materialModel = require('../models/materialModel.js');
const pestdiseaseModel = require('../models/pestdiseaseModel.js');
var request = require('request');
var solver = require('javascript-lp-solver');


var key = '2ae628c919fc214a28144f699e998c0f';

//var key = '1d1823be63c5827788f9c450fb70c595'; 

exports.getPestDiseaseManagement = function(req, res) {
	var html_data = {};
	console.log(similarity.similarity("test","this is a Test"));
	console.log(similarity.levenshtein("test","test0"));
	pestdiseaseModel.getAllPests(function(err,pests){
		if(err){
			throw err;
		}
		else{
			pestdiseaseModel.getAllDiseases(function(err,diseases){
				if(err){
					throw err;
				}
				else{
					pestdiseaseModel.getAllSymptoms(function(err, symptoms){
						if(err){
							throw err;
						}
						else{
							console.log(symptoms.length);
							if(symptoms.length == 0){
								console.log("sdkljahdsf");
							}
							else{
								
								var lat = 13.073091;
								var lon = 121.388563;
								new Date(Date.now());

								var d1 = new Date(Date.now());
								var d2 = new Date(Date.now());
								d2.setDate(d2.getDate() - 2);
								d1.setDate(d1.getDate() - 1);

								var start_date = dataformatter.dateToUnix(d2);
								var end_date = dataformatter.dateToUnix(d1);
								
								var x = new Date();
								console.log(x);
							
							
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
													console.log(forecast[i]);

													var ctr = 0;
													var min_temp = 0, max_temp = 0, humidity = 0, pressure = 0, rainfall = 0;
													for(var y = 0;y < forecast[i].data.length; y++){
														min_temp = min_temp + forecast[i].data[y].min_temp;
														max_temp = max_temp + forecast[i].data[y].max_temp;
														humidity = humidity + forecast[i].data[y].humidity;
														pressure = pressure + forecast[i].data[y].pressure;
														rainfall = rainfall + forecast[i].data[y].rainfall;

														ctr++;
													}
													min_temp = min_temp / ctr;
													max_temp = max_temp / ctr;
													humidity = humidity / ctr;
													pressure = pressure / ctr;
													rainfall = rainfall / ctr;

													dmin_temp = dmin_temp + min_temp;
													dmax_temp = dmax_temp + max_temp;
													dhumidity = dhumidity + humidity;
													dpressure = dpressure + pressure;
													drainfall = drainfall + rainfall;

													daily_ctr++;
												}

												var weather = {
													min_temp : ((dmin_temp / ctr) - 32) / 1.8,
													max_temp : ((dmax_temp / ctr) - 32) / 1.8,
													humidity : dhumidity / ctr,
													precipitation : drainfall / ctr
												}
												
												console.log(weather);


												var season = {
													season_temp : 35,
													season_humidity : 65
												}

												var stage = {
													stage_name : "Reproductive"
												}


												pestdiseaseModel.getPestPossibilities(weather, season, null, stage,function(err, possible_pests){
													if(err){
														console.log(err);
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
														console.log("--------------------------------");
														console.log(statements);
														
														request("http://api.agromonitoring.com/agro/1.0/image/search?start=1500336000&end=1508976000&polyid=61765325a81b7645c5687533&appid=f7ba528791357b8aad084ea3fcb33b03", { json: true }, function(err, response, body2) {
															
															console.log(body2[0].image.truecolor);
															
														});

														weather = {
															min_temp : 29,
															max_temp : 29,
															humidity : 70,
															precipitation : 30
														}

														pestdiseaseModel.getDiseaseProbability(weather, season, null, stage, function(err, probability){
															console.log(probability);
														});

														// html_data["img"] = body2[0].image.truecolor;
														html_data["statements"] = statements;
														html_data["pos_pests"] = possible_pests;
														html_data["weather"] = weather;
														html_data["main"] = forecast_body[0].main;
														html_data["pests"] = pests;
														html_data["diseases"] = diseases;
														html_data["symptoms"] = symptoms;
														html_data = js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease');
														res.render('pest_disease', html_data);
														
													}
												});
											}
										});
									}
								});
							}
						}
					});
					
				}
			});
		}
	});
}


exports.getProbability = function(req, res){
	var html_data = {};
	var lat = 13.073091;
	var lon = 121.388563;
	new Date(Date.now());

	var d1 = new Date(Date.now());
	var d2 = new Date(Date.now());
	d2.setDate(d2.getDate() - 2);
	d1.setDate(d1.getDate() - 1);

	var start_date = dataformatter.dateToUnix(d2);
	var end_date = dataformatter.dateToUnix(d1);
	
	var x = new Date();
	console.log(x);


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
							min_temp = min_temp + forecast[i].data[y].min_temp;
							max_temp = max_temp + forecast[i].data[y].max_temp;
							humidity = humidity + forecast[i].data[y].humidity;
							pressure = pressure + forecast[i].data[y].pressure;
							rainfall = rainfall + forecast[i].data[y].rainfall;

							ctr++;
						}
						min_temp = min_temp / ctr;
						max_temp = max_temp / ctr;
						humidity = humidity / ctr;
						pressure = pressure / ctr;
						rainfall = rainfall / ctr;

						dmin_temp = dmin_temp + min_temp;
						dmax_temp = dmax_temp + max_temp;
						dhumidity = dhumidity + humidity;
						dpressure = dpressure + pressure;
						drainfall = drainfall + rainfall;

						daily_ctr++;
					}

					var weather = {
						min_temp : ((dmin_temp / ctr) - 32) / 1.8,
						max_temp : ((dmax_temp / ctr) - 32) / 1.8,
						humidity : dhumidity / ctr,
						precipitation : drainfall / ctr
					}
					
					console.log(weather);


					var season = {
						season_temp : 35,
						season_humidity : 65
					}

					var stage = {
						stage_name : "Reproductive"
					}


					pestdiseaseModel.getPestPossibilities(weather, season, null, stage,function(err, possible_pests){
						if(err){
							console.log(err);
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
							console.log("--------------------------------");

							weather = {
								min_temp : 29,
								max_temp : 29,
								humidity : 70,
								precipitation : 30
							}

							pestdiseaseModel.getPestProbabilityPercentage(weather, season, null, stage, function(err, probability){
								html_data["possible_pest"] = probability;
								res.render('pest_disease3', html_data);
							});
						}
					});
				}
			});
		}
	});
}

exports.getPestFactors = function(req,res){
	var html_data = {};

	var type = req.params.type;
	var id = req.params.name;

	if(type == "Pest"){
		pestdiseaseModel.getPestFactors(id, function(err, factors){
			if(err){
				throw err;
			}
			else{
				pestdiseaseModel.getPestDetails({pest_id : id}, function(err, details){
					if(err){
						throw err;
					}
					else{
						if(details.length == 0){
	
						}
						else{
							pestdiseaseModel.getPestSymptoms(id, function(err, symptoms){
								if(err){
									throw err;
								}
								else{
									if(details.length == 0){
				
									}
									else{
										console.log(details[0].pest_name);
										console.log(factors);
										html_data['pest_name'] =  details[0].pest_name;
										html_data["symptoms"] = symptoms;
										html_data["factors"] = factors;
										js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease');
										res.render('pest_disease2', html_data);
									}
								}
							});
						}
					}
				});
			}
		});
	}
	else{
		pestdiseaseModel.getDiseaseFactors(id, function(err, factors){
			if(err){
				throw err;
			}
			else{
				pestdiseaseModel.getDiseaseDetails({disease_id : id}, function(err, details){
					if(err){
						throw err;
					}
					else{
						if(details.length == 0){
	
						}
						else{
							console.log(details[0].disease_name);
							console.log(factors);
							html_data['pest_name'] =  details[0].disease_name;
							html_data["factors"] = factors;
							js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease');
							res.render('pest_disease2', html_data);
						}
					}
				});
			}
		});
	}
	
}

exports.addPest = function(req,res){
	var pest_data = {
		pest_name: req.body.pest_name,
		pest_desc : req.body.pest_desc
	};

	var new_symptom = {
		symptom_name : req.body.symptom_name,
		symptom_desc : req.body.symptom_desc
	}
	console.log(req.body);
	var pest_name = req.body.pest_name;
	var symptoms = req.body.symptom;
	symptoms.shift();

	//check if already exists
	pestdiseaseModel.getAllPests(function(err, pests){
		if(err){
			throw err;
		}
		else{
			if(pests.length == 0){

			}
			else{
				var possible_match;
				var highest_match = 0;
				for(var i = 0; i < pests.length; i++){
					if(similarity.similarity(pest_name.toLowerCase(),pests[i].pest_name.toLowerCase()) && similarity.levenshtein(pest_name.toLowerCase(),pests[i].pest_name.toLowerCase()) > 0.5){
						console.log(similarity.levenshtein(pest_name.toLowerCase(),pests[i].pest_name.toLowerCase()));
						console.log("already exists");
					}
					else if(similarity.similarity(pest_name.toLowerCase(),pests[i].pest_name.toLowerCase()) && similarity.levenshtein(pest_name.toLowerCase(),pests[i].pest_name.toLowerCase()) > 0.15 || similarity.levenshtein(pest_name.toLowerCase(),pests[i].pest_name.toLowerCase()) > 0.5){
						console.log(similarity.levenshtein(pest_name.toLowerCase(),pests[i].pest_name.toLowerCase()));
						//Ask user for similarity
						if(similarity.levenshtein(pest_name.toLowerCase(),pests[i].pest_name.toLowerCase()) > highest_match){
							highest_match = similarity.levenshtein(pest_name.toLowerCase(),pests[i].pest_name.toLowerCase());
							possible_match = i;
						}
					}
				}
				if(possible_match != null){
					//asks if same
					console.log("Is it " + pests[possible_match].pest_name + "?");
				}
				else{
					pestdiseaseModel.addPest(pest_data, function(err, result){
					});
					pestdiseaseModel.getLastInserted("Pest", function(err, last){
						var last = last[0].last;
						//Add symptoms to pest
						for(var i = 0; i < symptoms.length; i ++){
							pestdiseaseModel.addPestDiseaseSymptom("Pest", last, symptoms[i], function(err, next){});
						}
						//Add new symptom
						pestdiseaseModel.addSymptom(new_symptom, function(err, success){
						});
						pestdiseaseModel.getLast(function(err, last_insert){
							var last_insert = last_insert[0].last;
							pestdiseaseModel.addPestDiseaseSymptom("Pest", last, last_insert, function(err, next){});
						});
					});
					
					
				}
			}
		}
	});
	res.render('pest_disease');
}


exports.addDisease = function(req,res){
	var disease_data = {
		disease_name : req.body.disease_name,
		disease_desc : req.body.disease_desc
	};

	var new_symptom = {
		symptom_name : req.body.symptom_name,
		symptom_desc : req.body.symptom_desc
	}

	console.log(req.body);
	var disease_name = req.body.disease_name;
	var symptoms = req.body.symptom;
	symptoms.shift();
	//check if already exists
	pestdiseaseModel.getAllDiseases(function(err, diseases){
		if(err){
			throw err;
		}
		else{
			if(diseases.length == 0){

			}
			else{
				var possible_match;
				var highest_match = 0;
				for(var i = 0; i < diseases.length; i++){
					if(similarity.similarity(disease_name.toLowerCase(),diseases[i].disease_name.toLowerCase()) && similarity.levenshtein(disease_name.toLowerCase(),diseases[i].disease_name.toLowerCase()) > 0.75){
						console.log(similarity.levenshtein(disease_name.toLowerCase(),diseases[i].disease_name.toLowerCase()));
						console.log("already exists");
						break;
					}
					else if(similarity.similarity(disease_name.toLowerCase(),diseases[i].disease_name.toLowerCase()) && similarity.levenshtein(disease_name.toLowerCase(),diseases[i].disease_name.toLowerCase()) > 0.15 || similarity.levenshtein(disease_name.toLowerCase(),diseases[i].disease_name.toLowerCase()) > 0.5){
						console.log(similarity.levenshtein(disease_name.toLowerCase(),diseases[i].disease_name.toLowerCase()));
						//Ask user for similarity
						if(similarity.levenshtein(disease_name.toLowerCase(),diseases[i].disease_name.toLowerCase()) > highest_match){
							highest_match = similarity.levenshtein(disease_name.toLowerCase(),diseases[i].disease_name.toLowerCase());
							possible_match = i;
						}
					}
				}
				if(possible_match != null){
					//asks if same
					console.log("Is it " + diseases[possible_match].disease_name + "?");
				}
				else{
					pestdiseaseModel.addDisease(disease_data, function(err, result){
					});
					pestdiseaseModel.getLastInserted("Disease", function(err, last){
						var last = last[0].last;
						//Add symptoms
						for(var i = 0; i < symptoms.length; i++){
							console.log("added symptom");
							pestdiseaseModel.addPestDiseaseSymptom("Disease", last, symptoms[i], function(err, next){});
						}
						//Add new symptom
						pestdiseaseModel.addSymptom(new_symptom, function(err, success){
						});
						pestdiseaseModel.getLast(function(err, last_insert){
							var last_insert = last_insert[0].last;
							pestdiseaseModel.addPestDiseaseSymptom("Disease", last, last_insert, function(err, next){});
						});
					});
				}
			}
		}
	});
	res.render('pest_disease');
}

//********** Nutrient Management Start *************//

exports.getNurientManagement = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'nutrient_mgt_discover');
	res.render('nutrient_mgt', html_data);
}

exports.addSoilRecord = function(req, res) {
	var query = { 
		farm_id: req.body.farm_id,
		pH_lvl: req.body.ph_test, 
		p_lvl: req.body.p_lvl,
		k_lvl: req.body.k_lvl,
		n_lvl: req.body.n_lvl,
		date_taken: req.body.date_taken
	 };
	 var farm_query = {
	 	where: { key: 'ft.farm_id', value: req.body.farm_id },
	 	group: 'farm_id'
	 };

	farmModel.getFarmData(farm_query, function(err, farm) {
		if (err)
			throw err;
		else {
			nutrientModel.addSoilRecord(query, function(err, record) {
				if (err)
					throw err;
				else {
					let redirect = '/nutrient_management/'+farm[0].farm_name;
					res.send(redirect);
				}
			});		
		}
	});
}

function recommendFertilizerPlan(obj, materials) {
	var model;
	var multiplier = 1.3;
	var constraints = {
		N: { min: obj.n_lvl, max: obj.n_lvl * multiplier },
		P: { min: obj.p_lvl, max: obj.p_lvl * multiplier },
		K: { min: obj.k_lvl, max: obj.k_lvl * multiplier },
	};
	var variables = {};
	for (var i = 0; i < materials.length; i++) {
		variables[materials[i].fertilizer_name] = {
			N: materials[i].N,
			P: materials[i].P,
			K: materials[i].K,
			price: materials[i].price
		};
	}

	model = {
		optimize: '',
		opType: 'min',
		constraints,
		variables
	};

	obj['recommendation'] = solver.Solve(model);

	for (var prop in obj.recommendation) {
		if (parseFloat(obj.recommendation[prop])) {
			obj.recommendation[prop] = Math.round(obj.recommendation[prop] * 100) / 100;
			obj.recommendation[prop] = obj.recommendation[prop] < 0 ? 0 : obj.recommendation[prop];
		}
	}

	return obj;
}

exports.ajaxGetDetailedNutrientMgt = function(req, res) {
	var query = { farm_name: req.query.farm_name };

	var html_data = {};
	nutrientModel.getSoilRecord(query, function(err, result) {
		if (err)
			throw err;
		else {
			materialModel.getMaterials(req.query.type, req.query.filter, function(err, materials) {
		        if (err)
		            throw err;
		        else {
		        	var type;
		        	var farm_id;
		        	materialModel.readResourcesUsed(req.query.type, req.query.filter, function(err, applied) {
		        		if (err)
		        			throw err;
		        		else {
		        			cropCalendarModel.getCurrentCropCalendar(query, function(err, crop_calendar) {
		        				if (err)
		        					throw err;
		        				else {
		        					result = dataformatter.processNPKValues(result, result.farm_area, applied)
						            result = recommendFertilizerPlan(result, materials);
						            result['calendar_id'] = crop_calendar[0].calendar_id;
									res.send(result);
		        				}
		        			});     	
		        		}
		        	});
		        }
		    });
		}
	});
}



exports.detailedNutrientManagement = function(req, res) {
	var query = { farm_name: req.params.farm_name };

	var html_data = {};
	nutrientModel.getSoilRecord(query, function(err, result) {
		if (err)
			throw err;
		else {
			materialModel.readResourcesUsed('Fertilizer', result[0].farm_id, function(err, applied) {
        		if (err)
        			throw err;
        		else {
        			html_data = js.init_session(html_data, 'role', 'name', 'username', 'nutrient_mgt_diagnose');
					html_data['detailed_data'] = dataformatter.processNPKValues(result, result.farm_area, applied);

					res.render('nutrient_mgt_detailed', html_data);
        		}
        	});
		}
	});
}

//********** Nutrient Management End *************//

exports.uploadForecastResult = function(req, res) {
	var query = req.body.data;

	weatherForecastModel.saveForecastResults(query, function(err, result) {
		if (err)
			throw err;
		else {
			res.send(result);
		}
	});
}

exports.getWeatherForecast = function(req, res) {
	weatherForecastModel.readWeatherForecast(function(err, result) {
		if (err)
			throw err;
		else {
			res.send(result);
		}
	});
}

exports.clearWeatherForecastRecords = function(req, res) {
	weatherForecastModel.clearRecords(function(err, result) {
		if (err)
			throw err;
		else {
			res.send(result);
		}
	});
}

//USED FUNCTIONS -----------------------------------------------------------

exports.getFarmResources = function(req, res){
	var html_data = {};

	var farm_id = 1;
	var type = "Seed";


	materialModel.getFarmMaterialsSpecific({farm_id : farm_id}, {item_type : "Seed"}, function(err, seeds){
		if(err)
			throw err;
		else{
			if(seeds.length == 0){

			}
			else{
				//Adds blank rows
				var ctr = seeds.length;
				if(seeds == null)
					ctr = 5;
				while(ctr < 5){
					seeds.push({blank : true});
					ctr++;
				};
				// console.log(seeds);
				html_data["seed"] = seeds;
			}

			materialModel.getPurchasesPerFarm(null, {farm_id : farm_id}, {status : "Pending"}, function(err, pending){
				if(err)
					throw err;
				else{
					html_data["pending"] = pending;
				}

				materialModel.getPurchasesPerFarm(null, {farm_id : farm_id}, {status : "Processing"}, function(err, processing){
					if(err)
						throw err;
					else{
						html_data["processing"] = processing;
					}
					html_data = js.init_session(html_data, 'role', 'name', 'username', 'farms');
					materialModel.getPurchasesPerFarm(type, {farm_id : farm_id}, null, function(err, orders){
						if(err)
							throw err;
						else{
							var ctr2 = orders.length;
							if(orders == null)
								ctr2 = 5;
							while(ctr2 < 5){
								orders.push({blank : true});
								ctr2++;
							};
							console.log(orders);
							html_data["orders"] = orders;
						}
						res.render("farm_resources", html_data);
					});
				});
			});
		}
	});
}

exports.ajaxGetResources = function(req,res){
	var html_data = {};
	var farm_id = req.query.farm_id;
	var type = req.query.type;

	console.log(farm_id);
	console.log(type);
	var blanks = [];
	materialModel.getFarmMaterialsSpecific({farm_id : farm_id}, {item_type : type}, function(err, materials){
		if(err)
			throw err;
		else{
			if(materials.length == 0){

			}
			else{
				//Adds blank rows
				var ctr = materials.length;
				if(materials == null)
					ctr = 5;
				while(ctr < 5){
					blanks.push({});
					ctr++;
				};
				html_data["items"] = materials;
				html_data["blanks"] = blanks;

				
			}
			res.send(html_data);
		}
	});
	
}


exports.getFarmPestDiseases = function(req, res){
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'monitor_farms');
	
	var farm_id = {
		farm_id : 1
	}
	var lat = 13.073091;
	var lon = 121.388563;
	new Date(Date.now());

	var d1 = new Date(Date.now());
	var d2 = new Date(Date.now());
	d2.setDate(d2.getDate() - 2);
	d1.setDate(d1.getDate() - 1);

	var start_date = dataformatter.dateToUnix(d2);
	var end_date = dataformatter.dateToUnix(d1);
	
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
					
					
					var daily_ctr = 0;
					var dmin_temp = 0, dmax_temp = 0, dhumidity = 0, dpressure = 0, drainfall = 0;
					//Gets average weather for next 14 days
					for(var i = 0; i < forecast.length; i++){
						var ctr = 0;
						var min_temp = 0, max_temp = 0, humidity = 0, pressure = 0, rainfall = 0;
						for(var y = 0;y < forecast[i].data.length; y++){
							min_temp = min_temp + forecast[i].data[y].min_temp;
							max_temp = max_temp + forecast[i].data[y].max_temp;
							humidity = humidity + forecast[i].data[y].humidity;
							pressure = pressure + forecast[i].data[y].pressure;
							rainfall = rainfall + forecast[i].data[y].rainfall;

							ctr++;
						}
						min_temp = min_temp / ctr;
						max_temp = max_temp / ctr;
						humidity = humidity / ctr;
						pressure = pressure / ctr;
						rainfall = rainfall / ctr;

						dmin_temp = dmin_temp + min_temp;
						dmax_temp = dmax_temp + max_temp;
						dhumidity = dhumidity + humidity;
						dpressure = dpressure + pressure;
						drainfall = drainfall + rainfall;

						daily_ctr++;
					}

					var weather = {
						min_temp : ((dmin_temp / ctr) - 32) / 1.8,
						max_temp : ((dmax_temp / ctr) - 32) / 1.8,
						humidity : dhumidity / ctr,
						precipitation : drainfall / ctr
					}
					


					var season = {
						season_temp : 35,
						season_humidity : 65
					}

					var stage = {
						stage_name : "Reproductive"
					}

					var fertilizer = null;

					pestdiseaseModel.getPestProbabilityPercentage(weather, season, fertilizer, stage,function(err, possible_pests){
						if(err){
							console.log(err);
							throw err;
						}else{
							console.log(possible_pests);
							var statements = new Array();

							var ctr = possible_pests.length;
							while(ctr != 5){
								possible_pests.push({});
								ctr++;
							};
							// for(i = 0; i < possible_pests.length; i++){
							// 	stmt = possible_pests[i].pest_name + " - May occur due to ";
							// 	if(possible_pests[i].weather_id != null)
							// 		stmt = stmt + possible_pests[i].weather + " weather, ";
							// 	if(possible_pests[i].season_id != null)
							// 		stmt = stmt + possible_pests[i].season_name + " season ";
							// 	if(possible_pests[i].stage_id != null)
							// 		stmt = stmt + possible_pests[i].t_stage_name + " stage ";
							// 	statements.push({ statement : stmt});
							// }

							// pestdiseaseModel.getDiseaseProbability(weather, season, null, stage, function(err, probability){
							// 	console.log(probability);
							// });

							// html_data["img"] = body2[0].image.truecolor;


							pestdiseaseModel.getDiagnosis(farm_id, null, function(err, diagnosis){
								if(err)
									throw err;
								else{
									html_data["diagnosis"] = diagnosis;
									html_data["statements"] = statements;
									html_data["probability"] = possible_pests;
									html_data["weather"] = weather;
									html_data["main"] = forecast_body[0].main;
									res.render("farm_pestdisease", html_data);
								}
							});
						}
					});
				}
			});
		}
	});
	
}

exports.ajaxGetFarmPestDiseaseProbability = function(req, res){
	var html_data = {};
	var farm_id = req.query.farm_id;
	var type = req.query.type;

	var lat = 13.073091;
	var lon = 121.388563;
	new Date(Date.now());

	var d1 = new Date(Date.now());
	var d2 = new Date(Date.now());
	d2.setDate(d2.getDate() - 2);
	d1.setDate(d1.getDate() - 1);

	var start_date = dataformatter.dateToUnix(d2);
	var end_date = dataformatter.dateToUnix(d1);
	
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
					
					
					var daily_ctr = 0;
					var dmin_temp = 0, dmax_temp = 0, dhumidity = 0, dpressure = 0, drainfall = 0;
					//Gets average weather for next 14 days
					for(var i = 0; i < forecast.length; i++){
						var ctr = 0;
						var min_temp = 0, max_temp = 0, humidity = 0, pressure = 0, rainfall = 0;
						for(var y = 0;y < forecast[i].data.length; y++){
							min_temp = min_temp + forecast[i].data[y].min_temp;
							max_temp = max_temp + forecast[i].data[y].max_temp;
							humidity = humidity + forecast[i].data[y].humidity;
							pressure = pressure + forecast[i].data[y].pressure;
							rainfall = rainfall + forecast[i].data[y].rainfall;

							ctr++;
						}
						min_temp = min_temp / ctr;
						max_temp = max_temp / ctr;
						humidity = humidity / ctr;
						pressure = pressure / ctr;
						rainfall = rainfall / ctr;

						dmin_temp = dmin_temp + min_temp;
						dmax_temp = dmax_temp + max_temp;
						dhumidity = dhumidity + humidity;
						dpressure = dpressure + pressure;
						drainfall = drainfall + rainfall;

						daily_ctr++;
					}

					var weather = {
						min_temp : ((dmin_temp / ctr) - 32) / 1.8,
						max_temp : ((dmax_temp / ctr) - 32) / 1.8,
						humidity : dhumidity / ctr,
						precipitation : drainfall / ctr
					}
					


					var season = {
						season_temp : 35,
						season_humidity : 65
					}

					var stage = {
						stage_name : "Reproductive"
					}

					var fertilizer = null;
					
					if(type == "Pest"){
						pestdiseaseModel.getPestProbabilityPercentage(weather, season, fertilizer, stage,function(err, possible_pests){
							if(err){
								console.log(err);
								throw err;
							}else{
								console.log(possible_pests);
								var statements = new Array();
	
								var ctr = possible_pests.length;
								while(ctr != 5){
									possible_pests.push({});
									ctr++;
								};
						
							}
							html_data["probability"] = possible_pests;
							res.send(html_data);
						});
					}
					else if(type == "Disease"){
						pestdiseaseModel.getDiseaseProbabilityPercentage(weather, season, fertilizer, stage,function(err, possible_pests){
							if(err){
								console.log(err);
								throw err;
							}else{
								console.log(possible_pests);
								var statements = new Array();
	
								var ctr = possible_pests.length;
								while(ctr != 5){
									possible_pests.push({});
									ctr++;
								};
							}
							html_data["probability"] = possible_pests;
							res.send(html_data);
						});
					}
				}
			});
		}
	});
}

exports.getPestDiseaseDetails = function(req, res){
	var html_data = {};
	var type = req.query.type;
	var id = req.query.id;


	if(type == "Pest"){
		pestdiseaseModel.getPestFactors(id, function(err, factors){
			if(err){
				throw err;
			}
			else{
				pestdiseaseModel.getPestDetails({pest_id : id}, function(err, details){
					if(err){
						throw err;
					}
					else{
						if(details.length == 0){
	
						}
						else{
							pestdiseaseModel.getPestSymptoms(id, function(err, symptoms){
								if(err){
									throw err;
								}
								else{
									if(details.length == 0){
				
									}
									else{
										// console.log(details);
										// console.log(details[0].pest_name);
										html_data['pd'] =  details[0];
										html_data["symptoms"] = symptoms;
										html_data['type'] = "Pest";
										// html_data["factors"] = factors;
										js.init_session(html_data, 'role', 'name', 'username', 'monitor_farms');
										res.render('pest_disease_details', html_data);
									}
								}
							});
						}
					}
				});
			}
		});
	}
	else{
		pestdiseaseModel.getDiseaseSymptoms(id, function(err, symptoms){
			if(err){
				throw err;
			}
			else{
				pestdiseaseModel.getDiseaseDetails({disease_id : id}, function(err, details){
					if(err){
						throw err;
					}
					else{
						if(details.length == 0){
	
						}
						else{
							console.log(details[0]);
							html_data['pd'] =  details[0];
							html_data['type'] = "Disease";
							html_data["symptoms"] = symptoms;
							js.init_session(html_data, 'role', 'name', 'username', 'monitor_farms');
							res.render('pest_disease_details', html_data);
						}
					}
				});
			}
		});
	}
}


exports.updatePDDetails = function(req,res){
	var html_data = {};
	var type = req.params.type;
	var pd_id = req.params.id;
	var detail_type = req.params.detail_type;
	console.log(type);
	pestdiseaseModel.getPDDetails(type, pd_id, detail_type, function(err, result){
		console.log(result);
		res.send(result);
	});
}

// Pest and Disease Diagnosis Part (Temporary)
exports.getDiagnoses = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease_diagnoses');
	res.render('pest_and_disease_diagnoses', html_data);
}

exports.getAddDiagnosis = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease_add_diagnosis');
	res.render('add_diagnosis', html_data);
}

exports.getAddPest = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease_add_pest');
	res.render('add_pest', html_data);
}

exports.getAddDisease = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease_add_disease');
	res.render('add_disease', html_data);
}

exports.getDetailedDiagnosis = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease_detailed_diagnosis');
	res.render('detailed_diagnosis', html_data);
}

exports.getDetailedPest = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease_detailed_pest');
	res.render('detailed_pest', html_data);
}

exports.getDetailedDisease = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease_detailed_disease');
	res.render('detailed_disease', html_data);
}


