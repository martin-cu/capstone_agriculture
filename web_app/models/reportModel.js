var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.getPDOccurence = function(data, next) {
	var sql = "select *, case when type = 'Pest' then (select pest_name from pest_table where pest_id = pd_id) else (select disease_name from disease_table where disease_id = pd_id) end as pd_name, case when type = 'Pest' then (select pest_desc from pest_table where pest_id = pd_id) else (select disease_desc from disease_table where disease_id = pd_id) end as pd_desc, case when type = 'Pest' then (select scientific_name from pest_table where pest_id = pd_id) else (select scientific_name from disease_table where disease_id = pd_id) end as scientific_name from diagnosis where ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
}

exports.getNutrientChart = function(data1, data2, next) {
	var sql = "select * from ( SELECT 'Applied' as application_type, case when fertilizer_name = 'Fertilizer 16-20-0' then 'P' when fertilizer_name = 'Potash 0-0-60' then 'K' when fertilizer_name = 'Urea 46-0-0' then 'N' end as nutrient_type, wot.date_completed, wrt.qty, ft.fertilizer_name, N, P, K FROM work_order_table wot JOIN wo_resources_table wrt USING (work_order_id) JOIN fertilizer_table ft ON wrt.item_id = ft.fertilizer_id WHERE ? AND wot.type = 'Fertilizer Application' union SELECT 'Applied', case when fertilizer_name = 'Fertilizer 16-20-0' then 'N' when fertilizer_name = 'Potash 0-0-60' then 'K' when fertilizer_name = 'Urea 46-0-0' then 'N' end as type, wot.date_completed, wrt.qty, ft.fertilizer_name, N, P, K FROM work_order_table wot JOIN wo_resources_table wrt USING (work_order_id) JOIN fertilizer_table ft ON wrt.item_id = ft.fertilizer_id WHERE ? AND wot.type = 'Fertilizer Application' and fertilizer_name = 'Fertilizer 16-20-0' union SELECT 'Recommended', CASE WHEN fertilizer_name = 'Fertilizer 16-20-0' THEN 'P' WHEN fertilizer_name = 'Potash 0-0-60' THEN 'K' WHEN fertilizer_name = 'Urea 46-0-0' THEN 'N' END AS nutrient_type, fri.target_application_date, fri.amount, ft.fertilizer_name, N, P, K FROM fertilizer_recommendation_plan frp JOIN fertilizer_recommendation_items fri USING (fr_plan_id) JOIN fertilizer_table ft USING (fertilizer_id) WHERE ? ) as t group by application_type, date_completed, nutrient_type";
	sql = mysql.format(sql, data1);
	sql = mysql.format(sql, data1);
	sql = mysql.format(sql, data2);
	mysql.query(sql, next);
}

exports.getSeedChart = function(farm,data, next) {
	var sql = "select * from crop_calendar_table join seed_table on seed_id = seed_planted join farm_table ft using(farm_id) where ? and harvest_date > ? order by harvest_date asc, calendar_id asc";
	sql = mysql.format(sql, farm);
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
}

exports.getFarmProductivity = function(next) {
	var sql = "select *, max(prev_calendar) as max_prev_calendar, max(previous_yield) as max_previous_yield from ( select st.seed_name, ft.farm_area, fy.forecast_yield_id, cct.calendar_id, null as prev_calendar, cct.status, ft.farm_id, ft.farm_name, cct.crop_plan, fy.forecast as forecast_yield, cct.harvest_yield as current_yield, null as previous_yield from crop_calendar_table cct left join crop_calendar_table as cct1 on (cct.farm_id = cct1.farm_id and cct.harvest_date < cct1.harvest_date) join seed_table st on cct.seed_planted = st.seed_id join forecasted_yield fy on (cct.calendar_id = fy.calendar_id and cct.seed_planted = fy.seed_id) join farm_table ft on cct.farm_id = ft.farm_id where cct1.harvest_date is null union select null, null, null, null, t1.calendar_id, null, t1.farm_id, null, null, null, null, t1.harvest_yield from ( select *, @rn := if(@prev = farm_id, @rn + 1, 1) as rn, @prev := farm_id from crop_calendar_table join (select @prev := null, @rn := 0) as vars order by farm_id, harvest_date desc ) as t1 where rn = 2 ) as t2 group by t2.farm_id ";
	//console.log(sql);

	mysql.query(sql, next);
};

