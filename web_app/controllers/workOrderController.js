const dataformatter = require('../public/js/dataformatter.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
const workOrderModel = require('../models/workOrderModel.js');
const materialModel = require('../models/materialModel.js');
const cropCalendarModel = require('../models/cropCalendarModel.js');
const farmModel = require('../models/farmModel.js');
const harvestModel = require('../models/harvestModel.js');
const reportModel = require('../models/reportModel.js');
var request = require('request');

function consolidateResources(type, ids, qty, wo_id) {
	var query_arr = [];
	var resource_query;

	var resource_id = ids;
	var resource_qty = qty;

	for (var i = 0; i < resource_qty.length; i++) {
		if (resource_qty[i] == 0 || resource_qty[i] == '0') {
			resource_qty.splice(i, 1);
			resource_id.splice(i, 1);
			i--;
		}
	}

	for (var i = 0; i < resource_id.length; i++) {
		resource_query = {
			work_order_id: wo_id,
			type: type,
			units: null,
			qty: resource_qty[i],
			item_id: resource_id[i]
		};

		query_arr.push(resource_query);

		resource_query = null;
	}

	return query_arr;
}

exports.ajaxGetWOResources = function(req, res) {
	var query = { work_order_id: req.query.work_order_id };
	workOrderModel.getResourceDetails(query, req.query.type, function(err, resource_details) {
		if (err)
			throw err;
		else {
			// html_data['resources'] = resource_details;
			// html_data['resources']['title'] = type+'s:';
			// html_data['resources']['lbl'] = { name: type, item: type+'_id', qty: type+'_qty' };
			// html_data["notifs"] = req.notifs;
			//res.render('detailed_work_order', html_data);
			res.send(resource_details);
		}
	});
}

exports.getDetailedWO = function(req, res) {
	var query = { work_order_id: req.params.work_order_id };
	workOrderModel.getDetailedWorkOrder(query, function(err, details) {
		if (err)
			throw err;
		else {
			details = details[0];
			details['date_start'] = dataformatter.formatDate(new Date(details['date_start']), 'YYYY-MM-DD');
			details['date_due'] = dataformatter.formatDate(new Date(details['date_due']), 'YYYY-MM-DD');
			details['date_created'] = dataformatter.formatDate(new Date(details['date_created']), 'YYYY-MM-DD');

			if (details.date_completed != null || details.date_completed != undefined)
				details['date_completed'] = dataformatter.formatDate(new Date(details['date_completed']), 'YYYY-MM-DD');

			var type;
			var html_data = {
				work_order: details,
				editable: details.status == 'Completed' || details.status == 'Cancelled' ? false : true
			};

			html_data = js.init_session(html_data, 'role', 'name', 'username', 'farms');
			html_data['stage'] = '';
			html_data['farm_area'] = 0;
			html_data['status_editable'] = true;
			html_data['harvest_editable'] = details.type == 'Harvest' ? true : false;
			html_data['isCancellable'] = true;
			switch (details.type) {
				case 'Sow Seed':
				type = 'Seed';
				html_data['isCancellable'] = false;
				break;
				case 'Pesticide Application':
				type = 'Pesticide';
				break;
				case 'Fertilizer Application':
				type = 'Fertilizer';
				break;
				case 'Harvest':
				type = 'Harvest';
				html_data['isCancellable'] = false;
				break;
				case 'Land Preparation':
				html_data['isCancellable'] = false;
				break;
				default:
				type = null;
			}

			var wo_type = details.type.split("-");
			if(wo_type[0] == "Apply pesticide" || wo_type[0] == "Apply fungicide"){
				html_data["pesticide"] = true;
			}

			if (type != null) {
				if (type == 'Harvest') {
					var wo_list_query = {
						where: {
							key: ['crop_calendar_id', 'type'],
							value: [details.crop_calendar_id, 'Sow Seed']
						},
						order: ['work_order_table.status ASC', 'work_order_table.date_due DESC']
					};
					workOrderModel.getWorkOrders(wo_list_query, function(err, wo_list) {
						if (err)
							throw err;
						else {
							cropCalendarModel.getCropCalendars({ status: ['Completed', 'In-Progress', 'Cancelled', 'Active'], where: { key: 'calendar_id', val: details.crop_calendar_id } }, function(err, crop_calendar) {
								if (err)
									throw err;
								else {
									harvestModel.readHarvestDetail({ cct_id: details.crop_calendar_id }, function(err, harvest_details) {
										if (err)
											throw err;
										else {
											html_data["farm_area"] = crop_calendar.filter(e => e.calendar_id == details.crop_calendar_id)[0].farm_area;
											for (var i = 0; i < harvest_details.length; i++) {
												harvest_details[i].sacks_harvested *= html_data.farm_area;
											}
											if (harvest_details.length == 0) 
												harvest_details.push({});
											console.log(harvest_details);
											html_data['stage'] = crop_calendar.filter(e => e.calendar_id == details.crop_calendar_id)[0].stage;
											html_data['status_editable'] = wo_list[0].status == 'Completed' ? true : false;
											html_data['harvest_details'] = harvest_details;
											
											html_data["notifs"] = req.notifs;
											res.render('detailed_work_order', html_data);
										}
									});
											
								}
							});	
						}
					});
				}
				else {
					if (type == 'Seed') {
						var wo_list_query = {
							where: {
								key: ['crop_calendar_id', 'type'],
								value: [details.crop_calendar_id, 'Land Preparation']
							},
							order: ['work_order_table.status ASC', 'work_order_table.date_due DESC']
						};
						workOrderModel.getWorkOrders(wo_list_query, function(err, wo_list) {
							if (err)
								throw err;
							else {
								workOrderModel.getResourceDetails(query, type, function(err, resource_details) {
									if (err)
										throw err;
									else {
										for (var i = 0; i < resource_details.length; i++) {
											resource_details[i].qty = Math.round(resource_details[i].qty * 100) / 100;
										}
										html_data['status_editable'] = wo_list[0].status == 'Completed' ? true : false;
										html_data['resources'] = resource_details;
										html_data['resources']['title'] = type+'s:';
										html_data['resources']['lbl'] = { name: type, item: type+'_id', qty: type+'_qty' };
										html_data["notifs"] = req.notifs;
										html_data["notifs"] = req.notifs;
										res.render('detailed_work_order', html_data);
									}
								});
							}
						});
					}
					else {
						workOrderModel.getResourceDetails(query, type, function(err, resource_details) {
							if (err)
								throw err;
							else {
								html_data['resources'] = resource_details;
								html_data['resources']['title'] = type+'s:';
								html_data['resources']['lbl'] = { name: type, item: type+'_id', qty: type+'_qty' };
								html_data["notifs"] = req.notifs;
								html_data["notifs"] = req.notifs;
								res.render('detailed_work_order', html_data);
							}
						});
					}
				}
			}
			else {
				html_data["notifs"] = req.notifs;
				html_data["notifs"] = req.notifs;
				res.render('detailed_work_order', html_data);
			}
		}
	});
}

exports.createWorkOrder = function(req, res) {
	var query = {
		type: req.body.wo_type,
		crop_calendar_id: req.body.crop_calendar_id,
		date_created: dataformatter.formatDate(new Date(), 'YYYY-MM-DD'),
		date_due: dataformatter.formatDate(new Date(req.body.due_date), 'YYYY-MM-DD'),
		date_start: dataformatter.formatDate(new Date(req.body.start_date), 'YYYY-MM-DD'),
		status: 'Pending',
		desc: null,
		notes: req.body.notes
	};

	cropCalendarModel.getCropCalendars({ status: ['In-Progress', 'Active'] }, function(err,calendars) {
		if (err)
			throw err;
		else {
			var selected_calendar = calendars.filter(e => e.calendar_id == req.body.crop_calendar_id)[0];

			query['stage'] = selected_calendar.stage;
			workOrderModel.createWorkOrder(query, function(err, result) {
				if (err)
					throw err;
				else {
					var resource_type = null;

					if (query.type == 'Pesticide Application') {
						resource_type = 'Pesticide';
					}
					else if (query.type == 'Fertilizer Application') {
						resource_type = 'Fertilizer'
					}
					else if (query.type == 'Sow Seed') {
						resource_type = 'Seed;'
					}

					if (resource_type != null) {
						var query_arr = consolidateResources(resource_type, req.body[''+resource_type+'_id']
								, req.body[''+resource_type+'_qty'], result.insertId);

						workOrderModel.createWorkOrderResources(query_arr, function(err, resource_result) {
							if (err)
								throw err;
							else {
								res.redirect('/farms/work_order&id='+result.insertId);
							}
						});
					}
					else {
						res.redirect('/farms/work_order&id='+result.insertId);
					}
				}
			})
		}
	});
}

exports.ajaxCreateWorkOrder = function(req, res) {
	var query = {
		type: req.body.wo_type,
		crop_calendar_id: req.body.crop_calendar_id,
		date_created: dataformatter.formatDate(new Date(), 'YYYY-MM-DD'),
		date_due: dataformatter.formatDate(new Date(req.body.due_date), 'YYYY-MM-DD'),
		date_start: dataformatter.formatDate(new Date(req.body.start_date), 'YYYY-MM-DD'),
		status: 'Pending',
		desc: null,
		notes: req.body.notes
	};
	var resource_ids = req.body.resources.ids;
	var resource_qty = req.body.resources.qty;

	workOrderModel.createWorkOrder(query, function(err, result) {
		if (err)
			throw err;
		else {
			var resource_type = null;

			if (query.type == 'Pesticide Application') {
				resource_type = 'Pesticide';
			}
			else if (query.type == 'Fertilizer Application') {
				resource_type = 'Fertilizer'
			}
			else if (query.type == 'Sow Seed') {
				resource_type = 'Seed'
			}

			if (resource_type != null) {
				var query_arr = consolidateResources(resource_type, resource_ids
						, resource_qty, result.insertId);

				workOrderModel.createWorkOrderResources(query_arr, function(err, resource_result) {
					if (err)
						throw err;
					else {
						res.send('/farms/work_order&id='+result.insertId);
					}
				});
			}
			else {
				res.send('/farms/work_order&id='+result.insertId);
			}
		}
	})
}

exports.ajaxGetWorkOrders = function(req, res) {
	var query = req.query;
	workOrderModel.getWorkOrders(query, function(err, list) {
		if (err)
			throw err;
		else {
			res.send(list);
		}
	});
}

exports.getWorkOrdersPage = function(req, res) {
	var query = {
        order: ['work_order_table.status ASC', 'work_order_table.date_due asc']
    }
	workOrderModel.getWorkOrders(query, function(err, list) {
		if (err)
			throw err;
		else {
			// console.log(list);
			for (var i = 0; i < list.length; i++) {
				list[i].date_created = dataformatter.formatDate(new Date(list[i].date_created), 'YYYY-MM-DD');
				list[i].date_due = dataformatter.formatDate(new Date(list[i].date_due), 'YYYY-MM-DD');
				list[i].notes = list[i].notes == null ? 'N/A' : list[i].notes;
			}

			var html_data = { wo_list: list };
			// console.log(html_data);
			html_data = js.init_session(html_data, 'role', 'name', 'username', 'farms');
			html_data["notifs"] = req.notifs;
			html_data["notifs"] = req.notifs;
			res.render('farms', html_data);
		}
	});
}

exports.getWorkOrdersDashboard = function(req, res) {
	//console.log(req.notifs[0]);
	var upcoming = [];
	var completed = [];
	var html_data = {};
	
	var query = {
        order: [ 'work_order_table.date_completed desc', 'work_order_table.date_due ASC'],
		// limit: ['10']
    }
	workOrderModel.getWorkOrders(query, function(err, list) {
		if (err)
			throw err;
		else {
			reportModel.getCalendarList('old',function(err, fp_overview) {
				if (err)
					throw err;
				else {
					var calendar_arr = fp_overview.map(({ calendar_id }) => calendar_id);
					reportModel.getInputResourcesUsed({ calendar_ids: calendar_arr }, function(err, input_resources) {
						if (err)
							throw err;
						else {
							reportModel.getCalendarList('new', function(err, fp_new) {
								if (err)
									throw err;
								else {
									var calendar_arr_new = fp_new.map(({ calendar_id }) => calendar_id);
									reportModel.getInputResourcesUsed({ calendar_ids: calendar_arr_new }, function(err, input_new) {
										if (err)
											throw err;
										else {
											for (var i = 0; i < list.length; i++) {

												if (list[i].status == 'Pending') {
													list[i].date_created = dataformatter.formatDate(new Date(list[i].date_created), 'YYYY-MM-DD');
													list[i].date_due = dataformatter.formatDate(new Date(list[i].date_due), 'YYYY-MM-DD');
													list[i].notes = list[i].notes == null ? 'N/A' : list[i].notes;

													upcoming.push(list[i]);
												}

												if (list[i].status == 'Completed') {
													list[i].date_created = dataformatter.formatDate(new Date(list[i].date_created), 'YYYY-MM-DD');
													list[i].date_due = dataformatter.formatDate(new Date(list[i].date_due), 'YYYY-MM-DD');
													list[i].date_completed = dataformatter.formatDate(new Date(list[i].date_completed), 'YYYY-MM-DD');
													list[i].notes = list[i].notes == null ? 'N/A' : list[i].notes;
									
													completed.push(list[i]);
												}
											}
											var fp_obj = {
												avg: analyzer.processMeanProductivity(fp_overview, input_resources),
												cur: analyzer.processMeanProductivity(fp_new, input_new),
												percentage: null,
												max: 100
											}
											fp_obj.percentage = ((fp_obj.cur / fp_obj.avg) * 100).toFixed(2);

											var standard = 100;
											while (standard < fp_obj.percentage) {
												standard += 100;
												fp_obj.max = standard;
											}

											html_data = { upcomingWoList: upcoming.slice(0, 10), completedWoList: completed.slice(0, 10) };
											html_data['fp'] = fp_obj;
											html_data = js.init_session(html_data, 'role', 'name', 'username', 'dashboard');

											html_data["notifs"] = req.notifs;
											res.render('home', html_data);
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

exports.ajaxEditStatus = function(req, res) {
	var query = { status: 'In-Progress' };

	var wo_list_query = {
		where: {
			key: ['crop_calendar_id', 'type'],
			value: [req.query.calendar_id, 'Harvest']
		},
		order: ['work_order_table.status ASC', 'work_order_table.date_due DESC']
	};
	workOrderModel.getWorkOrders(wo_list_query, function(err, wo_list) {
		if (err)
			throw err;
		else {
			if (wo_list[0].status == 'Pending') {
				var filter = { work_order_id: wo_list[0].work_order_id };
				workOrderModel.updateWorkOrder(query, filter, function(err, edit_status) {
					if (err)
						throw err;
					else {
						res.send('Crop Calendar ID: '+req.query.calendar_id+' - began harvest stage!');
					}
				});
			}
			else {
				console.log(wo_list);
				res.send('err');
			} 
		}
	});
}

function processHarvestDetails(sacks, type, stage, id) {
	var obj = {}
	var arr = [];
	for (var i = 0; i < sacks.length; i++) {
		obj = {
			sacks_harvested: sacks[i],
			stage_harvested: stage,
			type: type[i],
			cct_id: id
		}
		arr.push(obj);
	}
	return arr;
}

exports.editWorkOrder = function(req, res) {
	var next_stage = null;
	var query = {
		type: req.body.type,
		crop_calendar_id: req.body.crop_calendar_id,
		date_created: req.body.date_created,
		date_start: req.body.date_start,
		date_due: req.body.date_due,
		status: req.body.status,
		desc: null,
		notes: req.body.notes
	};
	var filter = {
		work_order_id: req.body.wo_id
	};
	var update_forecast = false;

	if (!Array.isArray(req.body.sacks_harvested))
		req.body.sacks_harvested = [req.body.true_sacks];
	if (!Array.isArray(req.body.harvest_type))
		req.body.harvest_type = [req.body.harvest_type];

	if (query.status == 'Completed') {
		query['date_completed'] = dataformatter.formatDate(new Date(), 'YYYY-MM-DD');

		if (query.type == 'Land Preparation') {
			next_stage = 'Sow Seed';
		}
		else if (query.type == 'Harvest') {
			next_stage = 'End';
		}
		else if (query.type == 'Fertilizer Application') {
			update_forecast = true;
		}
	}

	//add pesticide usage && update farm materials
	var type = req.body.type.split("-");
	// console.log(type);
	// console.log(req.body.status);
	if((type[0] == "Apply pesticide" || type[0] == "Apply fungicide") && req.body.status == "Completed"){
		//check if enough
		workOrderModel.getDetailedWorkOrder({work_order_id : req.body.wo_id}, function(err, wo_details){
			if(err)
				throw err;
			else{
				materialModel.getFarmMaterials(wo_details[0].farm_id, function(err, farm_materials){
					if(err)
						throw err;
					else{
						var i; 
						for(i = 0; i < farm_materials.length; i++){
							
							if(farm_materials[i].item_type == "Pesticide" && farm_materials[i].item_name == type[1]){
								// console.log( farm_materials[i].farm_mat_id);
								// console.log("Found it");
								// console.log(farm_materials[i].item_type);
								// console.log(farm_materials[i].item_name);
								// console.log(farm_materials[i].current_amount);
								//check if enough
								if(farm_materials[i].current_amount >= 5){
									//subtract and add pesticide usage
									materialModel.updateFarmMaterials({current_amount : farm_materials[i].current_amount - 5}, {farm_mat_id : farm_materials[i].farm_mat_id}, function(err, success){

									});
									var usage = {
										pesticide_id : farm_materials[i].item_id,
										farm_id : wo_details[0].farm_id,
										amount : 5,
										date_used : dataformatter.formatDate(new Date(), 'YYYY-MM-DD')
									};
									materialModel.addPesticideUsage(usage, function(err, success){

									});
								}
								else{
									console.log("not enough amount");
									workOrderModel.updateWorkOrder({status : "In-Progress", date_completed : null}, filter, function(err, list){});
								}
								break;
							}
						}
					}
				});
			}
		});
	}
	workOrderModel.updateWorkOrder(query, filter, function(err, list) {
		if (err)
			throw err;
		else {
			workOrderModel.deleteResourceRecord(filter, function(err, resource_delete) {
				if (err)
					throw err;
				else {	
					var resource_type = null;
					if (query.type == 'Pesticide Application') {
						resource_type = 'Pesticide';
					}
					else if (query.type == 'Fertilizer Application') {
						resource_type = 'Fertilizer'
					}
					else if (query.type == 'Sow Seed') {
						resource_type = 'Seed'
					}

					if (resource_type != null) {
						var query_arr = consolidateResources(resource_type, req.body[''+resource_type+'_id']
							, req.body[''+resource_type+'_qty'], filter.work_order_id);

						workOrderModel.createWorkOrderResources(query_arr, function(err, resource_create) {
							if (err)
								throw err;
							else {
								if (next_stage != null) {
									var wo_list_query = {
										where: {
											key: ['crop_calendar_id', 'type'],
											value: [query.crop_calendar_id, next_stage]
										},
										order: ['work_order_table.status ASC', 'work_order_table.date_due DESC']
									};
									workOrderModel.getWorkOrders(wo_list_query, function(err, wo_list) {
										if (err)
											throw err;
										else {
											var edit_next_query = {
												status: 'In-Progress'
											};
											workOrderModel.updateWorkOrder(edit_next_query, { work_order_id: wo_list[0].work_order_id }, function(err, next_status) {
												if (err)
													throw err;
												else {
													//Insert update crop calendar seed_planted here
													console.log('1');
													if (resource_type == 'Seed') {
														var cct_query = { seed_planted: query_arr[0].item_id };
														var cct_filter = { calendar_id: query.crop_calendar_id };
														cropCalendarModel.updateCropCalendar(cct_query, cct_filter, function(err, cct) {
															if (err)
																throw err;
															else {
																res.redirect('/farms/work_order&id='+filter.work_order_id);
															}
														});
													}
													else {
														res.redirect('/farms/work_order&id='+filter.work_order_id);
													}
												}
											});
										}
									});
								}
								else {
									//Insert update crop calendar seed_planted here
									console.log('2');
									if (resource_type == 'Seed') {
										var cct_query = { seed_planted: query_arr[0].item_id };
										var cct_filter = { calendar_id: query.crop_calendar_id };
										cropCalendarModel.updateCropCalendar(cct_query, cct_filter, function(err, cct) {
											if (err)
												throw err;
											else {
												res.redirect('/farms/work_order&id='+filter.work_order_id);
											}
										});
									}
									else {
										if (update_forecast) {
											console.log('update forecast!');
											// Get required farm details for updating yield forecast
											cropCalendarModel.getYieldForecastVariables({ calendar_id: query.crop_calendar_id }, function(err, calendar_var) {
												if (err)
													throw err;
												else {
													var farm_name = calendar_var[0].farm_name
													var start = dataformatter.formatDate(new Date(calendar_var[0].sowing_date), 'YYYY-MM-DD');
													var end = dataformatter.formatDate(new Date(calendar_var[0].harvest_date), 'YYYY-MM-DD');
													var redirect = 'work_order&id='+filter.work_order_id;
													res.redirect('/create_complete_yield_forecast/'+farm_name+'/'+start+'/'+end+'/'+redirect+'/'+query.crop_calendar_id);
												}
											});
													
										}
										else {
											res.redirect('/farms/work_order&id='+filter.work_order_id);
										}
									}
								}
							}
						})
					}
					else {
						if (next_stage == 'Sow Seed') {
							var wo_list_query = {
								where: {
									key: ['crop_calendar_id', 'type'],
									value: [query.crop_calendar_id, next_stage]
								},
								order: ['work_order_table.status ASC', 'work_order_table.date_due DESC']
							};
							workOrderModel.getWorkOrders(wo_list_query, function(err, wo_list) {
								if (err)
									throw err;
								else {
									var edit_next_query = {
										status: 'In-Progress'
									};
									console.log('Sow Seed');
									workOrderModel.updateWorkOrder(edit_next_query, { work_order_id: wo_list[0].work_order_id }, function(err, next_status) {
										if (err)
											throw err;
										else {
											res.redirect('/farms/work_order&id='+filter.work_order_id);
										}
									});
								}
							});
						}
						else if (next_stage == 'End') {
							// Insert partial harvests here
							harvestModel.deleteHarvestDetail({ cct_id: req.body.crop_calendar_id }, function(err, harvest_details) {
								if (err)
									throw err;
								else {
									// Get current stage of crop calendar
									cropCalendarModel.getCropCalendars({ status: ['Active','In-Progress'],
									where: { key: 'calendar_id', val: req.body.crop_calendar_id } }, function(err, calendar) {
											if (err)
												throw err;
											else {
												// Process query data here
												var harvest_query = processHarvestDetails(req.body.sacks_harvested, 
													req.body.harvest_type, calendar[0].stage, query.crop_calendar_id);
												harvestModel.createHarvestDetail(harvest_query, function(err, new_detail) {
													if (err)
														throw err;
													else {
														var total_sacks = 0;
														for (var i = 0; i < req.body.sacks_harvested.length; i++)
															total_sacks += parseInt(req.body.sacks_harvested[i]);
														var calendar_query = {
															harvest_yield: total_sacks,
															status: 'Completed'
														};
														var calendar_filter = {
															calendar_id: query.crop_calendar_id
														}
														cropCalendarModel.updateCropCalendar(calendar_query, calendar_filter, function(err, editCalendar) {
															if (err)
																throw err;
															else {
																// Update actual harvest in forecast record
																var forecast_update = {
																	harvested: total_sacks
																};
																var forecast_filter = {
																	calendar_id: query.crop_calendar_id
																}
																console.log(forecast_update);
																farmModel.updateForecastYieldRecord(forecast_update, forecast_filter, function(err, update_status) {
																	if (err)
																		throw err;
																	else {
																		// Redirect
																		res.redirect('/farms/work_order&id='+filter.work_order_id);
																	}
																})
															}
														});
													}
												});
											}
										});
									}
								});
						}
						else if (query.type == 'Harvest') {
							// Insert partial harvests here
							harvestModel.deleteHarvestDetail({ cct_id: req.body.crop_calendar_id }, function(err, harvest_details) {
								if (err)
									throw err;
								else {
									// Get current stage of crop calendar
									cropCalendarModel.getCropCalendars({ status: ['Active','In-Progress'],
									where: { key: 'calendar_id', val: req.body.crop_calendar_id } }, function(err, calendar) {
										if (err)
											throw err;
										else {

											// Process query data here
											var harvest_query = processHarvestDetails(req.body.sacks_harvested, 
												req.body.harvest_type, calendar[0].stage, query.crop_calendar_id);
											harvestModel.createHarvestDetail(harvest_query, function(err, new_detail) {
												if (err)
													throw err;
												else {
													res.redirect('/farms/work_order&id='+filter.work_order_id);
												}
											});
										}
									});
								}
							});
						}
						else {
							res.redirect('/farms/work_order&id='+filter.work_order_id);
						}
					}
				}
			});
		}
	});
}


exports.createWO = function(req, res){
	console.log(req.body.wo);
	workOrderModel.createWorkOrder(req.body.wo, function(err, success){
		res.send("goods");
	});

}