var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.getAllSymptoms = function(next){
	var sql = 'SELECT * FROM symptoms_table;';
	mysql.query(sql, next);
};

exports.getAllFactors = function(next){
	var sql = 'SELECT wt.weather_id as factor_id, wt.weather as factor_name, wt.weather_desc as description, "weather" as type FROM weather_table wt UNION SELECT s.stage_id as factor_id, s.stage_name as factor_name, s.stage_desc as description, "stages" FROM stages s UNION SELECT ss.season_id as factor_id, ss.season_name as factor_name, ss.season_desc as description, "season" FROM seasons ss UNION SELECT f.fertilizer_id as factor_id, f.fertilizer_name as factor_name, f.fertilizer_desc as description, "fertilizer" FROM fertilizer_table f UNION SELECT ft.farm_type_id as factor_id, ft.farm_type as factor_name, ft.farm_type_desc as description, "farm type" FROM farm_types ft;';
	mysql.query(sql, next);
}

exports.getAllPreventions = function(next){
	var sql = 'SELECT * FROM prevention_table;';
	mysql.query(sql, next);
}

exports.getAllSolutions = function(next){
	var sql = 'SELECT * FROM solution_table;';
	mysql.query(sql, next);
}

exports.addFactor = function(type, data, next){
	var sql = "INSERT INTO ";
	var table;
	switch (type){
		case "weather" : table = "weather_table"; break;
		case "season" : table = "seasons";break;
		case "farm type" : table = "farm_types";break;
		case "fertilizer" : table = "fertilizer_table";break;
		case "stage" : table = "stages"; break;
	}
	sql = sql + table + " set ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
}

exports.addSymptom = function(data, next){
	var sql = "INSERT INTO symptoms_table set ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
}

exports.addPestDiseaseSymptom = function(type, id, symptom, next){
	var sql = "INSERT INTO ";
	var table;
	var variable;
	if(type == "Pest"){
		table = "symptoms_pest";
		variable = "pest_id";
	}
	else if(type == "Disease"){
		table = "symptoms_disease";
		variable = "disease_id";
	}

	sql = sql + table + " set symptom_id = ?, " + variable + "= ?";
	sql = mysql.format(sql, symptom);
	sql = mysql.format(sql, id);
	console.log(sql);
	mysql.query(sql, next);
}

exports.getLastInserted = function(type, next){
	if(type == "Pest")
		mysql.query("SELECT LAST_INSERT_ID() as last FROM pest_table;", next);
	else
		mysql.query("SELECT LAST_INSERT_ID() as last FROM disease_table;", next);
}
exports.getLast = function(next){
	mysql.query("SELECT LAST_INSERT_ID() as last;", next);
}


exports.getAllPests = function(next){
	var sql = "SELECT * FROM pest_table;";
	mysql.query(sql, next);
}

exports.getPestDetails = function(id,next){
	var sql = "SELECT * FROM pest_table WHERE ?;";
	sql = mysql.format(sql, id);
	mysql.query(sql, next);
}

exports.getPestSymptoms = function(pest_id, next){
    var sql = "SELECT st.symptom_id, st.symptom_name, st.symptom_desc FROM pest_table p INNER JOIN symptoms_pest sp ON p.pest_id = sp.pest_id INNER JOIN symptoms_table st ON sp.symptom_id = st.symptom_id WHERE p.pest_id = ?;"
	sql = mysql.format(sql, pest_id);
	mysql.query(sql, next);
}

exports.getPestFactors = function(pest_id, next){
	var sql = 'SELECT p.pest_id, p.pest_name, wt.weather as factor, wt.weather_desc as description, "weather" as type FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE p.pest_id = ? UNION SELECT p.pest_id, p.pest_name, s.season_name as factor, s.season_desc as description, "season" as type FROM pest_table p INNER JOIN season_pest sp ON p.pest_id = sp.pest_id INNER JOIN seasons s ON s.season_id = sp.season_pest WHERE p.pest_id = ? UNION SELECT p.pest_id, p.pest_name, s.stage_name as factor, s.stage_desc as description, "stage" as type FROM pest_table p INNER JOIN stages_pest sp ON sp.pest_id = p.pest_id INNER JOIN stages s ON s.stage_id = sp.stages_pest_id WHERE p.pest_id = ? UNION SELECT p.pest_id, p.pest_name, ft.farm_type as factor, ft.farm_type_desc as description, "farm type" as type FROM pest_table p INNER JOIN farmtypes_pest ftp ON p.pest_id = ftp.pest_id INNER JOIN farm_types ft ON ft.farm_type_id = ftp.farm_type_id WHERE p.pest_id = ? UNION SELECT p.pest_id, p.pest_name, ft.fertilizer_name as factor, ft.fertilizer_desc as description, "fertilizer" as type FROM pest_table p INNER JOIN fertilizer_pest fp ON p.pest_id = fp.pest_id INNER JOIN fertilizer_table ft ON ft.fertilizer_id = ft.fertilizer_id WHERE p.pest_id = ?;';
	sql = mysql.format(sql, pest_id);
	sql = mysql.format(sql, pest_id);
	sql = mysql.format(sql, pest_id);
	sql = mysql.format(sql, pest_id);
	sql = mysql.format(sql, pest_id);

	// console.log(sql);
	mysql.query(sql, next);
}

