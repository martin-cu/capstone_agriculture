const dataformatter = require('../public/js/dataformatter.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
const cropCalendarModel = require('../models/cropCalendarModel.js');
const nutrientModel = require('../models/nutrientModel.js');
const farmModel = require('../models/farmModel.js');
const workOrderModel = require('../models/workOrderModel.js');
const pestDiseaseModel = require('../models/pestdiseaseModel.js');
var request = require('request');

var key = '2ae628c919fc214a28144f699e998c0f'; // Paid API Key

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


exports.getSummarizedFarmMonitoring = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'monitor_farms');

	cropCalendarModel.getCropCalendars({ status: ['In-Progress', 'Active'] }, function(err, list) {
		if (err)
			throw err;
		else {
			var nutrient_query = list.map(e => ({ farm_id: e.farm_id, calendar_id: e.calendar_id }));
			nutrientModel.getUpcomingImportantNutrients(nutrient_query, 'summary', function(err, nutrient_reco) {
				if (err)
					throw err;
				else {
					farmModel.getAllFarmswCalendar(function(err, calendars) {
						if (err)
							throw err;
						else {
							farmModel.getForecastedYieldRecord1({ calendar_id : list.map(({ calendar_id }) => calendar_id) } , function(err, forecast_record) {
								if(err)
									throw err;
								else {
									console.log(forecast_record);
									calendars = calendars.filter(function(cv) {
										return !list.find(function(e) {
											return e.farm_id == cv.farm_id;
										});
									});

									if (list.length != 0) {
										for (var i = 0; i < list.length; i++) {
											var forecast = forecast_record.filter(e => e.calendar_id == list[i].calendar_id);

												if (forecast.length == 0) {
													forecast = 'Forecasted Yield: N/A';
												}
												else {
													forecast = 'Forecasted Yield: '+forecast[0].forecast+' cavans/ha';
												}

											list[i]['forecast'] = forecast; 
										}
									}
										

									for (var i = 0; i < calendars.length; i++) {
										if (calendars[i].calendar_id != null) {
											calendars[i].land_prep_date = dataformatter.formatDate(new Date(calendars[i].land_prep_date), 'mm DD, YYYY');
											calendars[i].sowing_date = dataformatter.formatDate(new Date(calendars[i].sowing_date), 'mm DD, YYYY');
											calendars[i].harvest_date = dataformatter.formatDate(new Date(calendars[i].harvest_date), 'mm DD, YYYY');
										}
									}

									//console.log(calendars);
									for (var i = 0; i < nutrient_reco.length; i++) {
										nutrient_reco[i].target_application_date = dataformatter.formatDate(nutrient_reco[i].target_application_date, 'mm DD, YYYY');
									}


									var nutrient_reco_arr = [];
									const unique = [...new Map(nutrient_reco.map(item =>
					  					[item.fr_plan_id, item])).values()];
									for (var i = 0; i < unique.length; i++) {
										for (var x = 0; x < list.length; x++) {
											if (list[x].farm_id == unique[i].farm_id) {
												list[x]['nutrients'] = nutrient_reco_arr.concat((nutrient_reco.filter(e => e.fr_plan_id == unique[i].fr_plan_id)).slice(0, 3));
											}
										}
									}
									//console.log(nutrient_reco);
									//var filtered_list = list.filter(e => e.stage != 'Land Preparation' && e.stage != 'Sow Seed');
									var url = 'http://api.agromonitoring.com/agro/1.0/polygons?appid='+key;
									request(url, { json: true }, function(err, response, body) {
										if (err)
											throw err;
										else {
											var farm_list = [];
											//console.log(body);
											for (var i = 0; i < list.length; i++) {
												farm_list.push({ id: body.filter(e => e.name == list[i].farm_name)[0].id, name: list[i].farm_name });

												// if (list[i].sow_date_completed != null) {
												// 	list[i].sow_date_completed = new Date(list[i].sow_date_completed);
												// 	if (list[i].method == 'Transplanting') {
												// 		list[i].sow_date_completed.setDate((list[i].sow_date_completed).getDate() - 15);											
												// 	}

												// }
												
												list[i]['days_till_harvest'] = list[i].sow_date_completed == null ? 'N/A' : dateDiffInDays((list[i].sow_date_completed), new Date());
											}
											// console.log(list);
											pestDiseaseModel.getDiagnosisSymptomsSummarized(null, function(err, symptoms){
												if(err)
													throw err;
												else{
													for(i = 0; i < list.length; i++){
														list[i]["symptoms"] = [];
														list[i]["empty_symptoms"] = true;
														for(x = 0; x < symptoms.length; x++){
															if(symptoms[x].farm_id == list[i].farm_id){
																list[i].symptoms.push(symptoms[x]);
																list[i].empty_symptoms = false;
															}
														}

													}
												}

												//Append stage to list
												var filtered;
												for (var i = 0; i < farm_list.length; i++) {
													filtered = list.filter(e => e.farm_name == farm_list[i].name)[0];

													farm_list[i]['data'] = { dat: filtered.days_till_harvest, stage: filtered.stage };
												}

												html_data["notifs"] = req.notifs;

												html_data['data'] = { calendars: list, farms: farm_list, inactive: calendars };
												html_data['JSON_data'] = { calendars: JSON.stringify(list), farms: JSON.stringify(farm_list) };
												
												res.render('summary_farm_monitoring', html_data);
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

exports.getCropCalendarTab = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'crop_calendar');
	cropCalendarModel.getCropCalendars({ status: ['In-Progress', 'Active'] }, function(err, list) {
		if (err)
			throw err;
		else {
			if(list.length == 0)
				html_data["empty_plan"] = true;
			var list_obj = {
				land_prep: [],
				sowing: [],
				vegetation: [],
				reproductive: [],
				ripening: [],
				harvesting: []
			};

			list_obj.land_prep = list.filter(ele => ele.stage2 == 'Land Preparation');
			//console.log(list_obj.land_prep);
			list_obj.sowing = list.filter(ele => ele.stage2 == 'Sowing');
			list_obj.vegetation = list.filter(ele => ele.stage2 == 'Vegetation');
			list_obj.reproductive = list.filter(ele => ele.stage2 == 'Reproductive');
			list_obj.ripening = list.filter(ele => ele.stage2 == 'Ripening');
			list_obj.harvesting = list.filter(ele => ele.stage2 == 'Harvesting');

			var query = {
				where: {
					key: ['work_order_table.status', 'work_order_table.status'],
					value: ['Pending', 'In-Progress']
				},
				order: ['work_order_table.status ASC', 'work_order_table.date_due asc', 'farm_table.farm_id']
			}

			workOrderModel.getWorkOrders(query, function(err, wo_list) {
				if (err)
					throw err;
				else {
					for (var i = 0; i < wo_list.length; i++) {
						wo_list[i].date_created = dataformatter.formatDate(new Date(wo_list[i].date_created), 'YYYY-MM-DD');
						wo_list[i].date_due = dataformatter.formatDate(new Date(wo_list[i].date_due), 'YYYY-MM-DD');
						wo_list[i].date_start = dataformatter.formatDate(new Date(wo_list[i].date_start), 'YYYY-MM-DD');
					}

					for (prop in list_obj) {
						for (var i = 0; i < list_obj[prop].length; i++) {
							list_obj[prop][i]['wo_list'] = wo_list.filter(ele => ele.farm_id == list_obj[prop][i].farm_id);
						}
					}

					
					html_data['calendar_list'] = list_obj;
					
					var list_obj_keys = ['land_prep', 'sowing', 'vegetation', 'reproductive', 'ripening', 'harvesting'];
					for (var i = 0; i < list_obj_keys.length; i++) {
						for (var x = 0; x < list_obj[list_obj_keys[i]].length; x++) {
							list_obj[list_obj_keys[i]][x].wo_list = list_obj[list_obj_keys[i]][x].wo_list.splice(0, 3);
						}
					}

					cropCalendarModel.getCropCalendars({ status: ['Completed'] }, function(err, past_calendars){
						if(err)
							throw err;
						else{
							for(i = 0; i < past_calendars.length; i++){
								if(past_calendars[i].sowing_date != null)
									past_calendars[i].sowing_date = dataformatter.formatDate(new Date(past_calendars[i].sowing_date), "YYYY-MM-DD")
							}
							html_data["past_calendars"] = past_calendars;
							cropCalendarModel.getRequiredMaterials({ calendar_id: list.map(e => e.calendar_id) }, function(err, material_list) {
								if (err)
									throw err;
								else {
									var unique;
									var material_obj = {
										seed: { data: material_list.filter(e => e.type == 'Seed'), rows: [] },
										fertilizer:  { data: material_list.filter(e => e.type == 'Fertilizer'), rows: [] },
										pesticide:  { data: material_list.filter(e => e.type == 'Pesticide'), rows: [] }
									}

									var material_obj_cont;

									var obj_keys = ['seed', 'fertilizer', 'pesticide'];

									for (var i = 0; i < obj_keys.length; i++) {
										var unique_mats = [...new Map(material_obj[obj_keys[i]].data.map(item =>
	  									[item.item_name, item])).values()];
										unique = [...new Map(material_obj[obj_keys[i]].data.map(item =>
	  									[item.farm_id, item])).values()];
										
										for (var y = 0; y < unique_mats.length; y++) {
											material_obj[obj_keys[i]].rows.push({
												item_name: unique_mats[y].item_name,
												total_req: material_obj[obj_keys[i]].data.filter(e => e.item_name == unique_mats[y].item_name).map(e => (e.qty)).reduce(function (acc, obj) { return acc + obj; }, 0),
												list: [],
												total_deficient: material_obj[obj_keys[i]].data.filter(e => e.item_name == unique_mats[y].item_name && e.deficient_qty != 'N/A').map(e => (e.deficient_qty)).reduce(function (acc, obj) { return parseInt(acc) + parseInt(obj); }, 0)
											});
											for (var x = 0; x < unique.length; x++) {
		  										var unique_farm_mats = material_obj[obj_keys[i]].data.filter(e => e.farm_id == unique[x].farm_id && e.item_id == unique_mats[y].item_id);

	  											material_obj[obj_keys[i]].rows[material_obj[obj_keys[i]].rows.length-1].list = material_obj[obj_keys[i]].rows[material_obj[obj_keys[i]].rows.length-1].list.concat(
	  												unique_farm_mats.map(item => (
		  												{ 
		  													farm: item.farm_name,
		  													item: item.item_name, 
		  													inventory: item.inventory,
		  													requirement: item.qty,
		  													deficient: item.deficient_qty
		  												}) 
		  											)
	  											);
	  										}
										}
		  									
									}
									
									html_data['materials'] = material_obj;
									html_data["notifs"] = req.notifs;
									res.render('crop_calendar_tab', html_data);
								}
							});
						}
					});
				}
			});
		}
	});
}

exports.ajaxGetCurrentCropCalendar = function(req, res) {
	var query = { farm_id: req.query.farm_id };
	cropCalendarModel.getCurrentCropCalendar(query, function(err, calendar) {
		if (err)
			throw err;
		else {
			res.send(calendar);
		}
	});
};

exports.ajaxCreateCropPlan = function(req, res) {
	//console.log(req.body);
	var query = {
		farm_id: req.body.farm_id,
		land_prep_date: req.body.land_prep_date_end,
		sowing_date: req.body.sowing_date_end,
		harvest_date: req.body.harvest_date_end,
		// planting_method: req.body.planting_method,
		seed_planted: req.body.seed_id,
		status: 'In-Progress',
		seed_rate: req.body.seed_rate,
		crop_plan: req.body.crop_plan,
		method: req.body.method
	};
	cropCalendarModel.createCropCalendar(query, function(err, plan) {
		if (err)
			throw err;
		else {
			res.send(plan);
		}
	});
}

exports.ajaxGetCropPlans = function(req, res) {

	cropCalendarModel.getCropCalendars(req.query, function(err, plans) {
		if (err)
			throw err;
		else {
			if (req.query.unique) {
				const unique = [...new Map(plans.map(plan =>
	  							[plan.crop_plan, plan])).values()];
			}
			
			// console.log(plans);
			res.send(plans);
		}
	});
}

exports.ajaxGetCropPlanDetails = function(req, res) {
	var query = req.query;
	cropCalendarModel.getSingleCropCalendar(query, function(err, detail) {
		if (err)
			throw err;
		else {
			res.send(detail);
		}
	})
}

// ADD CROP CALENDAR PAGE (Maybe convert this into a dropdown too in the main crop calendar page?)
exports.getAddCropCalendar = function(req, res) {
	var html_data = {};
	html_data["title"] = "Crop Calendar";
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'add_crop_calendar');
	html_data["notifs"] = req.notifs;
	res.render('add_crop_calendar', html_data);
}

exports.getDetailedCropCalendar = function(req, res) {
	var html_data = {};
	html_data["title"] = "Crop Calendar";
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'detailed_crop_calendar');
	
	var query = { status: ['In-Progress', 'Active', 'Completed']};
	cropCalendarModel.getCropCalendarByID(query, req.query.id, function(err, crop_calendar){
		if(err)
			throw err;
		else{
			crop_calendar[0].land_prep_date = dataformatter.formatDate(new Date(crop_calendar[0].land_prep_date), 'YYYY-MM-DD');
			crop_calendar[0].sowing_date = dataformatter.formatDate(new Date(crop_calendar[0].sowing_date), 'YYYY-MM-DD');
			crop_calendar[0].harvest_date = dataformatter.formatDate(new Date(crop_calendar[0].harvest_date), 'YYYY-MM-DD');

		}

		for (const [key, value] of Object.entries(crop_calendar[0])){
			// console.log(key, value);
			if(value == null)
				crop_calendar[0][key] = "N/A";
		}
		// console.log(crop_calendar);

		var wo_query = {
			where : { key : ["calendar_id"], value : [req.query.id]}
		}
		var pd_wos = [];
		workOrderModel.getWorkOrders(wo_query, function(err, wos){
			if(err)
				throw err;
			else{
				var i;
				for(i = 0; i < wos.length; i++){
					wos[i].date_start = dataformatter.formatDate(new Date(wos[i].date_start), 'YYYY-MM-DD');
					if(wos[i].date_completed != null)
						wos[i].date_completed = dataformatter.formatDate(new Date(wos[i].date_completed), 'YYYY-MM-DD');
					else
						wos[i].date_completed = "N/A" //Not yet completed (changed to reduce conflict with case insensitive search, e.g., "Completed")
					
					if(wos[i].type != "Land Preparation" && wos[i].type != "Sow Seed" && wos[i].type != "Fertilizer Application" && wos[i].type != "Harvest")
						pd_wos.push(wos[i]);
				}
			}

			var fertilizer_query = {}
			fertilizer_query['frp.calendar_id'] = req.query.id;
			nutrientModel.getNutrientPlanItemsCompleted(fertilizer_query, function(err, fertilizers){
				if(err)
					throw err;
				else{
					for(i = 0; i < fertilizers.length; i++){
						if(fertilizers[i].date_completed != null)
							fertilizers[i].date_completed = dataformatter.formatDate(new Date(fertilizers[i].date_completed), 'YYYY-MM-DD');
						else
							fertilizers[i].date_completed = "N/A" //Not yet completed (changed to reduce conflict with case insensitive search, e.g., "Completed")
						fertilizers[i].target_application_date = dataformatter.formatDate(new Date(fertilizers[i].target_application_date), 'YYYY-MM-DD');
					}
				}

				var query = { farm_name: crop_calendar[0].farm_name };

				nutrientModel.getSoilRecord(query, function(err, soil_record) {
					if (err)
						throw err;
					else {
						cropCalendarModel.getRequiredMaterials({ calendar_id: [req.query.id] }, function(err, material_list) {
							if (err)
								throw err;
							else {
								//console.log(material_list);
								//console.log(soil_record);
								if(soil_record[0].pH_lvl == null)
									soil_record[0].pH_lvl = "N/A";
								if(soil_record[0].p_lvl == null)
									soil_record[0].p_lvl = "N/A";
								if(soil_record[0].k_lvl == null)
									soil_record[0].k_lvl = "N/A";
								if(soil_record[0].n_lvl == null)
									soil_record[0].n_lvl = "N/A";
								

								var material_obj = { 
									seed: material_list.filter(e => e.type == 'Seed'), 
									fertilizer: material_list.filter(e => e.type == 'Fertilizer'), 
									pesticide: material_list.filter(e => e.type == 'Pesticide')
								};
								console.log(material_obj);
								html_data['materials'] = material_obj;
								html_data["workorders"] = wos;
								html_data["soil_record"] = soil_record[0];
								html_data["fertilizer_wos"] = fertilizers;
								html_data["pd_wos"] = pd_wos;
								html_data["crop_plan_details"] = crop_calendar[0];
								html_data["notifs"] = req.notifs;
								res.render('detailed_crop_calendar', html_data); 
							}
						});
					}			
				});
			});
		});
		
	});
}