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

//New sql with calendar stage based on seed maturity days
// stages : Land Prepation / Sowing / Vegetation / Reproductive / Ripening / Harvesting
exports.getCropCalendars = function(query, next) {
	var filter;

	//var sql = "select t.*, case when max(t.type) = 'Sow Seed' then case when max(t.date_completed) is null then 'Sowing' when datediff(now(), max(t.date_completed)) < maturity_days then 'Vegetation' when datediff(now(), max(t.date_completed)) >= maturity_days && datediff(now(), max(t.date_completed)) < (maturity_days+35) then 'Reproductive' when datediff(now(), max(t.date_completed)) >= (maturity_days+35) && datediff(now(), max(t.date_completed)) < (maturity_days+65) then 'Ripening' when datediff(now(), max(t.date_completed)) >= (maturity_days+65) then 'Harvesting' end else 'Land Preparation' end as stage from ( select cct.*, ft.farm_name, ft.land_type, st.seed_name, st.maturity_days, null as type, null as date_completed from crop_calendar_table cct join farm_table ft on cct.farm_id = ft.farm_id join seed_table st on cct.seed_planted = st.seed_id ";
	var sql = "select t.*, case when max(t.lp_type) is not null then case when max(sow_date_completed) is null then 'Sowing' when datediff(now(), max(sow_date_completed)) < maturity_days then 'Vegetation' when datediff(now(), max(sow_date_completed)) >= maturity_days && datediff(now(), max(sow_date_completed)) < (maturity_days+35) then 'Reproductive' when datediff(now(), max(sow_date_completed)) >= (maturity_days+35) && datediff(now(), max(sow_date_completed)) < (maturity_days+65) then 'Ripening' when datediff(now(), max(sow_date_completed)) >= (maturity_days+65) then 'Harvesting' end else 'Land Preparation' end as stage from ( select cct.*, ft.farm_name, ft.land_type, st.seed_name, st.maturity_days, null as sow_type, null as sow_date_completed, null as lp_type, null as lp_date_completed from crop_calendar_table cct join farm_table ft on cct.farm_id = ft.farm_id join seed_table st on cct.seed_planted = st.seed_id ";
	for (var i = 0; i < query.status.length; i++) {
		if (i == 0) {
			sql += 'where ';
			sql += 'cct.status = "'+query.status[i]+'"';
		}
		else {
			sql += ' or cct.status = "'+query.status[i]+'"';
		}

	}

	if (query.where != null || query.where != undefined) {
		sql += ' and '+query.where.key +' = ?';
		sql = mysql.format(sql, query.where.val);
	}
	//sql += " union select crop_calendar_id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, type, date_completed from work_order_table where type = 'Sow Seed' ) as t group by calendar_id";
	sql += " union select crop_calendar_id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, type, date_completed,null, null from work_order_table where type = 'Sow Seed' and status = 'Completed' union select crop_calendar_id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,type, date_completed from work_order_table where type = 'Land Preparation' and status = 'Completed' ) as t group by calendar_id order by farm_id";
	console.log(sql);
	mysql.query(sql, next);
}

exports.getCurrentCropCalendar = function(query, next) {
	var sql = "select cct.calendar_id from farm_table as ft join crop_calendar_table as cct using (farm_id) where ? and cct.status = 'In-Progress' or cct.status = 'Active'";
	sql = mysql.format(sql, query);
	mysql.query(sql, next);
}

exports.updateCropCalendar = function(query, filter, next) {
	var sql = "update crop_calendar_table set ? where ?"
	sql = mysql.format(sql, query);
	sql = mysql.format(sql, filter);
	mysql.query(sql, next);
}