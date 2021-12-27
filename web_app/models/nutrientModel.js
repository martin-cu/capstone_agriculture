var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.addSoilRecord = function(data, next) {
	var sql = "insert into soil_quality_table set ?";
	sql = mysql.format(sql, data);
	while (sql.includes("`calendar_id` = ''")) {
		sql = sql.replace("`calendar_id` = ''", '`calendar_id` = '+null);
	}
	mysql.query(sql, next);
};

exports.getSoilRecord = function(data, next) {
	var sql = "select sqt.*, cct.method, ft.land_type, ft.farm_name, ft.farm_area from soil_quality_table sqt left join crop_calendar_table cct using(calendar_id) right join farm_table ft on sqt.farm_id = ft.farm_id where ? order by date_taken desc, soil_quality_id desc";
	sql = mysql.format(sql, data);
	var obj_length = Object.keys(data).length;
	while (sql.includes("`farm_id`")) {
		sql = sql.replace("`farm_id`", 'ft.farm_id');
	}
	while (sql.includes("`farm_name`")) {
		sql = sql.replace("`farm_name`", 'ft.farm_name');
	}

	if (obj_length > 1) {
		var temp_sql = sql.split('WHERE');
		temp_sql[0] += ' WHERE ';
		temp_sql[1] = temp_sql[1].replace(',',' and ');
		sql = temp_sql[0]+temp_sql[1];
	} 
	//console.log(sql);
	mysql.query(sql, next);
};

exports.updateSoilRecord = function(update, filter, next) {
	var sql = "update soil_quality_table set ? where ?";
	sql = mysql.format(sql, update);
	sql = mysql.format(sql, filter);
	mysql.query(sql, next);
}

exports.updateNutrientPlan = function(update, filter, next) {
	var sql = "update fertilizer_recommendation_plan set ? where ?";
	sql = mysql.format(sql, update);
	sql = mysql.format(sql, filter);
	mysql.query(sql, next);
}

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
		sql = sql.replace("'false'", false);
	}

	while (sql.includes("`wo_id` = ''")) {
		sql = sql.replace("`wo_id` = ''", '`wo_id` = '+null);
	}
	//console.log(sql);
	mysql.query(sql, next);
}

exports.getMostActiveFRPlan = function(query, next) {
	var sql = "select * from ( select fr_plan_id, calendar_id, last_updated, farm_id, max(status) as status from ( select max(fr_plan_id) as fr_plan_id, max(calendar_id) as calendar_id, last_updated, (select farm_id from crop_calendar_table where calendar_id = frp.calendar_id) as farm_id, null as status from fertilizer_recommendation_plan frp group by farm_id union select null, calendar_id, null, farm_id, status from crop_calendar_table ) as t where ? group by t.calendar_id ) as t1 where fr_plan_id is not null "
	sql = mysql.format(sql, query);
	//console.log(sql);
	mysql.query(sql, next);
}

exports.deleteNutrientItems = function(query, next) {
	var sql = "delete from fertilizer_recommendation_items where ?"
	sql = mysql.format(sql, query);
	mysql.query(sql, next);
}

exports.getNutrientPlanDetails = function(data, next) {
	var sql = "select * from fertilizer_recommendation_plan where ? order by last_updated desc, fr_plan_id desc";
	sql = mysql.format(sql, data);
	//console.log(sql);
	mysql.query(sql, next);
}

exports.getNutrientPlanItems = function(data, next) {
	var sql = "select ft.fertilizer_name, frp.calendar_id, frp.last_updated, fri.* from fertilizer_recommendation_items fri join fertilizer_table ft using (fertilizer_id) join fertilizer_recommendation_plan frp using (fr_plan_id) where ? order by target_application_date asc";
	sql = mysql.format(sql, data);
	console.log(sql);
	mysql.query(sql, next);
}

exports.getNutrientPlanItemsCompleted = function(data, next) {
	var sql = "select ft.fertilizer_name, frp.calendar_id, frp.last_updated, fri.*, wot.date_completed, wot.status from fertilizer_recommendation_items fri join fertilizer_table ft using (fertilizer_id) join fertilizer_recommendation_plan frp using (fr_plan_id) left join work_order_table wot ON wot.work_order_id = fri.wo_id where ? order by target_application_date asc";
	sql = mysql.format(sql, data);
	// console.log(sql);
	mysql.query(sql, next);
}