exports.getCalendarList = function(data, next) {
	var sql = "select * from ( SELECT *, @rn:=IF(@prev = farm_id, @rn + 1, 1) AS rn, @prev:=farm_id FROM crop_calendar_table JOIN (SELECT @prev:=NULL, @rn:=0) AS vars where status = 'Completed' ORDER BY farm_id , harvest_date DESC ) as t where ";
	if (data == 'new') {
		sql += 'rn = 1';
	}
	else {
		sql += 'rn != 1';
	}
	mysql.query(sql, next);
}

exports.getInputResourcesUsed = function(data, next) {
	var sql = "select cct.calendar_id, wort.item_id, wort.type, sum(wort.qty) as qty, t2.price, sum(wort.qty) * t2.price as total_cost, case when wort.type = 'Fertilizer' then (select fertilizer_name from fertilizer_table where fertilizer_id = wort.item_id) when wort.type = 'Pesticide' then (select pesticide_name from pesticide_table where pesticide_id = wort.item_id) when wort.type = 'Seed' then (select seed_name from seed_table where seed_id = wort.item_id) end as resource_name, case when wort.type = 'Fertilizer' then (select units from fertilizer_table where fertilizer_id = wort.item_id) when wort.type = 'Pesticide' then (select units from pesticide_table where pesticide_id = wort.item_id) when wort.type = 'Seed' then (select units from seed_table where seed_id = wort.item_id) end as resource_unit from work_order_table wot right join wo_resources_table wort using(work_order_id) join crop_calendar_table cct on cct.calendar_id = wot.crop_calendar_id join farm_table ft using(farm_id) left join ( select item_id, farm_id, price from ( select item_id, farm_id, purchase_price / amount as price, @rn := if(@prev = item_id, @rn + 1, 1) as rn, @prev := item_id from purchase_table join (select @prev := null, @rn := 0) as vars where purchase_status = 'Purchased' order by farm_id, item_id, date_purchased desc ) as t1 where rn = 1 ) as t2 on (ft.farm_id = t2.farm_id and wort.item_id = t2.item_id) where ? ";
	for (var i = 0; i < data.calendar_ids.length; i++) {
		sql = mysql.format(sql, { calendar_id: data.calendar_ids[i] });
		if (i != data.calendar_ids.length - 1) {
			sql += " or ?";
		}
		else {
			sql += " ";
		}
	}
	sql += "and wot.status = 'Completed' group by calendar_id, item_id";
	//console.log(sql);
	mysql.query(sql, next);
}

exports.getHarvestReports = function(next) {
	var sql = "SELECT group_concat(calendar_id , '') as calendar_ids, crop_plan, count(*) as count, DATE_FORMAT(min(land_prep_date), '%b %d, %Y') as min_start, DATE_FORMAT(max(harvest_date), '%b %d, %Y') as max_end, case when max(status) != 'Completed' then 'Partially Complete' else 'Completed' end as status FROM crop_calendar_table where status = 'Completed' group by crop_plan order by crop_plan desc, max(harvest_date) desc;";
	//console.log(sql);
	mysql.query(sql, next);
}

exports.getHarvestSummaryChart = function(data, next) {
	var sql = "select cct.crop_plan, ft.farm_name, st.seed_name, fy.* from crop_calendar_table cct join seed_table st on st.seed_id = cct.seed_planted join farm_table ft using(farm_id) join forecasted_yield fy using(calendar_id) where ?";
	for (var i = 0; i < data.calendar_ids.length; i++) {
		sql = mysql.format(sql, { 'cct.calendar_id': data.calendar_ids[i] });
		if (i != data.calendar_ids.length - 1) {
			sql += " or ?";
		}
		else {
			sql += " ";
		}
	}
	//console.log(sql);
	mysql.query(sql, next);
}

