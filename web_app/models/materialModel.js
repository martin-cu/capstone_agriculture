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

// Material template for specific farm
// select ft.farm_id, ft.farm_name, fet.fertilizer_id, fet.fertilizer_name, fet.fertilizer_desc, fet.N, fet.P, fet.K, ifnull(t.current_amount, 0) as current_amount from fertilizer_table as fet cross join farm_table as ft 
// left join (
// select t1.fertilizer_id as fertilizer_id, t2.farm_id as farm_id, current_amount from farm_materials
// inner join fertilizer_table t1 on t1.fertilizer_id =  farm_materials.item_id
// inner join farm_table as t2 on t2.farm_id = farm_materials.farm_id
// where t2.farm_id = ? and farm_materials.item_type = 'Fertilizer'
// group by fertilizer_id, farm_id
// ) as t on t.fertilizer_id = fet.fertilizer_id and t.farm_id = ft.farm_id
// where ft.farm_id = ? order by farm_id, fertilizer_name

//get pesticides, seeds fertilizers
exports.getMaterials = function(type, filter, next){
	var sql;
	var table;
	if (type == "Seed") {
		table = "SELECT seed_id as id, seed_name as name, seed_desc as mat_desc FROM seed_table";
	
		if(filter == null){
			sql = table + ";";
		}
		else{
			sql = table +" WHERE ?";
			sql = mysql.format(sql, filter);
		}
	}
	else if (type == "Pesticide") {
		table = "SELECT pesticide_id as id, pesticide_name as name, pesticide_desc as mat_desc FROM pesticide_table";
	
		if(filter == null){
			sql = table + ";";
		}
		else{
			sql = table +" WHERE ?";
			sql = mysql.format(sql, filter);
		}
	}
	else if (type == "Fertilizer") {
		table = "select ft.farm_id, ft.farm_name, fet.fertilizer_id, fet.fertilizer_name, fet.fertilizer_desc, fet.N, fet.P, fet.K, ifnull(t.current_amount, 0) as current_amount, fet.price from fertilizer_table as fet cross join farm_table as ft left join ( select t1.fertilizer_id as fertilizer_id, t2.farm_id as farm_id, current_amount from farm_materials inner join fertilizer_table t1 on t1.fertilizer_id = farm_materials.item_id inner join farm_table as t2 on t2.farm_id = farm_materials.farm_id where t2.farm_id = ? and farm_materials.item_type = 'Fertilizer' group by fertilizer_id, farm_id ) as t on t.fertilizer_id = fet.fertilizer_id and t.farm_id = ft.farm_id where ft.farm_id = ? order by farm_id, fertilizer_name";
		
		while (table.includes("?")) {
			table = mysql.format(table, filter);
		}
		sql = table;
	}

	//console.log(sql);
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

exports.getFarmMaterialsSpecific = function(farm_id, item_type, next){
	var sql;
	if(item_type.item_type == "Seed")
		sql = "SELECT farm_mat_id, item_id, item_type, current_amount, seed_name as item_name FROM farm_materials m INNER JOIN seed_table st ON m.item_id = st.seed_id WHERE ? && ?";
	else if(item_type.item_type == "Fertilizer")
		sql = "SELECT farm_mat_id, item_id, item_type, current_amount, fertilizer_name as item_name FROM farm_materials m INNER JOIN fertilizer_table st ON m.item_id = st.fertilizer_id WHERE ? && ?";
	else if(item_type.item_type == "Pesticide")
		sql = "SELECT farm_mat_id, item_id, item_type, current_amount, pesticide_name as item_name FROM farm_materials m INNER JOIN pesticide_table st ON m.item_id = st.pesticide_id WHERE ? && ?";
	sql = mysql.format(sql, farm_id);
	sql = mysql.format(sql, item_type);
	// console.log(sql);
	mysql.query(sql, next);
}


exports.getFarmMaterialsMultiple = function(filter, next){
	var sql = "SELECT * FROM farm_materials WHERE farm_id = ? && item_type = ? && item_id = ?";
	sql = mysql.format(sql, filter[0]);
	sql = mysql.format(sql, filter[1]);
	sql = mysql.format(sql, filter[2]);
	// console.log(sql);
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

exports.getPurchasesPerFarm = function(type, farm_id, status, next){
	var fertilizer = 'SELECT pt.*, st.fertilizer_name AS item_name, st.fertilizer_desc AS description FROM purchase_table pt INNER JOIN fertilizer_table st ON pt.item_id = st.fertilizer_id && item_type = "Fertilizer" WHERE pt.farm_id = ? ';
	var seed = "SELECT pt.*, st.seed_name AS item_name, st.seed_desc AS description FROM purchase_table pt INNER JOIN seed_table st ON pt.item_id = st.seed_id && item_type = 'Seed' WHERE pt.farm_id = ? ";
	var pesticide = "SELECT pt.*, st.pesticide_name AS item_name, st.pesticide_desc AS description FROM purchase_table pt INNER JOIN pesticide_table st ON pt.item_id = st.pesticide_id && item_type = 'Pesticide' WHERE pt.farm_id = ?";
	var sql;
	if(type == null){
		sql = fertilizer + " UNION " + seed + " UNION " + pesticide;
		sql = mysql.format(sql, farm_id.farm_id);
		sql = mysql.format(sql, farm_id.farm_id);
		sql = mysql.format(sql, farm_id.farm_id);
	}
	else if (type == "Seed"){
		sql = seed;
		sql = mysql.format(sql, farm_id.farm_id);
	}
	else if(type == "Fertilizer"){
		sql = fertilizer;
		sql = mysql.format(sql, farm_id.farm_id);
	}
	else if(type == "Pesticide"){
		sql = pesticide;
		sql = mysql.format(sql, farm_id.farm_id);
	}

	if(status != null){
		sql = "SELECT * FROM (" + sql + ") a WHERE purchase_status = ?";
		sql = mysql.format(sql, status.status);
	}
	
	console.log("\n\n\n" + sql);
	mysql.query(sql, next);

}



//FARM FERTILIZERS
exports.getAllElements = function(next){
	var sql = "SELECT * FROM elements_table;"
	mysql.query(sql, next);
}

exports.getFertilizerElements = function(fertilizer_id, next){
	var sql = "SELECT * FROM fertilizer_table ft INNER JOIN fertilizer_elements fe ON fe.fertilizer_id = ft.fertilizer_id INNER JOIN element_table et ON et.element_id = fe.element_id WHERE ft.fertilizer_id = ?;"
	sql = mysql.format(sql, fertilizer_id);
	mysql.query(sql, next);
}