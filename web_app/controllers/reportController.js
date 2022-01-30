const dataformatter = require('../public/js/dataformatter.js');
const reportModel = require('../models/reportModel.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');

exports.getDetailedReport = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'reports');

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
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'reports');
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
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'reports');

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

exports.getDetailedHarvestReport = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'reports');

	res.render('detailed_harvest_report', html_data);
}
