const dataformatter = require('../public/js/dataformatter.js');
const reportModel = require('../models/reportModel.js');
const farmModel = require('../models/farmModel.js');
const workOrderModel = require('../models/workOrderModel.js');
const cropCalendarModel = require('../models/cropCalendarModel.js');
const materialModel = require('../models/materialModel.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
var request = require('request');

var key = '2ae628c919fc214a28144f699e998c0f'; // Paid API Key

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

exports.getDetailedReport = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'reports', req.session);

	reportModel.getFarmProductivity(function(err, fp_overview) {
		if (err)
			throw err;
		else {
			fp_overview = fp_overview.filter(e => e.calendar_id == req.query.calendar_id);
			var calendar_arr = fp_overview.map(({ calendar_id }) => calendar_id).concat(fp_overview.map(({ max_prev_calendar }) => max_prev_calendar));
			reportModel.getInputResourcesUsed({ calendar_ids: calendar_arr }, function(err, input_resources) {
				if (err)
					throw err;
				else {
					input_resources = input_resources.filter(e => e.calendar_id == req.query.calendar_id);
					html_data['farm_productivity'] = analyzer.processDetailedFarmProductivity(fp_overview, input_resources);
					console.log('----------------------');
					//console.log(html_data['farm_productivity']);
					//console.log(input_resources);
					html_data["notifs"] = req.notifs;
					res.render('detailed_farm_report', html_data)
				}
			});
		}
	});
}

exports.getFarmProductivityReport = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'reports', req.session);
	reportModel.getFarmProductivity(function(err, fp_overview) {
		if (err)
			throw err;
		else {
			var calendar_arr = fp_overview.map(({ calendar_id }) => calendar_id).concat(fp_overview.map(({ max_prev_calendar }) => max_prev_calendar));
			reportModel.getInputResourcesUsed({ calendar_ids: calendar_arr }, function(err, input_resources) {
				if (err)
					throw err;
				else {
					reportModel.getHarvestReports(function(err, harvest_reports) {
						if (err)
							throw err;
						else {
							//console.log(harvest_reports);
							var years = harvest_reports.map( ({crop_plan}) => crop_plan.replace(/\D/g, "") );
							years = years.filter((x, i, a) => a.indexOf(x) == i)
							var lbl = ['Late', 'Early'];
							var arr;
							
							// for (var y = 0; y < harvest_reports.length; y++) {
							// 	for (var i = 0; i < years.length; i++) {
							// 		for (var x = lbl.length; x > 0; x--) {
							// 			if (`${lbl[x]} ${years[i]}` == harvest_reports[y].crop_plan) {
							// 				console.log(harvest_reports[i].crop_plan);
							// 			}
							// 		}
							// 	}

							// }
							// var filtered;
							// for (var i = 0; i < harvest_reports.length; i++) {
							// 	for (var x = 0; x < years.length; x++) {
							// 		filtered = harvest_reports.filter(e => (e.crop_plan.replace(/\D/g, "")) == years[x]);
							// 		console.log(years[x]);

							// 		filtered.sort((a,b) => a.crop_plan < b.crop_plan);
							// 		console.log(filtered);
							// 	}
							// }

							// harvest_reports.sort((a,b) => a.crop_plan.replace(/\D/g, "") > b.crop_plan.replace(/\D/g, ""));
							// console.log(harvest_reports);

							//console.log(years);
							html_data['harvest_reports'] = harvest_reports;
							html_data['farm_productivity'] = analyzer.smoothFP(analyzer.calculateProductivity(fp_overview, input_resources));

							//console.log(html_data.farm_productivity);
							html_data["notifs"] = req.notifs;
							res.render('farm_productivity_report', html_data);
						}
					});			
				}
			});
		}
	});
}

