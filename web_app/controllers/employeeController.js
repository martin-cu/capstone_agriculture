const employeeModel = require('../models/employeeModel');

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