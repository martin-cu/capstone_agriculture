var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.addFarm = function(data, next) {
	var sql = "insert into farm_table set ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.addFarmPlot = function(data, next) {
	var sql = "insert into farm_plots (farm_id, x_coord, y_coord) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.addAssignedFarmers = function(data, next) {
	var sql = "insert into farm_assignment (employee_id, farm_id, status) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
}

exports.getFarmData = function(data, next) {
	var sql = 'select ft.*, et.* from farm_table ft join farm_assignment fa on ft.farm_id = fa.farm_id join employee_table et on fa.employee_id = et.employee_id where ?';
	sql = mysql.format(sql, data);
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