exports.getPestSolutions = function(pest_id, next){
	var sql ='SELECT * FROM pest_table p INNER JOIN solution_pest sp ON sp.pest_id = p.pest_id INNER JOIN solution_table st ON st.solution_id = sp.solution_id WHERE ?';
	sql = mysql.format(sql, pest_id);
	mysql.query(sql, next);
}

exports.getPestPreventions = function(pest_id, next){
	var sql = 'SELECT * FROM pest_table p INNER JOIN prevention_pest sp ON sp.pest_id = p.pest_id INNER JOIN prevention_table st ON st.prevention_id = sp.prevention_id WHERE ?'
	sql = mysql.format(sql, pest_id);
	mysql.query(sql, next);
}

exports.addPest = function(pest, next){
	var sql = "INSERT INTO pest_table SET ?";
	sql = mysql.format(sql, pest);
	console.log(sql);
	mysql.query(sql, next);
}









//disease
exports.getAllDiseases = function(next){
	var sql = "SELECT * FROM disease_table;";
	mysql.query(sql, next);
}

exports.getDiseaseDetails = function(id,next){
	var sql = "SELECT * FROM disease_table WHERE ?;";
	sql = mysql.format(sql, id);
	mysql.query(sql, next);
}

exports.getDiseaseSymptoms = function(disease_id, next){
    var sql = 'SELECT st.symptom_id, st.symptom_name, st.symptom_desc FROM disease_table d INNER JOIN symptoms_disease sd ON d.disease_id = sd.disease_id INNER JOIN symptoms_table st ON sd.symptom_id = st.symptom_id WHERE d.disease_id = ?;';
	sql = mysql.format(sql, disease_id);
	mysql.query(sql, next);
}

exports.getDiseaseFactors = function(disease_id, next){
	var sql = 'SELECT d.disease_id, d.disease_name, wt.weather as factor, wt.weather_desc as pescription, "weather" as type FROM disease_table d INNER JOIN weather_disease wd ON d.disease_id = wd.disease_id INNER JOIN weather_table wt ON wt.weather_id = wd.weather_id WHERE d.disease_id = ? UNION SELECT d.disease_id, d.disease_name, s.season_name as factor, s.season_desc as description, "season" as type FROM disease_table d INNER JOIN seasons_disease sd ON d.disease_id = sd.disease_id INNER JOIN seasons s ON s.season_id = sd.seasons_disease_id WHERE d.disease_id = ? UNION SELECT d.disease_id, d.disease_name, s.stage_name as factor, s.stage_desc as description, "stage" as type FROM disease_table d INNER JOIN stages_disease sd ON sd.disease_id = d.disease_id INNER JOIN stages s ON s.stage_id = sd.stages_disease_id WHERE d.disease_id = ? UNION SELECT d.disease_id, d.disease_name, ft.farm_type as factor, ft.farm_type_desc as description, "farm type" as type FROM disease_table d INNER JOIN farm_types_disease ftd ON d.disease_id = ftd.disease_id INNER JOIN farm_types ft ON ft.farm_type_id = ftd.farm_type_id WHERE d.disease_id = ? UNION SELECT d.disease_id, d.disease_name, ft.fertilizer_name as factor, ft.fertilizer_desc as description, "fertilizer" as type FROM disease_table d INNER JOIN fertilizer_disease fd ON d.disease_id = fd.disease_id INNER JOIN fertilizer_table ft ON ft.fertilizer_id = ft.fertilizer_id WHERE d.disease_id = ?;';
	sql = mysql.format(sql, disease_id);
	sql = mysql.format(sql, disease_id);
	sql = mysql.format(sql, disease_id);
	sql = mysql.format(sql, disease_id);
	sql = mysql.format(sql, disease_id);
	mysql.query(sql, next);
}

