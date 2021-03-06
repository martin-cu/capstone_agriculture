var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.updateLog = function(query, where, next){
    var sql = "UPDATE disaster_logs";

    if (query != null) {
        sql += ' set ?';
        sql = mysql.format(sql, query);
    }
    if (where != null) {
        if (typeof(where) == 'object') {
            if (where.hasOwnProperty('type')) {
                sql += ` where (`;
                where.type.forEach(function(item, index) {
                    sql += `type = ${item} `;
                    if (index == where.type.length-1)
                        sql += `)`;
                    if (index != where.type.length-1)
                        sql += ` or `;
                });
            }
        }
        else {
            sql += ' where ?';
            sql = mysql.format(sql, where);
        }
            
    }

    mysql.query(sql, next);
}

exports.deleteDisasterLog = function(query, next){
    var sql = "delete FROM disaster_logs";

    if (query != null) {
        sql += ' where ?';
        sql = mysql.format(sql, query);
    }

    mysql.query(sql, next);
};

exports.getDisasterLogs = function(query, next){
    var sql = "SELECT * FROM disaster_logs";
    if (typeof(query) == 'object' && query != null) {
        if (query.hasOwnProperty('type')) {
            sql += ` where status = ${query.status} and (`;
            query.type.forEach(function(item, index) {
                sql += `type = ${item} `;
                if (index == query.type.length-1)
                    sql += `)`;
                if (index != query.type.length-1)
                    sql += ` or `;
            });
        }
            
    }
    else if (query != null) {
        sql += ' where ?';
        sql = mysql.format(sql, query);
    }
    else {

    }
    sql += ' order by target_date desc';
    mysql.query(sql, next);
};

exports.createDisasterLog = function(warning, next){
    if (Array.isArray(warning)) {

        var sql = "insert into disaster_logs (max_temp, min_temp, pressure, humidity, weather, description, wind_speed, rainfall, wind_direction, status, type, date_recorded, target_date) values ";
        for (var i = 0; i < warning.length; i++) {
            if (i != 0) {
                sql += ', ';
            }
            sql += ' ('+(Object.values(warning[i])).join(',')+')';
        }
        while (sql.includes('"null"')) {
            sql = sql.replace('"null"', null);
        }
    }
    else {
        var sql = "INSERT INTO notification_table SET ?";
        sql = mysql.format(sql, warning);
    }
    //console.log(sql);
    mysql.query(sql, next);
};