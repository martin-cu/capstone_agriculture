var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.addSoilRecord = function(data, next) {
	var sql = "insert into soil_quality_table set ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.getSoilRecord = function(data, next) {
	var sql = "select ft.farm_name, ft.farm_area, ft.land_type, sqt.* from farm_table ft join soil_quality_table sqt on ft.farm_id = sqt.farm_id where ? order by date_taken desc";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};