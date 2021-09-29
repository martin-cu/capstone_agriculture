var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.addPesticide = function(query, next) {

    var sql = "INSERT INTO capstone_agriculture_db.pesticide_table (pesticide_name, pesticide_desc, current_amount) VALUES ('Glorious','Used for dinorado', 600);"
	mysql.query(sql, next);
}

exports.addSeed = function(seed_name, query, next) {

    var sql = "INSERT INTO capstone_agriculture_db.seed_table (seed_name, seed_desc, current_amount, maturity_days, average_yield) VALUES (?,'Used for dinorado', 500, 140, 100);"
	sql = mysql.format(sql, seed_name);
    mysql.query(sql, next);
}