exports.getSummaryHarvestReport = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'reports', req.session);

	reportModel.getHarvestSummaryChart({ calendar_ids: req.query.id.split(',') }, function(err, chart_data) {
		if (err)
			throw err;
		else {
			
			reportModel.getNutrientRecommendationDetails({ calendar_ids: req.query.id.split(',') }, function(err, nutrient_reco_details) {
				if (err)
					throw err;
				else {
					reportModel.getEarlyHarvestDetails({ calendar_ids: req.query.id.split(',') }, function(err, early_harvest) {
						if (err)
							throw err;
						else {
							reportModel.getHistoricalYieldQuery({ calendar_ids: req.query.id.split(',') }, function(err, query) {
								if (err)
									throw err;
								else {
									reportModel.getHistoricalYield(query, function(err, historical_yield) {
										if (err)
											throw err;
										else {
											reportModel.getFarmProductivity(function(err, fp_overview) {
												if (err)
													throw err;
												else {
													var calendar_arr = fp_overview.map(({ calendar_id }) => calendar_id).concat(fp_overview.map(({ max_prev_calendar }) => max_prev_calendar));
													reportModel.getInputResourcesUsed({ calendar_ids: calendar_arr }, function(err, input_resources) {
														if (err)
															throw err;
														else {
															html_data['data'] = analyzer.processHarvestSummary(chart_data, early_harvest, historical_yield, analyzer.calculateProductivity(fp_overview, input_resources), nutrient_reco_details);
															//console.log(html_data.data.printable);
															html_data["notifs"] = req.notifs;
															res.render('summary_harvest_report', html_data);
														}
													});
												}
											});
										}
									});
								}
							})
						}
					});
				}
			});
					
		}
	});
}

exports.ajaxSeedChart = function(req, res) {
	console.log(req.body);
	console.log(req.query);
	var html_data = {};
	// res.send({});
	reportModel.getSeedChart( req.query.farms.map(a => a.farm_name), { list: req.query.plans }, function(err, seed_chart) {
		if (err)
			throw err;
		else {
			materialModel.getMaterialsList('Seed', null, function(err, seed_materials) {
				if (err)
					throw err;
				else {
					const calendar_list = seed_chart;
					const calendar = calendar_list.filter(e => e.calendar_id == req.query.id)[0];
					const crop_plans = [...new Set(calendar_list.map(e => e.crop_plan).map(item => item))];

					seed_chart = analyzer.processSeedChartData(seed_chart, seed_materials)
					html_data['seed_chart_lbls'] = seed_chart.farm_legends;
					html_data['seed_chart'] = { stringify: JSON.stringify(seed_chart.data), obj: seed_chart };
					
					res.send({ stringify: JSON.stringify(seed_chart.data), obj: seed_chart });
				}
			});
		}
	});
}

