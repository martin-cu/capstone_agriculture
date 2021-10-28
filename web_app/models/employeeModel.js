var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.addEmployee = function(data, next) {
	var sql = "insert into employee_table (position, last_name, first_name, phone_number) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.registerUser = function(data, next) {
	var sql = "insert into user_table (employee_id, username, password, access_level) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.queryEmployee = function(data, next) {
	var sql = 'select *, count(*) - 1 as num_assignments from ( select fa.employee_id, et.last_name, et.first_name, et.position, et.phone_number, fa.farm_id, ft.farm_name from farm_assignment fa join employee_table et on fa.employee_id = et.employee_id join farm_table ft on fa.farm_id = ft.farm_id union select employee_id, last_name, first_name, position, phone_number, null, null from employee_table ) as t1 where ? group by employee_id order by position, employee_id, num_assignments';
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
}

exports.filterFarmers = function(data, next) {
	var sql = 'select et.*, fa.farm_id, fa.status from employee_table et join farm_assignment fa on et.employee_id = fa.employee_id where ?';
	sql = mysql.format(sql, data);

	sql = sql
   .split('').reverse().join('')
   .replace(',', ' - ').replace(',', ' - ')
   .split('').reverse().join('');

   while (sql.includes(" - ")) {
		sql = sql.replace(" - ", ' and ');
	}

	mysql.query(sql, next);
}