exports.getNutrientRecommendationDetails = function(data, next) {
	var sql = "select count(*) as count, t.*, date_add(target_application_date, interval 7 day) as target_date_end, case when target_application_date is not null then case when (date_completed >= target_application_date and date_completed <= date_add(target_application_date, interval 7 day)) then 'Followed' else 'Unfollowed' end else 'N/A' end as followed from ( SELECT case when work_order_id in (select wo_id from fertilizer_recommendation_items where wo_id = work_order_id) then 'Nutrient Generated Recommendation' else 'Nutrient User Generated' end as record_type, (select target_application_date from fertilizer_recommendation_items where wo_id = work_order_id) as target_application_date, wot.date_completed, wot.status, cct.calendar_id, wot.work_order_id FROM work_order_table wot JOIN crop_calendar_table cct on wot.crop_calendar_id = cct.calendar_id join wo_resources_table wrt USING (work_order_id) JOIN fertilizer_table ft ON wrt.item_id = ft.fertilizer_id WHERE ? AND wot.type = 'Fertilizer Application' and wot.status = 'Completed') as t group by calendar_id, record_type, followed, status";
	for (var i = 0; i < data.calendar_ids.length; i++) {
		sql = mysql.format(sql, { 'calendar_id': data.calendar_ids[i] });
		if (i != data.calendar_ids.length - 1) {
			sql += " or ?";
		}
		else {
			sql += " ";
		}
	}
	while(sql.includes('cct_calendar_id')) {
		sql = sql.replace('cct_calendar_id', 'cct.calendar_id');
	}
	//console.log(sql);
	mysql.query(sql, next);
}

exports.getEarlyHarvestDetails = function(data, next) {
	var sql = "SELECT t.* FROM (SELECT farm_name, COUNT(*) AS frequency, SUM(sacks_harvested) AS harvest, stage_harvested, type, cct_id FROM harvest_details join crop_calendar_table on calendar_id = cct_id join farm_table using(farm_id) WHERE ? ";
	for (var i = 0; i < data.calendar_ids.length; i++) {
		sql = mysql.format(sql, { cct_id: data.calendar_ids[i] });
		if (i != data.calendar_ids.length - 1) {
			sql += " or ?";
		}
		else {
			sql += " ";
		}
	}
	sql += "group by cct_id, stage_harvested ) as t where t.stage_harvested != 'Harvesting'";
	//console.log(sql);
	mysql.query(sql, next);
}

exports.getHistoricalYieldQuery = function(data, next) {
	var sql = " select * from ( select * from ( select *, @rn := if(@prev = farm_id, @rn + 1, 1) as rn, @prev := farm_id from crop_calendar_table join (select @prev := null, @rn := 0) as vars order by farm_id, harvest_date desc ) as t ) as t1 where t1.calendar_id in ( select calendar_id from crop_calendar_table where ?";
	for (var i = 0; i < data.calendar_ids.length; i++) {
		sql = mysql.format(sql, { calendar_id: data.calendar_ids[i] });
		if (i != data.calendar_ids.length - 1) {
			sql += " or ?";
		}
		else {
			sql += " ";
		}
	}
	sql += " )";
	mysql.query(sql, next);
}

exports.getHistoricalYield = function(data, next) {
	var sql = "select farm_name, count(*) as count, sum(harvest_yield) / count(*) as avg_yield from ( select farm_name, cct.*, @rn := if(@prev = cct.farm_id, @rn + 1, 1) as rn, @prev := cct.farm_id from crop_calendar_table cct join (select @prev := null, @rn := 0) as vars join farm_table using(farm_id) order by farm_id, harvest_date desc ) as t where ";
	for (var i = 0; i < data.length; i++) {
		if (i != 0)
			sql += ' or ';
		sql += '(farm_id = '+data[i].farm_id+' and rn > '+data[i].rn+')';
	}
	sql += ' group by farm_id';
	mysql.query(sql, next);
}