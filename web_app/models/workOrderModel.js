var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.createWorkOrder = function(query, next) {
	var sql = "insert into work_order_table set ?;";
	sql = mysql.format(sql, query);
	mysql.query(sql, next);
}

exports.createWorkOrderResources = function(query, next) {
	var sql = "insert into wo_resources_table (work_order_id, type, qty, item_id) values ";
	for (var i = 0; i < query.length; i++) {
		if (i != 0) {
			sql += ', ';
		}

		sql += '(?, ?, ?, ?)';
		sql = mysql.format(sql, query[i].work_order_id);
		sql = mysql.format(sql, query[i].type);
		sql = mysql.format(sql, query[i].qty);
		sql = mysql.format(sql, query[i].item_id);
	}

	mysql.query(sql, next);
}

exports.getWorkOrders = function(query, next) {
	var sql = 'select work_order_table.*, case when notes is null then "N/A" else notes end as wo_notes , farm_table.farm_name, farm_table.farm_id from work_order_table join crop_calendar_table on crop_calendar_id = calendar_id join farm_table using (farm_id) ';
	if (JSON.stringify(query) != '{ }') {
		if (query.hasOwnProperty('where') && query.where != null) {
			for (var i = 0; i < query.where.key.length; i++) {
				if (i == 0) {
					sql += ' where '+query.where.key[i]+' = ?';
				}
				else {
					sql += ' and '+query.where.key[i]+' = ?';
				}
				sql = mysql.format(sql, query.where.value[i]);
			}
		}

		if (query.hasOwnProperty('group')) {
			sql += ' group by '+query.group;
			
		}

		if (query.hasOwnProperty('order')) {
			for (var i = 0; i < query.order.length; i++) {
				if (i == 0) {
					sql += ' order by '+query.order[i];
				}
				else {
					sql += ' , '+query.order[i];
				}
			}
		}
	}
	mysql.query(sql, next);
}