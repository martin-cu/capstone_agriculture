var mysql = require('./connectionModel');
mysql = mysql.connection;

//Crop Cycle
exports.createCycle = function(data, next) {
	var sql = "insert into crop_cycle_table (start_date, end_date, seed_planted) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.readCropCycle = function(next) {
	var sql = "select cct.*, st.* from crop_cycle_table cct join seed_table st on cct.seed_planted = st.seed_id order by cycle_id order desc";
	mysql.query(sql, next);
}

//Crop Calendar
exports.createCropCalendar = function(data, next) {
	var sql = "insert into crop_calendar_table set ? ;";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};


exports.getCropCalendars = function(query, next) {
	var filter;

	var sql = "select cct.*, ft.farm_name, ft.land_type, st.seed_name from crop_calendar_table cct join farm_table ft on cct.farm_id = ft.farm_id join seed_table st on cct.seed_planted = st.seed_id ";

	for (var i = 0; i < query.status.length; i++) {
		if (i == 0) {
			sql += 'where ';
			sql += 'cct.status = "'+query.status[i]+'"';
		}
		else {
			sql += ' or cct.status = "'+query.status[i]+'"';
		}

	}
	sql += ' order by cct.harvest_date desc, cct.calendar_id desc';
	mysql.query(sql, next);
}