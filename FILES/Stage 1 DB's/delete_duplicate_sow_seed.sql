delete from work_order_table where work_order_id in (
select * from (
select max(work_order_id) as lastId
    from work_order_table
   where type in (
              select type 
                from work_order_table
                where type = 'Sow Seed'
               group by crop_calendar_id
              having count(*) > 1
       )
   group by crop_calendar_id
) as x
   )