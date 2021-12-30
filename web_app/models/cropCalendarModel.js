var mysql = require('./connectionModel');
mysql = mysql.connection;

//Crop Cycle
exports.createCycle = function(data, next) {
	var sql = "insert into crop_cycle_table (start_date, end_date, seed_planted) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.readCropCalendar = function(query, next) {
	var sql = "select * from crop_calendar_table join seed_table on seed_planted = seed_id where ?";
	sql = mysql.format(sql, query);
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
	//var sql = "select t.*, case when max(t.lp_type) is not null then case when max(sow_date_completed) is null then 'Sowing' when datediff(now(), max(sow_date_completed)) < maturity_days then 'Vegetation' when datediff(now(), max(sow_date_completed)) >= maturity_days && datediff(now(), max(sow_date_completed)) < (maturity_days+35) then 'Reproductive' when datediff(now(), max(sow_date_completed)) >= (maturity_days+35) && datediff(now(), max(sow_date_completed)) < (maturity_days+65) then 'Ripening' when datediff(now(), max(sow_date_completed)) >= (maturity_days+65) then 'Harvesting' end else 'Land Preparation' end as stage from ( select cct.*, ft.farm_name, ft.land_type, st.seed_name, st.maturity_days, null as sow_type, null as sow_date_completed, null as lp_type, null as lp_date_completed from crop_calendar_table cct join farm_table ft on cct.farm_id = ft.farm_id join seed_table st on cct.seed_planted = st.seed_id ";
	var sql = "select * from ( SELECT max(calendar_id) as calendar_id, max(farm_id) as farm_id, max(land_prep_date) as land_prep_date, max(sowing_date) as sowing_date, max(harvest_date) as harvest_date, max(planting_method) as planting_method, max(seed_planted) as seed_planted, max(status) as status, max(seed_rate) as seed_rate, max(harvest_yield) as harvest_yield, max(crop_plan) as crop_plan, max(method) as method, max(farm_name) as farm_name, max(land_type) as land_type, max(seed_name) as seed_name, max(maturity_days) as maturity_days, max(sow_type) as sow_type, max(sow_date_completed) as sow_date_completed, max(lp_type) as lp_type, max(lp_date_completed) as lp_date_completed, CASE WHEN MAX(t.lp_type) IS NOT NULL THEN CASE WHEN MAX(sow_date_completed) IS NULL THEN 'Sowing' WHEN DATEDIFF(NOW(), MAX(sow_date_completed)) < maturity_days THEN 'Vegetation' WHEN DATEDIFF(NOW(), MAX(sow_date_completed)) >= maturity_days && DATEDIFF(NOW(), MAX(sow_date_completed)) < (maturity_days + 35) THEN 'Reproductive' WHEN DATEDIFF(NOW(), MAX(sow_date_completed)) >= (maturity_days + 35) && DATEDIFF(NOW(), MAX(sow_date_completed)) < (maturity_days + 65) THEN 'Ripening' WHEN DATEDIFF(NOW(), MAX(sow_date_completed)) >= (maturity_days + 65) THEN 'Harvesting' ELSE 'Sowing' END ELSE 'Land Preparation' END AS stage FROM (SELECT cct.*, ft.farm_name, ft.land_type, st.seed_name, st.maturity_days, NULL AS sow_type, NULL AS sow_date_completed, NULL AS lp_type, NULL AS lp_date_completed FROM crop_calendar_table cct JOIN farm_table ft ON cct.farm_id = ft.farm_id JOIN seed_table st ON cct.seed_planted = st.seed_id";
	for (var i = 0; i < query.status.length; i++) {
		if (i == 0) {
			sql += ' where ';
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
	//sql += " union select crop_calendar_id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, type, date_completed,null, null from work_order_table where type = 'Sow Seed' and status = 'Completed' union select crop_calendar_id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,type, date_completed from work_order_table where type = 'Land Preparation' and status = 'Completed' ) as t where farm_id is not null group by calendar_id order by farm_id";
	sql += " UNION select t1.crop_calendar_id, farm_id, land_prep_date, sowing_date, harvest_date, planting_method, seed_planted, status, seed_rate, harvest_yield, crop_plan, method, farm_name, land_type, seed_name, maturity_days, max(type) as sow_type, max(date_completed) as sow_date_completed, max(lp_type) as lp_type, max(lp_date) as lp_date from ( SELECT crop_calendar_id, NULL as farm_id, NULL as land_prep_date, NULL as sowing_date, NULL as harvest_date, NULL as planting_method, NULL as seed_planted, NULL as status, NULL as seed_rate, NULL as harvest_yield, NULL as crop_plan, NULL as method, NULL as farm_name, NULL as land_type, NULL as seed_name, 1 as maturity_days, type , date_completed, NULL as lp_type, NULL as lp_date FROM work_order_table WHERE type = 'Sow Seed' AND status = 'Completed' UNION SELECT crop_calendar_id, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, type, date_completed FROM work_order_table WHERE type = 'Land Preparation' AND status = 'Completed') as t1 group by crop_calendar_id ) AS t GROUP BY calendar_id ORDER BY farm_id ) as t_final where farm_id is not null";
	//console.log(sql);
	//  console.log(sql);
	mysql.query(sql, next);
	return sql;
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

exports.getCropCalendarByID = function(query, id, next){
	var sql = "SELECT * FROM (" + this.getCropCalendars(query) + ") a WHERE calendar_id = ? ORDER BY land_prep_date DESC";
	sql = mysql.format(sql, id);
	// console.log(sql);
	mysql.query(sql, next);
}