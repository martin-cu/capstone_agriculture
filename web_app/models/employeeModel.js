var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.addEmployee = function(data, next) {
	var sql = "insert into employee_table (position, last_name, first_name, phone_number) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.registerUser = function(data, next) {
	var sql = "insert into user_table (employee_id, username, password, access_level) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.queryEmployee = function(type, data, next) {
	var sql;

	if (type == "queryUnregisteredUser") {
		sql = "select et.* from employee_table et left join user_table ut on et.employee_id = ut.employee_id where ut.employee_id is null";
	}
	else if (type == "singleEmployeeID") {
		sql = "select * from employee_table where employee_id = ?";
	}
	else if (type == "singleUser") {
		sql = "select ut.user_id, ut.employee_id, et.last_name, et.first_name, ut.username, ut.password, et.position, et.assigned_form, et.phone_number, ut.access_level from employee_table et join user_table ut on et.employee_id = ut.employee_id where et.employee = ?";
	}
	else if (type == "filterByFarm") {
		sql = "select * from employee_table where assigned_farm = ?";
	}
	else if (type == "allEmployees") {
		sql = "select * from employee_table";
	}
	else if (type == "allUsers") {
		var sql = "select ut.user_id, ut.employee_id, et.last_name, et.first_name, ut.username, ut.password, et.position, et.assigned_form, et.phone_number, ut.access_level from employee_table et join user_table ut on et.employee_id = ut.employee_id";
	}

	if (!data) {
		sql = mysql.format(sql, data);
	}
	mysql.query(sql, next);
}

