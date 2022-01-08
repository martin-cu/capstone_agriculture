var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.getFarmProductivity = function(next) {
	var sql = "select *, max(previous_yield) as max_previous_yield, max(prev_calendar) as max_prev_calendar from ( select fy.forecast_yield_id, cct.calendar_id, null as prev_calendar, cct.status, ft.farm_id, ft.farm_name, cct.crop_plan, fy.forecast as forecast_yield, cct.harvest_yield as current_yield, null as previous_yield from crop_calendar_table cct left join crop_calendar_table as cct1 on (cct.farm_id = cct1.farm_id and cct.harvest_date < cct1.harvest_date) join forecasted_yield fy on (cct.calendar_id = fy.calendar_id and cct.seed_planted = fy.seed_id) join farm_table ft on cct.farm_id = ft.farm_id where cct1.harvest_date is null union select null, null, t1.calendar_id, null, t1.farm_id, null, null, null, null, t1.harvest_yield from ( select *, @rn := if(@prev = farm_id, @rn + 1, 1) as rn, @prev := farm_id from crop_calendar_table join (select @prev := null, @rn := 0) as vars order by farm_id, harvest_date desc ) as t1 where rn = 2 ) as t2 group by t2.farm_id";
	mysql.query(sql, next);
};

exports.getInputResourcesUsed = function(data, next) {
	var sql = "select cct.calendar_id, wort.item_id, wort.type, sum(wort.qty) as qty, t2.price, sum(wort.qty) * t2.price as total_cost, case when wort.type = 'Fertilizer' then (select fertilizer_name from fertilizer_table where fertilizer_id = wort.item_id) when wort.type = 'Pesticide' then (select pesticide_name from pesticide_table where pesticide_id = wort.item_id) when wort.type = 'Seed' then (select seed_name from seed_table where seed_id = wort.item_id) end as resource_name from work_order_table wot right join wo_resources_table wort using(work_order_id) join crop_calendar_table cct on cct.calendar_id = wot.crop_calendar_id join farm_table ft using(farm_id) left join ( select item_id, farm_id, price from ( select item_id, farm_id, purchase_price / amount as price, @rn := if(@prev = item_id, @rn + 1, 1) as rn, @prev := item_id from purchase_table join (select @prev := null, @rn := 0) as vars where purchase_status = 'Purchased' order by farm_id, item_id, date_purchased desc ) as t1 where rn = 1 ) as t2 on (ft.farm_id = t2.farm_id and wort.item_id = t2.item_id) where ? ";
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