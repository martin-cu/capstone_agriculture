SELECT st.symptom_id, st.symptom_name, st.symptom_desc FROM pest_table p
INNER JOIN symptoms_pest sp ON p.pest_id = sp.pest_id
INNER JOIN symptoms_table st ON sp.symptom_id = st.symptom_id
WHERE p.pest_id = 1;

SELECT st.symptom_id, st.symptom_name, st.symptom_desc FROM disease_table d
INNER JOIN symptoms_disease sd ON d.disease_id = sd.disease_id
INNER JOIN symptoms_table st ON sd.symptom_id = st.symptom_id
WHERE d.disease_id = 1;

SELECT p.pest_id, p.pest_name, wt.weather as factor, wt.weather_desc as description, "weather" as type FROM pest_table p
INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id
INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id
UNION
SELECT p.pest_id, p.pest_name, s.season_name as factor, s.season_desc as description, "season" as type FROM pest_table p
INNER JOIN season_pest sp ON p.pest_id = sp.pest_id
INNER JOIN seasons s ON s.season_id = sp.season_pest
UNION
SELECT p.pest_id, p.pest_name, s.stage_name as factor, s.stage_desc as description, "stage" as type  FROM pest_table p
INNER JOIN stages_pest sp ON sp.pest_id = p.pest_id
INNER JOIN stages s ON s.stage_id = sp.stages_pest_id;