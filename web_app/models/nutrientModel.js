var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.addSoilRecord = function(data, next) {
	var sql = "insert into soil_quality_table set ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.getSoilRecord = function(data, next) {
	var sql = "SELECT * FROM (SELECT t.method, t.farm_name, t.farm_area, t.land_type, max(t.date_taken) as date_taken, MAX(t.calendar_id) AS calendar_id, MAX(t.soil_quality_id) AS soil_quality_id, MAX(t.farm_id) AS farm_id, MAX(t.pH_lvl) AS pH_lvl, MAX(t.p_lvl) AS p_lvl, MAX(t.k_lvl) AS k_lvl, MAX(t.n_lvl) AS n_lvl FROM (SELECT cct.method, ft.farm_name, ft.farm_area, ft.land_type, NULL AS soil_quality_id, farm_id, NULL AS pH_lvl, NULL AS p_lvl, NULL AS k_lvl, NULL AS n_lvl, NULL AS date_taken, NULL AS calendar_id FROM farm_table ft LEFT JOIN crop_calendar_table AS cct USING (farm_id) UNION SELECT NULL, NULL, NULL, NULL, sqt.* FROM soil_quality_table sqt) AS t GROUP BY t.farm_id ORDER BY date_taken DESC) AS t1 WHERE ?";
	sql = mysql.format(sql, data);
	var obj_length = Object.keys(data).length;
	if (obj_length > 1) {
		var temp_sql = sql.split('WHERE');
		temp_sql[0] += ' WHERE ';
		temp_sql[1] = temp_sql[1].replace(',',' and ');
		sql = temp_sql[0]+temp_sql[1];
	} 
	//console.log(sql);
	mysql.query(sql, next);
};

exports.createNutrientPlan = function(data, next) {
	var sql = "insert into fertilizer_recommendation_plan set ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
}

exports.createNutrientItem = function(data, next) {
	var sql = "insert into fertilizer_recommendation_items set ?";
	sql = mysql.format(sql, data);
	
	while (sql.includes("'true'")) {
		sql = sql.replace("'true'", true);
	}

	while (sql.includes("'false'")) {
		sql = sql.replace("'false'", true);
	}

	while (sql.includes("'null'")) {
		sql = sql.replace("'null'", null);
	}
	//console.log(sql);
	mysql.query(sql, next);
}

exports.getNutrientPlanDetails = function(data, next) {
	var sql = "select * from fertilizer_recommendation_plan where ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
}

exports.getNutrientPlanItems = function(data, next) {
	var sql = "select frp.calendar_id, frp.last_updated, fri.* from fertilizer_recommendation_items fri join fertilizer_recommendation_plan frp using (fr_plan_id) where ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
}
