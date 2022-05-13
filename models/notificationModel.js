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

exports.updateUserNotif = function(data, filter, next) {
    var sql = `update user_notification_table set ? `;
    var filter_sql = `where ?`;
    sql = mysql.format(sql, data);
    filter_sql = mysql.format(filter_sql, filter);
    while(filter_sql.includes(',')) {
        filter_sql = filter_sql.replace(',', ' and ');
    }
    var temp_str = `(select user_id from user_table where employee_id = ${filter.user_id})`;
    filter_sql = filter_sql.replace(filter.user_id, temp_str);
    sql += filter_sql;

    mysql.query(sql, next);
}

exports.getAllNotifs = function(next){
    var sql = "SELECT * FROM notification_table ORDER BY date desc, notification_id DESC";
    mysql.query(sql, next);
};

exports.getUserNotifs = function(data, next) {
    var sql = `select unt.*, nt.* from notification_table nt join user_notification_table unt on nt.notification_id = unt.notif_id where user_id = (select user_id from employee_table et join user_table ut using(employee_id) where et.employee_id = ?) order by date desc, color, notification_id`;
    sql = mysql.format(sql, data.employee_id);
    mysql.query(sql, next);
}

// Create notifs according to user role and notif type notif types = WO_REMINDER, MATERIAL_REQUEST, NEW_WO, SMS_QUERY, DISASTER_WARNING, RECOMMENDATION, LOW_STOCK, PD_DIAGNOSED
exports.createUserNotif = function(next) {
    var sql = `insert into user_notification_table (notif_id, user_id) ( ( select nt.notification_id, ut.user_id from notification_table nt join user_table ut where notification_id not in (select notif_id from user_notification_table) and ( type = 'WO_REMINDER' and access_level in (0,1) ) or ( type = 'MATERIAL_REQUEST' and access_level in (2) ) or ( type = 'NEW_WO' and access_level in (1) ) or ( type = 'SMS_QUERY' and access_level in (0,1) ) or ( type = 'LOW_STOCK' and access_level in (0,1,2) ) or ( type = 'PD_DIAGNOSED' and access_level in (0,1,2) ) or ( type = 'DISASTER_WARNING' and access_level in (0,1,2) ) or ( type = 'RECOMMENDATION' and access_level in (0,1) ) ) )`;
    mysql.query(sql, next);
}

exports.createNotif = function(notif, next){
    if (Array.isArray(notif)) {

        var sql = "insert into notification_table (date, notification_title, notification_desc, farm_id, url, icon, color, status, type) values ";
        for (var i = 0; i < notif.length; i++) {
            if (i != 0) {
                sql += ', ';
            }
            sql += ' ('+(Object.values(notif[i])).join(',')+')';
        }
        // while (sql.includes('null')) {
        //     sql = sql.replace('null', null);
        // }
    }
    else {
        var sql = "INSERT INTO notification_table SET ?";
        sql = mysql.format(sql, notif);
    }

    mysql.query(sql, next);
};