exports.getDiseaseSolutions = function(disease_id, next){
	var sql ='SELECT * FROM disease_table p INNER JOIN solution_disease sp ON sp.disease_id = p.disease_id INNER JOIN solution_table st ON st.solution_id = sp.solution_id WHERE ?';
	sql = mysql.format(sql, disease_id);
	mysql.query(sql, next);
}

exports.getDiseasePreventions = function(disease_id, next){
	var sql = 'SELECT * FROM disease_table p INNER JOIN prevention_disease sp ON sp.disease_id = p.disease_id INNER JOIN prevention_table st ON st.prevention_id = sp.prevention_id WHERE ?'
	sql = mysql.format(sql, disease_id);
	mysql.query(sql, next);
}

exports.addDisease = function(disease, next){
	var sql = "INSERT INTO disease_table SET ?";
	sql = mysql.format(sql, disease);
	mysql.query(sql, next);
}




//PEST AND DISEASE MANAGEMENT
exports.getPestsBasedWeather = function(weather, next){
	var sql = "SELECT * FROM (SELECT p.pest_id, p.pest_name, wt.max_temp, wt.min_temp, wt.weather, wt.humidity, wt.precipitation, wt.soil_moisture FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id) a WHERE ";
	
	var first = false;
	if(weather.min_temp != null){
		first = true;
		sql = sql + "a.min_temp <= " + weather.min_temp;
	}
	if(weather.max_temp != null){
		if(first)
			sql = sql + "&& ";
		else
			first = true;
		sql = sql + "a.max_temp >= " + weather.max_temp;
	}
	if(weather.precipitation != null){
		if(first)
			sql = sql + "|| ";
		else
			first = true;
		sql = sql + " a.precipitation = " + weather.precipitation;
	}
	if(weather.humidity != null){
		if(first)
			sql = sql + "|| ";
		else
			first = true;
		sql = sql + " a.precipitation = " + weather.humidity;
	}
	sql = sql + " GROUP BY a.pest_name";
	console.log(sql);
	mysql.query(sql, next);
}

exports.getDiseaseBasedWeather = function(weather, next){
	var sql = "SELECT * FROM (SELECT p.disease_id, p.disease_name, wt.max_temp, wt.min_temp, wt.weather, wt.humidity, wt.precipitation, wt.soil_moisture FROM disease_table p INNER JOIN weather_disease wd ON p.disease_id = wd.disease_id INNER JOIN weather_table wt ON wt.weather_id = wd.weather_id) a WHERE ";
	
	var first = false;
	if(weather.min_temp != null){
		first = true;
		sql = sql + "a.min_temp <= " + weather.min_temp;
	}
	if(weather.max_temp != null){
		if(first)
			sql = sql + " && ";
		else
			first = true;
		sql = sql + "a.max_temp >= " + weather.max_temp;
	}
	if(weather.precipitation != null){
		if(first)
			sql = sql + " || ";
		else
			first = true;
		sql = sql + " a.precipitation = " + weather.precipitation;
	}
	if(weather.humidity != null){
		if(first)
			sql = sql + " || ";
		else
			first = true;
		sql = sql + " a.precipitation = " + weather.humidity;
	}
	// sql = sql + " GROUP BY a.disease_name";
	console.log(sql);
	mysql.query(sql, next);
}

