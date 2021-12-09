const dataformatter = require('../public/js/dataformatter.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
const cropCalendarModel = require('../models/cropCalendarModel.js');
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
			console.log(list_obj.land_prep);
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
					
					res.render('crop_calendar_tab', html_data);
				}
			});
		}
	});
}

exports.ajaxCreateCropPlan = function(req, res) {
	console.log(req.body);
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
	res.render('detailed_crop_calendar', html_data); 
}