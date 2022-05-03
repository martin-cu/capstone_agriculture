var mysql = require('./connectionModel');
mysql = mysql.connection;


//USED FOR REGISTRATION THROUGH SMS
exports.addAccessToken = function(phone_number, access_token, next){
    var sql = "UPDATE employee_table SET access_token = ? WHERE phone_number = ?";
    sql = mysql.format(sql, access_token);
    sql = mysql.format(sql, phone_number);

    mysql.query(sql, next);
    return sql;
}

exports.removeAccessToken = function(phone_number, access_token, next){
    var sql = "UPDATE employee_table SET access_token = null WHERE phone_number = ? AND access_token = ?";
    sql = mysql.format(sql, phone_number);
    sql = mysql.format(sql, access_token);

    mysql.query(sql, next);
    return sql;
}


exports.getEmployeeDetailsAccessToken = function(access_token, next){
    var sql = "SELECT * FROM employee_table WHERE access_token = ?";
    sql = mysql.format(sql, access_token);

    mysql.query(sql, next);
    return sql;
}

exports.getEmployeeDetailsPhoneNum = function(phone_number, next){
    var sql = "SELECT * FROM employee_table WHERE phone_number = ?";
    sql = mysql.format(sql, phone_number);

    mysql.query(sql, next);
    return sql;
}

exports.getEmployeeDetails = function(data, next){
    var sql = "SELECT * FROM employee_table WHERE ";
    sql += data.key+' = ?';
	sql = mysql.format(sql, data.value);
    console.log(sql);
    mysql.query(sql, next);
    return sql;
}

exports.insertInboundMsg = function(message, message_id, employee_id, next){
    var sql = "INSERT INTO inbound_msg (message_id, message, employee_id, date, time) VALUES (?,?,?, DATE(NOW()), TIME(NOW()))";
    sql = mysql.format(sql, message_id);
    sql = mysql.format(sql, message);
    sql = mysql.format(sql, employee_id);

    mysql.query(sql, next);
    return sql;
}

exports.insertOutboundMsg = function(message, employee_id, next){
    var sql = "INSERT INTO outbound_msg (employee_id, message, date, time) VALUES (?, ?, DATE(NOW()), TIME(NOW()));";
    sql = mysql.format(sql, employee_id);
    sql = mysql.format(sql, message);

    mysql.query(sql, next);
    return sql;
}



exports.getSubscriptions = function(next){
    var sql = "SELECT *,  a.date as last_message, a.time as last_time FROM (SELECT im.message_id, im.message, im.employee_id, im.date, im.time  FROM inbound_msg im UNION SELECT om.message_id, om.message, om.employee_id, om.date, om.time FROM outbound_msg om ORDER BY date DESC, time DESC) a INNER JOIN employee_table et USING (employee_id) group by employee_id;";
    
    mysql.query(sql, next);
    return sql;
}

exports.getUserConverstation = function(employee_id, next){
    var sql = "SELECT * FROM (SELECT im.message_id, im.message, im.employee_id, im.date, TIME_FORMAT(im.time, '%h %i %p') as time, 'inbound' as origin  FROM inbound_msg im UNION SELECT om.message_id, om.message, om.employee_id, om.date, TIME_FORMAT(om.time, '%h %i %p') as time, 'outbound' as origin FROM outbound_msg om ORDER BY date ASC, time ASC) a WHERE employee_id = ?;";
    sql = mysql.format(sql, employee_id);

    mysql.query(sql, next);
    return sql;
}

exports.getSubscriptionsList = function(next){
    var sql = "SELECT et.*, a.date as last_message, a.time as last_time, a.message, fa.* FROM employee_table et LEFT JOIN (SELECT fa.*, ft.farm_name FROM farm_assignment fa LEFT JOIN farm_table ft USING (farm_id)) fa USING (employee_id) LEFT JOIN (SELECT * FROM (SELECT im.message_id, im.message, im.employee_id, im.date, im.time  FROM inbound_msg im UNION SELECT om.message_id, om.message, om.employee_id, om.date, om.time FROM outbound_msg om ORDER BY date DESC, time DESC) a group by employee_id) a USING (employee_id) WHERE access_token is not null GROUP by et.employee_id ORDER BY last_message DESC, last_time DESC;";

    mysql.query(sql, next);
    return sql;
}