exports.getPestPossibilities = function(weather, season, fertilizer, stage, next){
	select_qry = 'SELECT a.pest_id, a.pest_name, a.pest_desc, a.weather_id, a.max_temp, a.min_temp, a.weather, max(a.stage_name) as t_stage_name, max(a.avg_duration) as avg, max(a.stage_id) as stage_id, max(a.season_id) as season_id, max(a.season_name) as season_name, max(a.season_desc) as season_desc, max(a.fertilizer_id) as fertilizer_id, max(a.fertilizer_name) as fertilizer_name, max(fertilizer_desc) as fertilizer_desc  FROM (';
	weather_qry = 'SELECT p.pest_id, p.pest_name, p.pest_desc,wt.weather_id, wt.max_temp, wt.min_temp, wt.weather, wt.humidity, wt.precipitation, wt.soil_moisture,  null as stage_id, null as stage_name, null as avg_duration,null as season_id, null as season_name, null as season_desc, null as season_temp, null as season_humidity, null as fertilizer_id, null as fertilizer_name, null as fertilizer_desc FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';
	stages_qry = 'SELECT p.pest_id, p.pest_name,p.pest_desc, null as weather_id,null as max_temp, null as min_temp, null as weather, null as humidity, null as precipitation, null as soil_moisture, s.stage_id, s.stage_name, s.avg_duration,null as season_id, null as season_name, null as season_desc, null as season_temp, null as season_humidity, null as fertilizer_id, null as fertilizer_name, null as fertilizer_desc FROM pest_table p INNER JOIN stages_pest sp ON p.pest_id = sp.pest_id INNER JOIN stages s ON s.stage_id = sp.stage_id WHERE ';
	season_qry = 'SELECT p.pest_id, p.pest_name, p.pest_desc,null as weather_id,null as max_temp, null as min_temp, null as weather, null as humidity, null as precipitation, null as soil_moisture, null as stage_id, null as stage_name, null as avg_duration, s.season_id, s.season_name, s.season_desc, s.season_temp, s.season_humidity, null as fertilizer_id, null as fertilizer_name, null as fertilizer_desc FROM pest_table p INNER JOIN season_pest sp ON sp.pest_id = p.pest_id INNER JOIN seasons s ON s.season_id = sp.season_id WHERE ';
	fertilzier_qry = 'SELECT p.pest_id, p.pest_name, p.pest_desc, null as weather_id,null as max_temp, null as min_temp, null as weather, null as humidity, null as precipitation, null as soil_moisture, null as stage_id, null as stage_name, null as avg_duration, null as season_id, null as season_name, null as season_desc, null as season_temp, null as season_humidity, ft.fertilizer_id, ft.fertilizer_name, ft.fertilizer_desc FROM pest_table p INNER JOIN fertilizer_pest fp ON fp.pest_id = p.pest_id INNER JOIN fertilizer_table ft ON ft.fertilizer_id = fp.fertilizier_id WHERE ';
	end_qry = ') a group by a.pest_id;';

	sql = select_qry;
	first_table = false
	if(weather != null){
		first = false;
		first_table = true;
		sql = sql + weather_qry;
		if(weather.min_temp != null){
			first = true;
			sql = sql + "min_temp <= " + weather.min_temp;
		}
		if(weather.max_temp != null){
			if(first)
				sql = sql + " && ";
			else
				first = true;
			sql = sql + "max_temp >= " + weather.max_temp;
		}
		if(weather.precipitation != null){
			if(first)
				sql = sql + " || ";
			else
				first = true;
			sql = sql + " precipitation = " + weather.precipitation;
		}
		if(weather.humidity != null){
			if(first)
				sql = sql + " || ";
			else
				first = true;
			sql = sql + " humidity = " + weather.humidity;
		}		
	}

	if(season != null){
		first = false;
		if(first_table)
			sql = sql + " UNION ";
		else
			first_table = true;
		sql = sql + season_qry;
		if(season.season_temp != null){
			first = true;
			min = season.season_temp - 5;
			max = season.season_temp + 5;
			sql = sql + "season_temp >= " + min;
			sql = sql + " && season_temp <= " + max;
		}
		if(weather.max_temp != null){
			if(first)
				sql = sql + " || ";
			else
				first = true;
			sql = sql + " season_humidity >= " + season.season_humidity;
		}	
	}

	if(stage != null){
		first = false;
		if(first_table)
			sql = sql + " UNION ";
		else
			first_table = true;
		sql = sql + stages_qry;
		if(stage.stage_name != null){
			first = true;
		sql = sql + " ? ";
		sql = mysql.format(sql, stage);
			
		}
	}


	sql = sql + end_qry;
	// console.log(sql);
	mysql.query(sql, next);
}

