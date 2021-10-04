var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.addFarm = function(data, next) {
	var sql = "insert into farm_table (farm_name, farm_desc, farm_area, land_type) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.addFarmPlot = function(data, next) {
	var sql = "insert into farm_plots (farm_id, x_coord, y_coord) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.getFarmData = function(data, next) {
	var sql;

	if (!data) {
		sql = "select ft.*, concat(et.first_name, ' ', et.last_name) as manager, et.employee_id as manager_id from farm_table ft join employee_table et on ft.farm_id = et.assigned_farm where et.position = 'Farm Manager'";
	}
	else {
		sql = "select ft.*, concat(et.first_name, ' ', et.last_name) as manager, et.employee_id as manager_id from farm_table ft join employee_table et on ft.farm_id = et.assigned_farm where et.position = 'Farm Manager' and ?";
		sql = mysql.format(sql, data);
	}
	mysql.query(sql, next);
};

exports.getPlotData = function(data, next) {
	var sql;

	if (!data) {
		sql = "select * from farm_plots";
	}
	else {
		sql = "select * from farm_plots where ?";
		sql = mysql.format(sql, data);
	}
	mysql.query(sql, next);
}