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
					var rainfall = disasters.filter(e => e.type == 'Heavy Rainfall');
					var drought = disasters.filter(e => e.type == 'Drought');
					


					console.log(rainfall);
					console.log('---------------');
					console.log(active_calendars);

					var rainfall_arr = [];
					var rainfall_obj, farm_obj;
					var mph;
					var risk_lvl, text_color, damages, damage_color;
					var dat, stage = null, maturity_days;
					var recommendation;
					for (var i = 0; i < rainfall.length; i++) {
						rainfall[i]['mph'] = Math.round(rainfall[i].wind_speed * 2.237 * 100)/100;
						rainfall[i]['classification'] = rainfall[i].mph < 38 ? 
						'Heavy Rain' : rainfall[i].mph < 73 ?
						'Tropical Depression' : rainfall[i].mph < 74 ?
						'Tropical Storm' : rainfall[i].mph < 111 ?
						'Hurricane' : rainfall[i].mph >= 111 ?
						'Major Hurricane' : 'Major Hurricane';
						rainfall[i].days = dateDiffInDays(new Date(), new Date(rainfall[i].target_date));
						rainfall[i].date_recorded = dataformatter.formatDate(new Date(rainfall[i].date_recorded), 'YYYY-MM-DD');
						rainfall[i].target_date = dataformatter.formatDate(new Date(rainfall[i].target_date), 'mm DD, YYYY');


						rainfall_obj = { details: rainfall[i], farms: [] };
						for (var x = 0; x < active_calendars.length; x++) {
							active_calendars[x].sowing_date = dataformatter.formatDate(new Date(active_calendars[x].sowing_date), 'YYYY-MM-DD');
							
							if (active_calendars[x].sow_date_completed != null) {
								active_calendars[x].sow_date_completed = dataformatter.formatDate(new Date(active_calendars[x].sow_date_completed), 'YYYY-MM-DD');
							}
							else {
								active_calendars[x].sow_date_completed = active_calendars[x].sowing_date;
							}

							dat = dateDiffInDays(new Date(active_calendars[x].sow_date_completed), new Date(rainfall[i].target_date));
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
								if (rainfall[i].mph < 38) {
									recommendation = 'Monitor fields closely and drain fields before, during, and after the target date.';
								}
								else {
									recommendation = 'N/A';
								}
							}
							else {
								if (rainfall[i].mph < 38) {
									recommendation = "Monitor fields closely and drain fields before, during, and after the target date. Early harvest up to owner's discretion.";
								}
								else {
									recommendation = 'Conduct early harvest before '+rainfaill[i].target_date;
								}
							}

							if (rainfall[i].classification == 'Heavy Rain') {
								if (stage == 'Harvesting') {
									damages = 'Low';
									risk_lvl = 'Low';
									text_color = 'text-dark';
									damage_color = 'text-dark'; 
								}
								else if (stage == 'Ripening') {
									damages = 'Medium';
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
									damages = 'High';
									risk_lvl = 'Medium';
									text_color = 'text-warning';
									damage_color = 'text-danger';									
								}
							}
							else if (rainfall[i].classification == 'Tropical Depression') {
								risk_lvl = 'Medium';
								text_color = 'text-danger';
								damages = 'Medium'
								damage_color = 'text-warning';
							}
							else if (rainfall[i].classification == 'Tropical Storm') {
								risk_lvl = 'High';
								text_color = 'text-danger';
								damages = 'High'
								damage_color = 'text-danger';
							}
							else if (rainfall[i].classification == 'Hurricane') {
								risk_lvl = 'High';
								text_color = 'text-danger';
								damages = 'Critical'
								damage_color = 'text-danger';
							}
							else if (rainfall[i].classification == 'Major Hurricane') {
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
						rainfall_arr.push(rainfall_obj);
					}
					//console.log(rainfall_arr);
					html_data['rainfall'] = rainfall_arr;
					res.render('disaster_warnings', html_data);					
				}
			});
		}
	});
}