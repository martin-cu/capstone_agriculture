-- update notification_table set status = 0;
update notification_table set status = 1, date = "2022-01-31", notification_desc = 'Expected heavy intensity rain on 2022-02-13' where notification_id = 17;
update disaster_logs set date_recorded = "2022-01-31", target_date = "2022-02-13" where disaster_id = 3;
delete from diagnosis_symptom where diagnosis_id = 109;
delete from diagnosis where diagnosis_id = 109;