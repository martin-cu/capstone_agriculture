const employeeModel = require('../models/employeeModel');
const js = require('../public/js/session.js');

exports.ajaxEmployees = function(req, res) {
	var query = req.query;

	employeeModel.queryEmployee(query, function(err, list) {
		if (err)
			throw err;
		else {
			res.send({ employee_list: list, success: true });
		}
	});

}

exports.ajaxFilterFarmers = function(req, res) {
	var query = req.query;
	employeeModel.filterFarmers(query, function(err, farmers) {
		if (err)
			throw err;
		else {
			res.send(farmers);
		}
	})
}

exports.getUsers = function(req, res) {
	var html_data = {};
	html_data["title"] = "User Management";
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'user_management');
	html_data["notifs"] = req.notifs;
	res.render('user_management', html_data);
}