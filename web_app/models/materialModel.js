var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.addPesticide = function(query, next) {

    var sql = "INSERT INTO capstone_agriculture_db.pesticide_table (pesticide_name, pesticide_desc, current_amount) VALUES ('Glorious','Used for dinorado', 600);"
	mysql.query(sql, next);
}