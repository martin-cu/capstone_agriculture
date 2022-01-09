const dataformatter = require('../public/js/dataformatter.js');
const reportModel = require('../models/reportModel.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');

exports.getDetailedReport = function(req, res) {
	res.render('detailed_farm_report', {});
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
					html_data['farm_productivity'] = analyzer.calculateProductivity(fp_overview, input_resources);
					console.log('----------------------');
					//console.log(input_resources);
					res.render('farm_productivity_report', html_data);
				}
			});
		}
	});
}
