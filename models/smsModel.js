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

exports.getEmployeeDetails = function(access_token, next){
    var sql = "SELECT * FROM employee_table WHERE access_token = ?";
    sql = mysql.format(sql, access_token);

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