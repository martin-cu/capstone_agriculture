var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.addSoilRecord = function(data, next) {
	var sql = "insert into soil_quality_table set ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.getSoilRecord = function(data, next) {
	var sql = "select * from ( select t.method, t.farm_name, t.farm_area, t.land_type, max(t.soil_quality_id) as soil_quality_id, max(t.farm_id) as farm_id, max(t.pH_lvl) as pH_lvl, max(t.p_lvl) as p_lvl, max(t.k_lvl) as k_lvl, max(t.n_lvl) as n_lvl from (select cct.method, ft.farm_name, ft.farm_area, ft.land_type, null as soil_quality_id, farm_id, null as pH_lvl, null as p_lvl, null as k_lvl, null as n_lvl, null as date_taken from farm_table ft left join crop_calendar_table as cct using(farm_id) union select null, null, null, null, sqt.* from soil_quality_table sqt ) as t group by t.farm_id order by date_taken desc ) as t1 where ?";
	sql = mysql.format(sql, data);
	console.log(sql);
	mysql.query(sql, next);
};