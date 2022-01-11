var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.getNotifs = function(next){
    var sql = "SELECT * FROM notification_table WHERE status = 1";
    mysql.query(sql, next);
}

exports.updateNotif = function(notification_id, next){
    var sql = "UPDATE notification_table SET status = 0 WHERE notification_id = ?";
    sql = mysql.format(sql, notification_id);
    mysql.query(sql, next);
}

exports.getAllNotifs = function(next){
    var sql = "SELECT * FROM notification_table";
    mysql.query(sql, next);
};