exports.getDetailedHarvestReport = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'reports', req.session);
	html_data["notifs"] = req.notifs;
	html_data["farm_name"] = req.query.farm;
	html_data['range'] = { start: "2017-01-01", end: dataformatter.formatDate(new Date(), 'YYYY-MM-DD') };
	var arr = [], obj, calendar_ids;
	reportModel.getHarvestSummaryChart({ crop_plan: req.params.crop_plan, status: 'Completed' }, function(err, chart_data) {
		if (err) {
			throw err;
		}
		else {
			// Get best, worst, and target crop plans checked
			obj = chart_data.filter(a => a.calendar_id == req.query.id)[0]
			obj['category'] = 'Target';
			arr.push(obj);
			obj = chart_data.reduce((a,b)=>a.harvested>b.harvested ?a:b);
			chart_data = chart_data.filter(function(e) { return e.calendar_id !== obj.calendar_id });
			obj['category'] = '1st';
			arr.push(obj);
			obj = chart_data.reduce((a,b)=>a.harvested>b.harvested ?a:b);
			chart_data = chart_data.filter(function(e) { return e.calendar_id !== obj.calendar_id });
			obj['category'] = '2nd';
			arr.push(obj);
			obj = chart_data.reduce((a,b)=>a.harvested>b.harvested ?a:b);
			obj['category'] = '3rd';
			arr.push(obj);

			// Clean array and indicate if object is best, worst, or target
			arr = [...new Map(arr.map(item =>
  		[item.calendar_id, item])).values()];
  		arr.filter(e => e.calendar_id == req.query.id)[0]['isTarget'] = true;

  		if (arr.length == 1)
  			arr[0]['category'] = '';

  		arr.sort((a,b) => b.harvested - a.harvested);

  		calendar_ids = arr.map(a => a.calendar_id );

			reportModel.getNutrientRecommendationDetails({ calendar_ids: calendar_ids }, function(err, nutrient_reco_details) {
				if (err) {
					throw err;
				}
				else {

					html_data['comparison'] = analyzer.prepHarvestComparison(arr, nutrient_reco_details);
					farmModel.filteredFarmDetails({ farm_name: req.query.farm }, function(err, farm) {
					if (err) {
						throw err
					}
					else {
						cropCalendarModel.getAllCalendars(function(err, calendar_list) {
							if (err)
								throw err;
							else {
								console.log(calendar_list);
								reportModel.getSeedChart( arr.map(a => a.farm_name), null, function(err, seed_chart) {
									if (err)
										throw err;
									else {
										materialModel.getMaterialsList('Seed', null, function(err, seed_materials) {
											if (err)
												throw err;
											else {
												const calendar_list = seed_chart;
												const calendar = calendar_list.filter(e => e.calendar_id == req.query.id)[0];
												const crop_plans = [...new Set(calendar_list.map(e => e.crop_plan).map(item => item))];
												var te = ['Early 2019', 'Late 2020'];

												seed_chart = analyzer.processSeedChartData(seed_chart, seed_materials)
												html_data['seed_chart_lbls'] = seed_chart.farm_legends;
												html_data['seed_chart'] = { stringify: JSON.stringify(seed_chart.data), obj: seed_chart };
												html_data['crop_plans'] = { data: JSON.stringify(crop_plans), index: JSON.stringify([crop_plans.indexOf(te[0]), crop_plans.indexOf(te[1])]), start: te[0], end: te[1] };

												reportModel.getNutrientChart({ crop_calendar_id: calendar_ids }, { calendar_id: calendar_ids }, function(err, nutrient_chart) {
													if (err)
														throw err;
													else {
														reportModel.getPDOccurence({ calendar_id: calendar_ids }, function(err, pd_chart) {
															if (err)
																throw err;
															else {
																farmModel.getAllFarms(function(err, farm_list) {
																	if (err)
																		throw err;
																	else {
																		var nutrient_chart_arr = [], temp_nutrient, temp_pd, temp;
																		for (var x = 0; x < calendar_ids.length; x++) {
																			temp_nutrient = nutrient_chart.filter(e => e.crop_calendar_id == calendar_ids[x]);
																			temp_pd = pd_chart.filter(e => e.calendar_id == calendar_ids[x]);

																			// Process and group nutrient and pd data by calendar ID
																			// Nutrient data
																			for (var i = 0; i < temp_nutrient.length; i++) {
																				if (new Date(calendar.sowing_date > new Date(temp_nutrient[i].date_completed))) {
																					temp_nutrient[i]['dat'] = dateDiffInDays(new Date(calendar.sowing_date), new Date(temp_nutrient[i].date_completed));
																				}
																				else {
																					temp_nutrient[i]['dat'] = dateDiffInDays(new Date(temp_nutrient[i].date_completed), new Date(calendar.sowing_date));
																				}
																				
																				if (calendar.method == 'Transplanting')
																					temp_nutrient[i].dat += 15;
																			}
																			// PD data
																			for (var i = 0; i < temp_pd.length; i++) {
																				if (new Date(calendar.sowing_date > new Date(temp_pd[i].date_diagnosed))) {
																					temp_pd[i]['dat'] = dateDiffInDays(new Date(calendar.sowing_date), new Date(temp_pd[i].date_diagnosed));
																				}
																				else {
																					temp_pd[i]['dat'] = dateDiffInDays(new Date(temp_pd[i].date_diagnosed), new Date(calendar.sowing_date));
																				}

																				if (calendar.method == 'Transplanting')
																					temp_pd[i].dat += 15;
																			}
																			
																			temp = arr.filter(e => e.calendar_id == calendar_ids[x])[0].farm_name;
																			while(temp.includes(" ")) {
																				temp = temp.replace(' ', '_');
																			}

																			nutrient_chart_arr.push({ farm_name: arr.filter(e => e.calendar_id == calendar_ids[x])[0].farm_name, 
																				chart_name: temp, 
																				data: analyzer.processNutrientChart(temp_nutrient, temp_pd, arr) 
																			});
																		}

																		farm_list.forEach(function(e) {
																			arr.forEach(function(item) {
																				if (e.farm_name == item.farm_name) {
																					e['checked'] = true
																				}
																			})
																		});

																		html_data['farm_list'] = farm_list;
																		html_data['json_nutrient'] = nutrient_chart_arr;
																		html_data['nutrient_chart'] = JSON.stringify(nutrient_chart_arr);

																		html_data["notifs"] = req.notifs;
																		res.render('detailed_harvest_report', html_data);
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
							}
						});
								
					}
				});

				}
			});
		}
});

																
}

// reportModel.getHarvestReports(function(err, harvest_reports) {
// 																if (err)
// 																	throw err;
// 																else {
// 																	//console.log(harvest_reports);
// 																	var years = harvest_reports.map( ({crop_plan}) => crop_plan.replace(/\D/g, "") );
// 																	years = years.filter((x, i, a) => a.indexOf(x) == i)
// 																	var lbl = ['Late', 'Early'];
// 																	var arr;

// 																	html_data['harvest_reports'] = harvest_reports;
// 															html_data['farm_productivity'] = analyzer.smoothFP(analyzer.calculateProductivity(fp_overview, input_resources));
// 															console.log(html_data['farm_productivity']);
// 															//console.log(html_data.farm_productivity);
// 															html_data["notifs"] = req.notifs;
// 															res.render('detailed_harvest_report', html_data);
// 																}
// 															});		

// Trial for getting ndvi data
							// if (true) {
							// 	const calendar = calendar_list.filter(e => e.calendar_id == req.query.id)[0];

							// 	var url = 'http://api.agromonitoring.com/agro/1.0/polygons?appid='+key;
							//     request(url, { json: true }, function(err, response, farm_body) {
							//         if (err)
							//         	throw err;
							//         else {
							//         	var start_date = dataformatter.dateToUnix(calendar.sowing_date), end_date = dataformatter.dateToUnix(calendar.harvest_date);
							// 			var obj;
							// 			var polygon_id = ((farm_body.filter(e => e.name == calendar.farm_name)[0]).id);

							// 			var data = {
							// 				polygon_id: polygon_id,
							// 				start: start_date,
							// 				end: end_date,
							// 				clouds_max: 1
							// 			};
							// 			var options = {
							// 				url: 'https://api.agromonitoring.com/agro/1.0/image/search?polyid='+polygon_id+'&start='+start_date+'&end='+end_date+'&appid='+key+'&clouds_max='+60,
							// 				method: 'GET',
							// 				headers: {
							// 					'Content-type':'application/json'
							// 				},
							// 				body: JSON.stringify(data)
							// 			};
							// 			console.log(options.url);
							// 			request(options, function(err, response, body) {
							// 				if (err)
							// 					throw err;
							// 				else {

							// 					body = JSON.parse(body);
							// 					var arr = [];
							// 					for (var i = 0; i < body.length; i++) {
							// 		        		body[i].dt = dataformatter.formatDate(dataformatter.unixtoDate(body[i].dt), 'YYYY-MM-DD');
							// 		        		body[i]['date'] = dataformatter.unixtoDate(body[i].dt);

							// 		        		console.log(body[i].stats.ndvi);

							// 		        		var stats_options = {
							// 		        			url: body[i].stats.ndvi,
							// 		        			method: 'GET',
							// 		        			headers: {
							// 		        				'Content-type':'application/json'
							// 		        			}
							// 		        		}
							// 		        		request(stats_options, function(err, response, stats) {
							// 		        			if (err)
							// 		        				throw err;

							// 		        			arr.push(stats.max);
							// 		        			console.log(stats);
							// 		        		});
							// 		        	}
							// 		        	console.log(arr);
							// 		        	//console.log(body);
							// 					//var result = body[body.length-1];
							// 					//result.dt = dataformatter.unixtoDate(result.dt);
							// 					////console.log(body);
							// 					res.render('detailed_harvest_report', html_data);
							// 				}
							// 			});
							//         }
							//     });
							// }