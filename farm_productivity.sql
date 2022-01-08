-- status / farm / crop plan / previous yield / forecasted yield / current yield / net spend / productivity 

select *, max(previous_yield) as max_previous_yield from
(
select fy.forecast_yield_id, cct.calendar_id, cct.status, ft.farm_id, ft.farm_name, cct.crop_plan, fy.forecast as forecast_yield, 
cct.harvest_yield as current_yield, null as previous_yield
from crop_calendar_table cct left join crop_calendar_table as cct1 on (cct.farm_id = cct1.farm_id and cct.harvest_date < cct1.harvest_date)
join forecasted_yield fy on (cct.calendar_id = fy.calendar_id and cct.seed_planted = fy.seed_id)
join farm_table ft on cct.farm_id = ft.farm_id where cct1.harvest_date is null

union

select null, null, null, t1.farm_id, null, null, null, null, t1.harvest_yield from
(
select *, @rn := if(@prev = farm_id, @rn + 1, 1) as rn, @prev := farm_id 
from crop_calendar_table join (select @prev := null, @rn := 0) as vars order by farm_id, harvest_date desc
) as t1
where rn = 2
) as t2 group by t2.farm_id
