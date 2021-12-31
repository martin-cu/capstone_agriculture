const dataformatter = require('../public/js/dataformatter.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
const cropCalendarModel = require('../models/cropCalendarModel.js');
const nutrientModel = require('../models/nutrientModel.js');
const workOrderModel = require('../models/workOrderModel.js');
var request = require('request');

exports.getCropCalendarTab = function(req, res) {
	cropCalendarModel.getCropCalendars({ status: ['In-Progress', 'Active'] }, function(err, list) {
		if (err)
			throw err;
		else {
			var list_obj = {
				land_prep: [],
				sowing: [],
				vegetation: [],
				reproductive: [],
				ripening: [],
				harvesting: []
			};

			list_obj.land_prep = list.filter(ele => ele.stage == 'Land Preparation');
			//console.log(list_obj.land_prep);
			list_obj.sowing = list.filter(ele => ele.stage == 'Sowing');
			list_obj.vegetation = list.filter(ele => ele.stage == 'Vegetation');
			list_obj.reproductive = list.filter(ele => ele.stage == 'Reproductive');
			list_obj.ripening = list.filter(ele => ele.stage == 'Ripening');
			list_obj.harvesting = list.filter(ele => ele.stage == 'Harvesting');

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

					var html_data = {};
					html_data = js.init_session(html_data, 'role', 'name', 'username', 'crop_calendar');
					html_data['calendar_list'] = list_obj;
					
					var list_obj_keys = ['land_prep', 'sowing', 'vegetation', 'reproductive', 'ripening', 'harvesting'];
					for (var i = 0; i < list_obj_keys.length; i++) {
						for (var x = 0; x < list_obj[list_obj_keys[i]].length; x++) {
							list_obj[list_obj_keys[i]][x].wo_list = list_obj[list_obj_keys[i]][x].wo_list.splice(0, 3);
						}
					}

					res.render('crop_calendar_tab', html_data);
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
			crop_calendar[0].land_prep_date = dataformatter.formatDate(new Date(crop_calendar[0].land_prep_date), 'mm DD, YYYY');
			crop_calendar[0].sowing_date = dataformatter.formatDate(new Date(crop_calendar[0].sowing_date), 'mm DD, YYYY');
			crop_calendar[0].harvest_date = dataformatter.formatDate(new Date(crop_calendar[0].harvest_date), 'mm DD, YYYY');

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
		workOrderModel.getWorkOrders(wo_query, function(err, wos){
			if(err)
				throw err;
			else{
				var i;
				for(i = 0; i < wos.length; i++){
					wos[i].date_start = dataformatter.formatDate(new Date(wos[i].date_start), 'mm DD, YYYY');
					if(wos[i].date_completed != null)
						wos[i].date_completed = dataformatter.formatDate(new Date(wos[i].date_completed), 'mm DD, YYYY');
					else
						wos[i].date_completed = "Not yet completed"
					
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
							fertilizers[i].date_completed = dataformatter.formatDate(new Date(fertilizers[i].date_completed), 'mm DD, YYYY');
						else
							fertilizers[i].date_completed = "Not yet completed"
						fertilizers[i].target_application_date = dataformatter.formatDate(new Date(fertilizers[i].target_application_date), 'mm DD, YYYY');
					}
				}

				var query = { farm_name: crop_calendar[0].farm_name };

				nutrientModel.getSoilRecord(query, function(err, soil_record) {
					if (err)
						throw err;
					else {
						//console.log(soil_record);
						
						if(soil_record[0].pH_lvl == null)
							soil_record[0].pH_lvl = "N/A";
						if(soil_record[0].p_lvl == null)
							soil_record[0].p_lvl = "N/AA";
						if(soil_record[0].k_lvl == null)
							soil_record[0].k_lvl = "N/AA";
						if(soil_record[0].n_lvl == null)
							soil_record[0].n_lvl = "N/A";
					}
					html_data["workorders"] = wos;
					html_data["soil_record"] = soil_record[0];
					html_data["fertilizer_wos"] = fertilizers;
					html_data["crop_plan_details"] = crop_calendar[0];
					res.render('detailed_crop_calendar', html_data); 
				});
			});
		});
		
	});
	
	
}