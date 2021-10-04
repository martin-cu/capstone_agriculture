var mysql = require('./connectionModel');
mysql = mysql.connection;

//Create and register valid materials
exports.registerMaterial = function(type, data, next) {
	var sql;

	if (type == "seed") {
		sql = "insert into seed_table set ?";
	}
	else if (type == "pesticide") {
		sql = "insert into pesticide_table set ?";
	}
	else if (type == "fertilizer") {
		sql = "insert into fertilizer_table set ?"
	}

	sql = mysql.format(sql, data);
	console.log(sql);
	mysql.query(sql, next);
}

//get pesticides, seeds fertilizers
exports.getMaterials = function(type, filter, next){
	var sql;
	var table;
	if (type == "seed") {
		table = "seed_table";
	}
	else if (type == "pesticide") {
		table = "pesticide_table";
	}
	else if (type == "fertilizer") {
		table = "fertilizer_table";
	}

	if(filter == null){
		sql = "SELECT * FROM " + table + ";";
	}
	else{
		sql = "SELECT * FROM " + table +" WHERE ?";
		sql = mysql.format(sql, filter);
	}

	mysql.query(sql, next);
}

//Purchase history
