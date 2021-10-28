const dataformatter = require('../public/js/dataformatter.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
const cropCalendarModel = require('../models/cropCalendarModel.js');
var request = require('request');

exports.ajaxCreateCropPlan = function(req, res) {
	var query = {
		farm_id: req.body.farm_id,
		land_prep_date: req.body.land_prep_date,
		sowing_date: req.body.sowing_date,
		planting_method: req.body.planting_method,
		seed_planted: req.body.seed_id,
		status: 'In-Progress',
		seed_rate: req.body.seed_rate,
		crop_plan: req.body.crop_plan
	};
	cropCalendarModel.createCropCalendar(query, function(err, plan) {
		if (err)
			throw err;
		else {
			console.log(plan);
			res.send({ });
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