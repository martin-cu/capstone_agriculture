select t1.calendar_id, t1.harvest_yield, t1.N * 30.515 * t1.farm_area as N, t1.P * 30.515 * t1.farm_area as P, t1.K * 30.515 * t1.farm_area as K, 
case when max(t1.applied_N) is null then 0 else max(t1.applied_N) end as applied_N, 
case when max(t1.applied_P) is null then 0 else max(t1.applied_P) end as applied_P,
case when max(t1.applied_K) is null then 0 else max(t1.applied_K) end as applied_K,
case when t1.N * 30.515 * t1.farm_area - max(t1.applied_N) < 0 or t1.N * 30.515 * t1.farm_area - max(t1.applied_N) is null then 0 else t1.N * 30.515 * t1.farm_area - max(t1.applied_N) end as deficient_N,
case when t1.P * 30.515 * t1.farm_area - max(t1.applied_P) < 0 or t1.P * 30.515 * t1.farm_area - max(t1.applied_P) is null then 0 else t1.P * 30.515 * t1.farm_area - max(t1.applied_P) end as deficient_P,
case when t1.K * 30.515 * t1.farm_area - max(t1.applied_K) < 0 or t1.K * 30.515 * t1.farm_area - max(t1.applied_K) is null then 0 else t1.K * 30.515 * t1.farm_area - max(t1.applied_K) end as deficient_K
from
(
SELECT ft.farm_area, cct.calendar_id, cct.harvest_yield, 
case when (select n_lvl from soil_quality_table where calendar_id = cct.calendar_id order by soil_quality_id desc limit 1) is null then 7.75 else (select n_lvl from soil_quality_table where calendar_id = cct.calendar_id order by soil_quality_id desc limit 1) end as N,
case when (select p_lvl from soil_quality_table where calendar_id = cct.calendar_id order by soil_quality_id desc limit 1) is null then 4.0 else (select p_lvl from soil_quality_table where calendar_id = cct.calendar_id order by soil_quality_id desc limit 1) end as P,
case when (select k_lvl from soil_quality_table where calendar_id = cct.calendar_id order by soil_quality_id desc limit 1) is null then 8.75 else (select k_lvl from soil_quality_table where calendar_id = cct.calendar_id order by soil_quality_id desc limit 1) end as K ,
null as applied_N, null as applied_P, null as applied_K
FROM crop_calendar_table cct join farm_table ft using(farm_id) where ?

union

select null, t.crop_calendar_id, null as harvest_yield, null as N, null as P, null as K,
sum(t.total_N) as total_N, 
sum(t.total_P)as total_P, 
sum(t.total_K) as total_K
from
(
SELECT wot.work_order_id, wot.crop_calendar_id, sum(wort.qty) * ft.N as total_N, sum(wort.qty) * ft.P as total_P, 
sum(wort.qty) * ft.K as total_K FROM work_order_table wot 
join wo_resources_table wort using (work_order_id) join fertilizer_table ft on ft.fertilizer_id = wort.item_id
where wot.type = 'Fertilizer Application' and wot.status = 'Completed'
group by crop_calendar_id, fertilizer_id
) as t group by crop_calendar_id
) as t1 group by calendar_id