exports.getDiseasePossibilities = function(weather, season, fertilizer, stage, next){
	select_qry = 'SELECT a.disease_id, a.disease_name, a.disease_desc, a.weather_id, a.max_temp, a.min_temp, a.weather, max(a.stage_name) as t_stage_name, max(a.avg_duration) as avg, max(a.stage_id) as stage_id, max(a.season_id) as season_id, max(a.season_name) as season_name, max(a.season_desc) as season_desc, max(a.fertilizer_id) as fertilizer_id, max(a.fertilizer_name) as fertilizer_name, max(fertilizer_desc) as fertilizer_desc  FROM (';
	weather_qry = 'SELECT p.disease_id, p.disease_name, p.disease_desc,wt.weather_id, wt.max_temp, wt.min_temp, wt.weather, wt.humidity, wt.precipitation, wt.soil_moisture,  null as stage_id, null as stage_name, null as avg_duration,null as season_id, null as season_name, null as season_desc, null as season_temp, null as season_humidity, null as fertilizer_id, null as fertilizer_name, null as fertilizer_desc FROM disease_table p INNER JOIN weather_disease wp ON p.disease_id = wp.disease_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';
	stages_qry = 'SELECT p.disease_id, p.disease_name,p.disease_desc, null as weather_id,null as max_temp, null as min_temp, null as weather, null as humidity, null as precipitation, null as soil_moisture, s.stage_id, s.stage_name, s.avg_duration,null as season_id, null as season_name, null as season_desc, null as season_temp, null as season_humidity, null as fertilizer_id, null as fertilizer_name, null as fertilizer_desc FROM disease_table p INNER JOIN stages_disease sp ON p.disease_id = sp.disease_id INNER JOIN stages s ON s.stage_id = sp.stage_id WHERE ';
	season_qry = 'SELECT p.disease_id, p.disease_name, p.disease_desc,null as weather_id,null as max_temp, null as min_temp, null as weather, null as humidity, null as precipitation, null as soil_moisture, null as stage_id, null as stage_name, null as avg_duration, s.season_id, s.season_name, s.season_desc, s.season_temp, s.season_humidity, null as fertilizer_id, null as fertilizer_name, null as fertilizer_desc FROM disease_table p INNER JOIN seasons_disease sp ON sp.disease_id = p.disease_id INNER JOIN seasons s ON s.season_id = sp.season_id WHERE ';
	fertilzier_qry = 'SELECT p.disease_id, p.disease_name, p.disease_desc, null as weather_id,null as max_temp, null as min_temp, null as weather, null as humidity, null as precipitation, null as soil_moisture, null as stage_id, null as stage_name, null as avg_duration, null as season_id, null as season_name, null as season_desc, null as season_temp, null as season_humidity, ft.fertilizer_id, ft.fertilizer_name, ft.fertilizer_desc FROM disease_table p INNER JOIN fertilizer_disease fp ON fp.disease_id = p.disease_id INNER JOIN fertilizer_table ft ON ft.fertilizer_id = fp.fertilizier_id WHERE ';
	end_qry = ') a group by a.disease_id;';

	sql = select_qry;
	first_table = false
	if(weather != null){
		first = false;
		first_table = true;
		sql = sql + weather_qry;
		if(weather.min_temp != null){
			first = true;
			sql = sql + "min_temp <= " + weather.min_temp;
		}
		if(weather.max_temp != null){
			if(first)
				sql = sql + " && ";
			else
				first = true;
			sql = sql + "max_temp >= " + weather.max_temp;
		}
		if(weather.precipitation != null){
			if(first)
				sql = sql + " || ";
			else
				first = true;
			sql = sql + " precipitation = " + weather.precipitation;
		}
		if(weather.humidity != null){
			if(first)
				sql = sql + " || ";
			else
				first = true;
			sql = sql + " humidity = " + weather.humidity;
		}		
	}

	if(season != null){
		first = false;
		if(first_table)
			sql = sql + " UNION ";
		else
			first_table = true;
		sql = sql + season_qry;
		if(season.season_temp != null){
			first = true;
			min = season.season_temp - 5;
			max = season.season_temp + 5;
			sql = sql + "season_temp >= " + min;
			sql = sql + " && season_temp <= " + max;
		}
		if(weather.max_temp != null){
			if(first)
				sql = sql + " || ";
			else
				first = true;
			sql = sql + " season_humidity >= " + season.season_humidity;
		}	
	}

	if(stage != null){
		first = false;
		if(first_table)
			sql = sql + " UNION ";
		else
			first_table = true;
		sql = sql + stages_qry;
		if(stage.stage_name != null){
			first = true;
		sql = sql + " ? ";
		sql = mysql.format(sql, stage);
			
		}
	}


	sql = sql + end_qry;
	// console.log(sql);
	mysql.query(sql, next);
	// console.log("done");
}


