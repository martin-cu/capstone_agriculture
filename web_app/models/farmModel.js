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
