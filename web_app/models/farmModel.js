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
	var sql = 'SELECT * FROM (SELECT ft.*, a.last_name, a.first_name, a.phone_number, a.position FROM farm_table ft INNER JOIN (SELECT et.*, fa.farm_id FROM farm_assignment fa INNER JOIN employee_table et ON et.employee_id = fa.employee_id) a ON ft.farm_id = a.farm_id) a WHERE position = "Farm Manager" &&  ?';
	sql = mysql.format(sql, data);
	console.log(sql);
	mysql.query(sql, next);
}

exports.getFarmData = function(data, next) {
	//var sql = 'select ft.*, et.* from farm_table ft join farm_assignment fa on ft.farm_id = fa.farm_id join employee_table et on fa.employee_id = et.employee_id';
	var sql = 'select * from( select ft.*, et.* from farm_table ft join farm_assignment fa on ft.farm_id = fa.farm_id join employee_table et on fa.employee_id = et.employee_id union select *, null, null, null, null, null from farm_table ) as t1 ';
	if (JSON.stringify(data) != '{ }') {
		if (data.hasOwnProperty('where') && data.where != null) {
			if (data.where.hasOwnProperty('key') && data.where.key != null) {
				if (data.where.type != 'Data validation') {
					sql += ' where '+data.where.key+' = ?';
					sql = mysql.format(sql, data.where.value);
				}
				else {
					sql += ' where '+data.where.key+' '+data.where.value;
				}
			}
			else {
				sql += ' where '+data.where;
			}
		}

		if (data.hasOwnProperty('group')) {
			sql += ' group by '+data.group;
		
		}
	}
	
	mysql.query(sql, next);
};

//added farm_desc
exports.getAllFarms = function(next) {
	var sql = "SELECT t1.farm_id, t1.farm_name, t1.farm_desc, t1.land_type, MAX(t1.employee_id) AS employee_id, CONCAT(MAX(t1.ln), ', ', MAX(t1.fn)) AS employee_name, MAX(t1.cp) AS cp FROM (SELECT  t.farm_id, t.employee_id, MAX(t.farm_name) AS farm_name, MAX(t.land_type) AS land_type, NULL AS ln,  NULL AS fn,  NULL AS cp, MAX(t.farm_desc) AS farm_desc FROM (SELECT   farm_id, employee_id, NULL AS farm_name, NULL AS land_type, NULL AS farm_desc FROM farm_assignment WHERE status = 'Active' UNION SELECT  farm_id, NULL, farm_name, land_type, farm_desc FROM farm_table WHERE status = 'Active') AS t GROUP BY t.farm_id  UNION SELECT fa.farm_id,et.employee_id, NULL AS farm_name, NULL AS land_type, et.last_name, et.first_name,et.phone_number, NULL AS farm_desc FROM employee_table et JOIN farm_assignment fa ON et.employee_id = fa.employee_id WHERE et.position = 'Farm Manager') AS t1 GROUP BY farm_id;"; 
	mysql.query(sql, next);
}

// exports.getAllFarms = function(next) {
// 	var sql = 'select t1.farm_id, t1.farm_name, t1.land_type, max(t1.employee_id) as employee_id, concat(max(t1.ln), ", ", max(t1.fn)) as employee_name, max(t1.cp) as cp from (select t.farm_id, t.employee_id, max(t.farm_name) as farm_name, max(t.land_type) as land_type, null as ln, null as fn, null as cp from (select farm_id, employee_id, null as farm_name, null as land_type from farm_assignment where status = "Active" union select farm_id, null, farm_name, land_type from farm_table where status = "Active") as t group by t.farm_id union select fa.farm_id, et.employee_id, null as farm_name, null as land_type, et.last_name, et.first_name, et.phone_number from employee_table et join farm_assignment fa on et.employee_id = fa.employee_id where et.position = "Farm Manager" )as t1 group by farm_id';
// 	mysql.query(sql, next);
// }

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


exports.getFarmerQueries = function(farm_id, employee_id, next){
	var sql = "SELECT * FROM farmer_queries fq INNER JOIN employee_table et ON et.employee_id = fq.employee_id INNER JOIN farm_assignment fa ON fa.employee_id = fq.employee_id";

	if(farm_id != null){
		sql = sql + " WHERE farm_id = ?";
		sql = mysql.format(sql, farm_id);
	}
	else if(employee_id != null){
		sql = sql + ' fa.employee_id = ?';
		sql = mysql.format(sql, employee_id);
	}

	mysql.query(sql, next);
}