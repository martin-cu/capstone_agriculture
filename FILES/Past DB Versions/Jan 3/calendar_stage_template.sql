-- t.*,

select datediff(now(), max(t.date_completed)) as dat, maturity_days as vegetation, maturity_days+35 as reproductive
, maturity_days+65 as ripening,
case 
when max(t.type) = 'Sow Seed' then 
	case 
    when max(t.date_completed) is null then 'Sowing' 
	when datediff(now(), max(t.date_completed)) < maturity_days then 'Vegetation'
    when datediff(now(), max(t.date_completed)) >= maturity_days 
    && datediff(now(), max(t.date_completed)) < (maturity_days+35) then 'Reproductive'
    when datediff(now(), max(t.date_completed)) >= (maturity_days+35) 
    && datediff(now(), max(t.date_completed)) < (maturity_days+65) then 'Ripening' 
    when datediff(now(), max(t.date_completed)) >= (maturity_days+65) then 'Harvesting' end
    
else 'Land Preparation' end as stage
from (
select cct.*, ft.farm_name, ft.land_type, st.seed_name, st.maturity_days, null as type, null as date_completed
from crop_calendar_table cct 
join farm_table ft on cct.farm_id = ft.farm_id join seed_table st on cct.seed_planted = st.seed_id 
where cct.status = "In-Progress" or cct.status = "Active" 

union

select crop_calendar_id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, type, date_completed from work_order_table where type = 'Sow Seed'
) as t group by calendar_id