var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.getNotifs = function(next){
    var sql = "SELECT * FROM notification_table WHERE status = 1 ORDER BY notification_id DESC";
    mysql.query(sql, next);
}

exports.updateNotif = function(notification_id, next){
    var sql = "UPDATE notification_table SET status = 0 WHERE notification_id = ?";
    sql = mysql.format(sql, notification_id);
    mysql.query(sql, next);
}

exports.getAllNotifs = function(next){
    var sql = "SELECT * FROM notification_table ORDER BY notification_id DESC";
    mysql.query(sql, next);
};

exports.createNotif = function(notif, next){
    var sql = "INSERT INTO notification_table SET ?";
    sql = mysql.format(sql, notif);
    console.log(sql);
    mysql.query(sql, next);
};