exports.getPestProbability = function(weather, season, fertilizer, stage, next){
	sql = "";
	start = "SELECT a.pest_id, a.pest_name, COUNT(a.pest_id) as count FROM (";
	end = ") a GROUP BY a.pest_id ORDER BY COUNT(a.pest_id) DESC;";
	weather_temp = 'SELECT p.pest_id, p.pest_name, "Weather temp" AS factor, (wt.min_temp + wt.max_temp) / 2 AS value FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';
	weather_humidity = 'SELECT p.pest_id, p.pest_name, "Weather humidity" AS factor, wt.humidity AS value FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';
	weather_precipitation = 'SELECT p.pest_id, p.pest_name, "Weather precipitation" AS factor, wt.precipitation AS value FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';
	weather_soil_moisture = 'SELECT p.pest_id, p.pest_name, "Weather soil moisture" AS factor, wt.soil_moisture AS value FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';

	season_temp = 'SELECT p.pest_id, p.pest_name, "Season temp" AS factor, s.season_temp AS value FROM pest_table p INNER JOIN season_pest sp ON sp.pest_id = p.pest_id INNER JOIN seasons s ON s.season_id = sp.season_id WHERE ';
	season_humidity = 'SELECT p.pest_id, p.pest_name, "Season humidity" AS factor, s.season_humidity AS value FROM pest_table p INNER JOIN season_pest sp ON sp.pest_id = p.pest_id INNER JOIN seasons s ON s.season_id = sp.season_id WHERE ';

	stages_qry = 'SELECT p.pest_id, p.pest_name, "Stage" AS factor, s.stage_name AS value FROM pest_table p INNER JOIN stages_pest sp ON p.pest_id = sp.pest_id INNER JOIN stages s ON s.stage_id = sp.stage_id WHERE ';

	fertilzier_qry = 'SELECT p.pest_id, p.pest_name, "Stage" AS factor, s.stage_name AS value FROM pest_table p INNER JOIN fertilizer_pest fp ON fp.pest_id = p.pest_id INNER JOIN fertilizer_table ft ON ft.fertilizer_id = fp.fertilizier_id WHERE ';

	sql = start;
	first = false;

	//WEATHER
	if(weather.min_temp != null && weather.max_temp != null){
		sql = sql + weather_temp;

		if(weather.min_temp != null){
			first = true;
			sql = sql + " min_temp <= " + weather.min_temp;
		}
		if(weather.max_temp != null){
			if(first)
				sql = sql + " && ";
			else
				first = true;
			sql = sql + " max_temp >= " + weather.max_temp;
		}
		first = true;
	}

	console.log("\n\n\n" + sql);

	if(weather.humidity != null){
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		sql = sql + weather_humidity;
		sql = sql + " humidity = " + weather.humidity;
	}
	if(weather.precipitation != null){
		if(first)
			sql = sql + " UNION ";
		else
			first = true;

		sql = sql + weather_precipitation;
		sql = sql + " precipitation - 5 <= " + weather.precipitation + " && precipitation + 5 >= " + weather.precipitation;
	}
	if(weather.soil_moisture != null){
		
		if(first)
			sql = sql + " UNION ";
		else
			first = true;

		sql = sql + weather_soil_moisture;
		sql = sql + " soil_moisture = " + weather.soil_moisture;
	}

	//SEASON
	if(season.season_temp != null){
		
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		sql = sql + season_temp;
		sql = sql + " season_temp - 5 <= " + season.season_temp + " && season_temp + 5 >= " + season.season_temp;
			
	}

	if(season.season_humidity != null){
		
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		sql = sql + season_humidity;
		sql = sql + " season_humidity - 5 <= " + season.season_humidity + " && season_humidity + 5 >= " + season.season_humidity;
			
	}


	//STAGE
	if(stage.stage_name != null){
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		
		sql = sql + stages_qry;
		sql = sql + " s.stage_name = '" + stage.stage_name + "'";
	}


	sql = sql + end;
	// console.log("\n\n\n" + sql);
	mysql.query(sql, next);

}


