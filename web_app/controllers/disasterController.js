var request = require('request');
const dataformatter = require('../public/js/dataformatter.js');
const weatherForecastModel = require('../models/weatherForecastModel.js');
const cropCalendarModel = require('../models/cropCalendarModel.js');
const farmModel = require('../models/farmModel.js');
const workOrderModel = require('../models/workOrderModel.js');
const disasterModel = require('../models/disasterModel.js');
const notifModel = require('../models/notificationModel.js');

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function prepareRainfallDisaster(rainfall, active_calendars) {
	var rainfall_obj = {};
	var stage = null, recommendation, damages, risk_lvl, text_color, damage_color;
	console.log(active_calendars);
	rainfall['mph'] = Math.round(rainfall.wind_speed * 2.237 * 100)/100;
	rainfall['classification'] = rainfall.mph < 38 ? 
	'Heavy Rain' : rainfall.mph < 73 ?
	'Tropical Depression' : rainfall.mph < 74 ?
	'Tropical Storm' : rainfall.mph < 111 ?
	'Hurricane' : rainfall.mph >= 111 ?
	'Major Hurricane' : 'Major Hurricane';
	rainfall.days = dateDiffInDays(new Date(), new Date(rainfall.target_date));
	rainfall.date_recorded = dataformatter.formatDate(new Date(rainfall.date_recorded), 'YYYY-MM-DD');
	rainfall.target_date = dataformatter.formatDate(new Date(rainfall.target_date), 'mm DD, YYYY');

	rainfall_obj = { details: rainfall, farms: [] };

	for (var x = 0; x < active_calendars.length; x++) {
		active_calendars[x].sowing_date = dataformatter.formatDate(new Date(active_calendars[x].sowing_date), 'YYYY-MM-DD');
		
		if (active_calendars[x].sow_date_completed != null) {
			active_calendars[x].sow_date_completed = dataformatter.formatDate(new Date(active_calendars[x].sow_date_completed), 'YYYY-MM-DD');
		}
		else {
			active_calendars[x].sow_date_completed = active_calendars[x].sowing_date;
		}

		dat = dateDiffInDays(new Date(active_calendars[x].sow_date_completed), new Date(rainfall.target_date));
		console.log('Dat: '+dat);

		maturity_days = active_calendars[x].maturity_days;

		if (stage == null) {
			if (dat > maturity_days && dat < (maturity_days + 35) ) {
				stage = 'Reproductive';
			}
			else if (dat >= (maturity_days + 35) && dat < (maturity_days + 65) ) {
				stage = 'Ripening';
			}
			else if (dat >= (maturity_days + 65) ) {
				stage = 'Harvesting';
			}
			else {
				stage = 'Vegetation';
			}
		}

		if (stage == 'Vegetation' || stage == 'Reproductive') {
			if (rainfall.mph < 38) {
				recommendation = 'Monitor fields closely and drain fields before, during, and after the target date.';
			}
			else {
				recommendation = 'N/A';
			}
		}
		else {
			if (rainfall.mph < 38) {
				recommendation = "Monitor fields closely and drain fields before, during, and after the target date. Early harvest up to owner's discretion.";
			}
			else {
				recommendation = 'Conduct early harvest before '+rainfaill.target_date;
			}
		}

		if (rainfall.classification == 'Heavy Rain') {
			if (stage == 'Harvesting') {
				damages = 'Low';
				risk_lvl = 'Low';
				text_color = 'text-dark';
				damage_color = 'text-dark'; 
			}
			else if (stage == 'Ripening') {
				damages = 'Low';
				risk_lvl = 'Low';
				text_color = 'text-dark';
				damage_color = 'text-warning';
			}
			else if (stage == 'Reproductive') {
				damages = 'Medium';
				risk_lvl = 'Medium';
				text_color = 'text-warning';
				damage_color = 'text-warning';
			}
			else {
				damages = 'Medium';
				risk_lvl = 'Medium';
				text_color = 'text-warning';
				damage_color = 'text-warning';									
			}
		}
		else if (rainfall.classification == 'Tropical Depression') {
			risk_lvl = 'Medium';
			text_color = 'text-danger';
			damages = 'Medium'
			damage_color = 'text-warning';
		}
		else if (rainfall.classification == 'Tropical Storm') {
			risk_lvl = 'High';
			text_color = 'text-danger';
			damages = 'High'
			damage_color = 'text-danger';
		}
		else if (rainfall.classification == 'Hurricane') {
			risk_lvl = 'High';
			text_color = 'text-danger';
			damages = 'Critical'
			damage_color = 'text-danger';
		}
		else if (rainfall.classification == 'Major Hurricane') {
			risk_lvl = 'High';
			text_color = 'text-danger';
			damages = 'Critical'
			damage_color = 'text-danger';
		}

		farm_obj = { farm_name: active_calendars[x].farm_name, seed_name: active_calendars[x].seed_name, 
			dat: dat, stage: stage, severity: { val: risk_lvl, color: text_color, 
				damage: damages, damage_color: damage_color }, recommendation: recommendation };

		stage = null;
		//console.log(farm_obj);
		rainfall_obj.farms.push(farm_obj);
	}
	return rainfall_obj;
}

exports.getDisasterManagement = function(req, res) {
	var html_data = {};

	disasterModel.getDisasterLogs(null, function(err, disasters) {
		if (err)
			throw err;
		else {
			cropCalendarModel.getCropCalendars({ status: ['In-Progress', 'Active']}, function(err, active_calendars) {
				if (err)
					throw err;
				else {
					var active_disasters = disasters.filter(e => e.status == 1), inactive_disasters = disasters.filter(e => e.status == 0);
					var active_rainfall = active_disasters.filter(e => e.type == 'Heavy Rainfall'), 
					inactive_rainfall = inactive_disasters.filter(e => e.type == 'Heavy Rainfall');
					var active_drought = active_disasters.filter(e => e.type == 'Drought'), 
					inactive_drought = inactive_disasters.filter(e => e.type == 'Drought');

					var active_rainfall_arr = [], inactive_rainfall_arr = [];
					var active_drought_arr = [], inactive_drought_arr = [];

					for (var i = 0; i < active_rainfall.length; i++) {
						active_rainfall_arr.push(prepareRainfallDisaster(active_rainfall[i], active_calendars));
					}
					for (var i = 0; i < inactive_rainfall.length; i++) {
						inactive_rainfall_arr.push(prepareRainfallDisaster(inactive_rainfall[i], active_calendars));
					}
					//console.log(rainfall_arr);
					html_data['active_rainfall'] = active_rainfall_arr;
					html_data['inactive_rainfall'] = inactive_rainfall_arr;

					html_data['active_drought'] = active_drought_arr;
					html_data['inactive_drought'] = inactive_drought_arr;
					
					res.render('disaster_warnings', html_data);					
				}
			});
		}
	});
}