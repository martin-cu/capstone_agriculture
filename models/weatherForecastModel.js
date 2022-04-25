var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.getWeatherData = function(next) {
	var sql = `select year(date) year, month(date) year, round(sum(precipitation_mean),2) precip from weather_data_table group by year(date), month(date)`;
	mysql.query(sql, next);
}

exports.lastWeatherData = function(next) {
	var sql = `SELECT * FROM weather_data_table order by date desc limit 1`;
	mysql.query(sql, next);
}

exports.saveWeatherData = function(data, next) {
	var sql = `insert into weather_data_table (date, temp_mean, temp_min, temp_max, pressure_mean, humidity_mean, precipitation_mean) values `;
	data.forEach(function(item, index) {
		if (index != 0)
			sql += `, `;

		sql += ' (?, ?, ?, ?, ?, ?, ?)';
		sql = mysql.format(sql, item.date);
		sql = mysql.format(sql, item.temp_mean);
		sql = mysql.format(sql, item.temp_min);
		sql = mysql.format(sql, item.temp_max);
		sql = mysql.format(sql, item.pressure_mean);
		sql = mysql.format(sql, item.humidity_mean);
		sql = mysql.format(sql, item.precipitation_mean);
	});
	mysql.query(sql, next);
}

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