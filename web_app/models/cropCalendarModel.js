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
	var sql = "insert into crop_calendar_table (farm_id, cycle_id, land_prep_date, sowing_date, harvest_date, planting_method, seed_panted, status) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};


exports.getActiveCropCalendars = function(query, next) {
	var filter;
	if (!query) {
		filter = '%';
	}
	else {
		filter = query;
	}
	var sql = "select * from crop_calendar_table where status = ? order by harvest_date desc";
	sql = mysql.format(sql, query);
	mysql.query(sql, next);
}