exports.getDiseaseProbability = function(weather, season, fertilizer, stage, next){
	sql = "";
	start = "SELECT a.disease_id, a.disease_name, COUNT(a.disease_id) as count FROM (";
	end = ") a GROUP BY a.disease_id ORDER BY COUNT(a.disease_id) DESC;";
	weather_temp = 'SELECT p.disease_id, p.disease_name, "Weather temp" AS factor, (wt.min_temp + wt.max_temp) / 2 AS value FROM disease_table p INNER JOIN weather_disease wp ON p.disease_id = wp.disease_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';
	weather_humidity = 'SELECT p.disease_id, p.disease_name, "Weather humidity" AS factor, wt.humidity AS value FROM disease_table p INNER JOIN weather_disease wp ON p.disease_id = wp.disease_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';
	weather_precipitation = 'SELECT p.disease_id, p.disease_name, "Weather precipitation" AS factor, wt.precipitation AS value FROM disease_table p INNER JOIN weather_disease wp ON p.disease_id = wp.disease_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';
	weather_soil_moisture = 'SELECT p.disease_id, p.disease_name, "Weather soil moisture" AS factor, wt.soil_moisture AS value FROM disease_table p INNER JOIN weather_disease wp ON p.disease_id = wp.disease_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';

	season_temp = 'SELECT p.disease_id, p.disease_name, "Season temp" AS factor, s.season_temp AS value FROM disease_table p INNER JOIN seasons_disease sp ON sp.disease_id = p.disease_id INNER JOIN seasons s ON s.season_id = sp.season_id WHERE ';
	season_humidity = 'SELECT p.disease_id, p.disease_name, "Season humidity" AS factor, s.season_humidity AS value FROM disease_table p INNER JOIN seasons_disease sp ON sp.disease_id = p.disease_id INNER JOIN seasons s ON s.season_id = sp.season_id WHERE ';

	stages_qry = 'SELECT p.disease_id, p.disease_name, "Stage" AS factor, s.stage_name AS value FROM disease_table p INNER JOIN stages_disease sp ON p.disease_id = sp.disease_id INNER JOIN stages s ON s.stage_id = sp.stage_id WHERE ';

	fertilzier_qry = 'SELECT p.disease_id, p.disease_name, "Stage" AS factor, s.stage_name AS value FROM disease_table p INNER JOIN fertilizer_disease fp ON fp.disease_id = p.disease_id INNER JOIN fertilizer_table ft ON ft.fertilizer_id = fp.fertilizier_id WHERE ';

	sql = start;
	first = false;

	//WEATHER
	if(weather.min_temp != null && weather.max_temp != null){
		sql = sql + weather_temp;

		if(weather.min_temp != null){
			first = true;
			sql = sql + " min_temp <= " + weather.min_temp;
		}
		if(weather.max_temp != null){
			if(first)
				sql = sql + " && ";
			else
				first = true;
			sql = sql + " max_temp >= " + weather.max_temp;
		}
		first = true;
	}

	console.log("\n\n\n" + sql);

	if(weather.humidity != null){
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		sql = sql + weather_humidity;
		sql = sql + " humidity = " + weather.humidity;
	}
	if(weather.precipitation != null){
		if(first)
			sql = sql + " UNION ";
		else
			first = true;

		sql = sql + weather_precipitation;
		sql = sql + " precipitation - 5 <= " + weather.precipitation + " && precipitation + 5 >= " + weather.precipitation;
	}
	if(weather.soil_moisture != null){
		
		if(first)
			sql = sql + " UNION ";
		else
			first = true;

		sql = sql + weather_soil_moisture;
		sql = sql + " soil_moisture = " + weather.soil_moisture;
	}

	//SEASON
	if(season.season_temp != null){
		
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		sql = sql + season_temp;
		sql = sql + " season_temp - 5 <= " + season.season_temp + " && season_temp + 5 >= " + season.season_temp;
			
	}

	if(season.season_humidity != null){
		
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		sql = sql + season_humidity;
		sql = sql + " season_humidity - 5 <= " + season.season_humidity + " && season_humidity + 5 >= " + season.season_humidity;
			
	}


	//STAGE
	if(stage.stage_name != null){
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		
		sql = sql + stages_qry;
		sql = sql + " s.stage_name = '" + stage.stage_name + "'";
	}


	sql = sql + end;
	// console.log("\n\n\n" + sql);
	mysql.query(sql, next);

}

