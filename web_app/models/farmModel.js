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
	while (sql.includes("'")) {
		sql = sql.replace("'", '');
	}
	while (sql.includes("\\")) {
		sql = sql.replace("\\", '');
	}
	mysql.query(sql, next);
}

exports.filteredFarmDetails = function(data, next) {
	var sql = 'select * from farm_table where ?';
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
}

exports.getFarmData = function(data, next) {
	var sql = 'select ft.*, et.* from farm_table ft join farm_assignment fa on ft.farm_id = fa.farm_id join employee_table et on fa.employee_id = et.employee_id';
	if (JSON.stringify(data) != '{ }') {
		if (data.hasOwnProperty('where') && data.where != null) {
			sql += ' where '+data.where.key+' = ?';
			sql = mysql.format(sql, data.where.value);
		}

		if (data.hasOwnProperty('group')) {
			sql += ' group by '+data.group;
		
		}
	}
	mysql.query(sql, next);
};

exports.getAllFarms = function(next) {
	var sql = 'select t1.farm_id, t1.farm_name, t1.land_type, max(t1.employee_id) as employee_id, concat(max(t1.ln), ", ", max(t1.fn)) as employee_name, max(t1.cp) as cp from (select t.farm_id, t.employee_id, max(t.farm_name) as farm_name, max(t.land_type) as land_type, null as ln, null as fn, null as cp from (select farm_id, employee_id, null as farm_name, null as land_type from farm_assignment where status = "Active" union select farm_id, null, farm_name, land_type from farm_table where status = "Active") as t group by t.farm_id union select fa.farm_id, et.employee_id, null as farm_name, null as land_type, et.last_name, et.first_name, et.phone_number from employee_table et join farm_assignment fa on et.employee_id = fa.employee_id where et.position = "Farm Manager" )as t1 group by farm_id';
	mysql.query(sql, next);
}

exports.updateFarm = function(data, filter, next) {
	var sql = 'update farm_table set ? where ?';
	sql = mysql.format(sql, data);
	sql = mysql.format(sql, filter);
	mysql.query(sql, next);
}

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