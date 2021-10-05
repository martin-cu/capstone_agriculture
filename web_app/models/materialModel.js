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

exports.updateMaterial = function(type, filter, data, next){
	var sql;
	if (type == "seed") {
		sql = "UPDATE seed_table set ?";
	}
	else if (type == "pesticide") {
		sql = "UPDATE pesticide_table set ?";
	}
	else if (type == "fertilizer") {
		sql = "UPDATE fertilizer_table set ?"
	}
	sql = mysql.format(sql, data);
	if(filter != null){
		sql = sql + " WHERE ?";
		sql = mysql.format(sql, filter);
	}
	mysql.query(sql, next);
}

exports.materialAddUpdate = function(type, filter, data, next){
	var sql;
	if (type == "Seed") {
		sql = "UPDATE seed_table set current_amount = current_amount + ? WHERE seed_id = " + filter.item_id;
	}
	else if (type == "Pesticide") {
		sql = "UPDATE pesticide_table set current_amount = current_amount + ? WHERE pesticide_id = " + filter.item_id;
	}
	else if (type == "Fertilizer") {
		sql = "UPDATE fertilizer_table set current_amount = current_amount + ? WHERE pesticide_id = " + filter.item_id;
	}
	sql = mysql.format(sql, data);
	// if(filter != null){
	// 	sql = sql + " WHERE ?";
	// 	sql = mysql.format(sql, filter);
	// }
	console.log(sql);
	mysql.query(sql, next);
}
//Purchase history
exports.addPurchase = function(data, next){
	var sql;
	sql = "INSERT INTO purchase_table SET ?";
	sql = mysql.format(sql, data);

	mysql.query(sql, next);
}

exports.getPurchases = function(filter, next){
	var sql;
	if(filter == null){
		sql = "SELECT * FROM purchase_table;";
	}
	else{
		sql = "SELECT * FROM purchase_table WHERE ?";
		sql = mysql.format(sql, filter);
	}
	mysql.query(sql, next);
}

exports.updatePurchase = function(id, data, next){
	var sql = "UPDATE purchase_table SET ? WHERE ?;";
	sql = mysql.format(sql, data);
	sql = mysql.format(sql, id);
	mysql.query(sql, next);
};