var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.saveForecastResults = function(data, next) {
	var sql = "insert into weather_forecast_table set ?;";
	for (var i = 0; i < data.length; i++) {
		if (i != 0) {
			sql += "insert into weather_forecast_table set ?;";
		}
		sql = mysql.format(sql, data[i]);
	}
	mysql.query(sql, next);
}

exports.readWeatherForecast = function(next) {
	var sql = 'select * from weather_forecast_table';
	mysql.query(sql, next);
}

exports.clearRecords = function(next) {
	var sql = 'delete from weather_forecast_table;';
	mysql.query(sql, next);
}