exports.getPestProbabilityPercentage = function(weather, season, fertilizer, stage, next){
	sql = "";
	start = "SELECT a.pest_id, a.pest_name, COUNT(a.pest_id) AS count, b.factor_count AS factor_count, ROUND(COUNT(a.pest_id) / b.factor_count * 100,2) AS probability FROM (";
	end = ") a ";
	weather_temp = 'SELECT p.pest_id, p.pest_name, "Weather temp" AS factor, (wt.min_temp + wt.max_temp) / 2 AS value FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';
	weather_humidity = 'SELECT p.pest_id, p.pest_name, "Weather humidity" AS factor, wt.humidity AS value FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';
	weather_precipitation = 'SELECT p.pest_id, p.pest_name, "Weather precipitation" AS factor, wt.precipitation AS value FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';
	weather_soil_moisture = 'SELECT p.pest_id, p.pest_name, "Weather soil moisture" AS factor, wt.soil_moisture AS value FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id WHERE ';

	season_temp = 'SELECT p.pest_id, p.pest_name, "Season temp" AS factor, s.season_temp AS value FROM pest_table p INNER JOIN season_pest sp ON sp.pest_id = p.pest_id INNER JOIN seasons s ON s.season_id = sp.season_id WHERE ';
	season_humidity = 'SELECT p.pest_id, p.pest_name, "Season humidity" AS factor, s.season_humidity AS value FROM pest_table p INNER JOIN season_pest sp ON sp.pest_id = p.pest_id INNER JOIN seasons s ON s.season_id = sp.season_id WHERE ';

	stages_qry = 'SELECT p.pest_id, p.pest_name, "Stage" AS factor, s.stage_name AS value FROM pest_table p INNER JOIN stages_pest sp ON p.pest_id = sp.pest_id INNER JOIN stages s ON s.stage_id = sp.stage_id WHERE ';

	fertilzier_qry = 'SELECT p.pest_id, p.pest_name, "Stage" AS factor, s.stage_name AS value FROM pest_table p INNER JOIN fertilizer_pest fp ON fp.pest_id = p.pest_id INNER JOIN fertilizer_table ft ON ft.fertilizer_id = fp.fertilizier_id WHERE ';

	sql = start;
	first = false;

	//WEATHER
	if(weather.min_temp != null && weather.max_temp != null){
		sql = sql + weather_temp;

		if(weather.min_temp != null){
			first = true;
			sql = sql + " min_temp <= " + weather.min_temp;
		}
		if(weather.max_temp != null){
			if(first)
				sql = sql + " && ";
			else
				first = true;
			sql = sql + " max_temp >= " + weather.max_temp;
		}
		first = true;
	}

	if(weather.humidity != null){
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		sql = sql + weather_humidity;
		sql = sql + " humidity = " + weather.humidity;
	}
	if(weather.precipitation != null){
		if(first)
			sql = sql + " UNION ";
		else
			first = true;

		sql = sql + weather_precipitation;
		sql = sql + " precipitation - 5 <= " + weather.precipitation + " && precipitation + 5 >= " + weather.precipitation;
	}
	if(weather.soil_moisture != null){
		
		if(first)
			sql = sql + " UNION ";
		else
			first = true;

		sql = sql + weather_soil_moisture;
		sql = sql + " soil_moisture = " + weather.soil_moisture;
	}

	//SEASON
	if(season.season_temp != null){
		
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		sql = sql + season_temp;
		sql = sql + " season_temp - 5 <= " + season.season_temp + " && season_temp + 5 >= " + season.season_temp;
			
	}

	if(season.season_humidity != null){
		
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		sql = sql + season_humidity;
		sql = sql + " season_humidity - 5 <= " + season.season_humidity + " && season_humidity + 5 >= " + season.season_humidity;
			
	}


	//STAGE
	if(stage.stage_name != null){
		if(first)
			sql = sql + " UNION ";
		else
			first = true;
		
		sql = sql + stages_qry;
		sql = sql + " s.stage_name = '" + stage.stage_name + "'";
	}


	sql = sql + end;


	var sql2 = ' INNER JOIN (SELECT a.pest_id, a.pest_name, COUNT(a.pest_id) AS factor_count FROM (SELECT p.pest_id, p.pest_name, wt.weather as factor, wt.weather_desc as description, "weather" as type FROM pest_table p INNER JOIN weather_pest wp ON p.pest_id = wp.pest_id INNER JOIN weather_table wt ON wt.weather_id = wp.weather_id UNION SELECT p.pest_id, p.pest_name, s.season_name as factor, s.season_desc as description, "season" as type FROM pest_table p INNER JOIN season_pest sp ON p.pest_id = sp.pest_id INNER JOIN seasons s ON s.season_id = sp.season_pest UNION SELECT p.pest_id, p.pest_name, s.stage_name as factor, s.stage_desc as description, "stage" as type FROM pest_table p INNER JOIN stages_pest sp ON sp.pest_id = p.pest_id INNER JOIN stages s ON s.stage_id = sp.stages_pest_id UNION SELECT p.pest_id, p.pest_name, ft.farm_type as factor, ft.farm_type_desc as description, "farm type" as type FROM pest_table p INNER JOIN farmtypes_pest ftp ON p.pest_id = ftp.pest_id INNER JOIN farm_types ft ON ft.farm_type_id = ftp.farm_type_id UNION SELECT p.pest_id, p.pest_name, ft.fertilizer_name as factor, ft.fertilizer_desc as description, "fertilizer" as type FROM pest_table p INNER JOIN fertilizer_pest fp ON p.pest_id = fp.pest_id INNER JOIN fertilizer_table ft ON ft.fertilizer_id = ft.fertilizer_id) a GROUP BY pest_id) b ON a.pest_id = b.pest_id GROUP BY a.pest_id ORDER BY probability DESC;';

	sql = sql + sql2;
	console.log(sql);
	mysql.query(sql, next);
}