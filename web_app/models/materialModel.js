var mysql = require('./connectionModel');
mysql = mysql.connection;

//Create and register valid materials
exports.registerMaterial = function(type, data, next) {
	var sql;
console.log(type);
	if (type == "Seed") {
		sql = "insert into seed_table set ?";
	}
	else if (type == "Pesticide") {
		sql = "insert into pesticide_table set ?";
	}
	else if (type == "Fertilizer") {
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
	if (type == "Seed") {
		table = "SELECT seed_id as id, seed_name as name, seed_desc as mat_desc FROM seed_table";
	}
	else if (type == "Pesticide") {
		table = "SELECT pesticide_id as id, pesticide_name as name, pesticide_desc as mat_desc FROM pesticide_table";
	}
	else if (type == "Fertilizer") {
		table = "SELECT fertilizer_id as id, fertilizer_name as name, fertilizer_desc as mat_desc FROM fertilizer_table";
	}

	if(filter == null){
		sql = table + ";";
	}
	else{
		sql = table +" WHERE ?";
		sql = mysql.format(sql, filter);
	}
	// console.log(sql);
	mysql.query(sql, next);
}

exports.updateMaterial = function(type, filter, data, next){
	var sql;
	if (type == "Seed") {
		sql = "UPDATE seed_table set ?";
	}
	else if (type == "Pesticide") {
		sql = "UPDATE pesticide_table set ?";
	}
	else if (type == "Fertilizer") {
		sql = "UPDATE fertilizer_table set ?"
	}
	sql = mysql.format(sql, data);
	if(filter != null){
		sql = sql + " WHERE ?";
		sql = mysql.format(sql, filter);
	}
	mysql.query(sql, next);
}

// exports.materialAddUpdate = function(type, filter, data, next){
// 	var sql;
// 	if (type == "Seed") {
// 		sql = "UPDATE seed_table set current_amount = current_amount + ? WHERE seed_id = " + filter.item_id;
// 	}
// 	else if (type == "Pesticide") {
// 		sql = "UPDATE pesticide_table set current_amount = current_amount + ? WHERE pesticide_id = " + filter.item_id;
// 	}
// 	else if (type == "Fertilizer") {
// 		sql = "UPDATE fertilizer_table set current_amount = current_amount + ? WHERE pesticide_id = " + filter.item_id;
// 	}
// 	sql = mysql.format(sql, data);
// 	// if(filter != null){
// 	// 	sql = sql + " WHERE ?";
// 	// 	sql = mysql.format(sql, filter);
// 	// }
// 	console.log(sql);
// 	mysql.query(sql, next);
// }


exports.registerFarmMaterial = function(data, next) {
	var sql = "insert into farm_materials set ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
}

exports.updateFarmMaterials = function(data, farm_mat_id, next){
	var sql = "UPDATE farm_materials set ? WHERE ?";
	sql = mysql.format(sql, data);
	sql = mysql.format(sql, farm_mat_id);
	console.log(sql);
	mysql.query(sql, next);
}

exports.addFarmMaterials = function(amount, farm_mat_id, next){
	var sql = "UPDATE farm_materials set current_amount = current_amount + ? WHERE farm_mat_id = ?";
	sql = mysql.format(sql, amount);
	sql = mysql.format(sql, farm_mat_id);
	mysql.query(sql, next);
}

exports.getFarmMaterials = function(filter, next){
	var sql = "SELECT * FROM farm_materials WHERE ?";
	sql = mysql.format(sql, filter);
	// console.log(sql);
	mysql.query(sql, next);
}

exports.getFarmMaterialsMultiple = function(filter, next){
	var sql = "SELECT * FROM farm_materials WHERE farm_id = ? && item_type = ? && item_id = ?";
	sql = mysql.format(sql, filter[0]);
	sql = mysql.format(sql, filter[1]);
	sql = mysql.format(sql, filter[2]);
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