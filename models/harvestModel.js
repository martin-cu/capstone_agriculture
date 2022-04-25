var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.createHarvestDetail = function(query, next) {
	var sql = "insert into harvest_details (sacks_harvested, stage_harvested, type, cct_id) values ";
	for (var i = 0; i < query.length; i++) {
		if (i != 0) {
			sql += ', ';
		}

		sql += '(?, ?, ?, ?)';
		sql = mysql.format(sql, query[i].sacks_harvested);
		sql = mysql.format(sql, query[i].stage_harvested);
		sql = mysql.format(sql, query[i].type);
		sql = mysql.format(sql, query[i].cct_id);
	}
	
	mysql.query(sql, next);
}

exports.readHarvestDetail = function(query, next) {
	var sql = "select * from harvest_details where ?";
	sql = mysql.format(sql, query);
	
	mysql.query(sql, next);
}

exports.updateHarvestDetail = function(update, filter, next) {
	var sql = "update harvest_details set ? where ?";
	sql = mysql.format(sql, update);
	sql = mysql.format(sql, filter);
	
	mysql.query(sql, next);
}

exports.deleteHarvestDetail = function(query, next) {
	var sql = "delete from harvest_details where ?"
	sql = mysql.format(sql, query);
	mysql.query(sql, next);
}