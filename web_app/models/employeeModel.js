var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.addEmployee = function(data, next) {
	var sql = "insert into employee_table (position, last_name, first_name, phone_number) values ?";
	sql = mysql.format(sql, data);
	mysql.query(sql, next);
};

exports.queryEmployee = function(data, next) {
	var str = '';
	if (data != null)
		str = 'where ? ';

	var sql = `select * from ( select max(user_id) as user_id, max(employee_id) as employee_id, max(last_name) as last_name, max(first_name) as first_name, max(position) as position, max(phone_number) as phone_number, max(farm_id) as farm_id, max(farm_name) as farm_name, max(username) as username, max(password) as password, max(access_level) as access_level, count(*) - 1 as num_assignments from ( select null as user_id, fa.employee_id, et.last_name, et.first_name, et.position, et.phone_number, fa.farm_id, ft.farm_name, null as username, null as password, null as access_level from farm_assignment fa join employee_table et on fa.employee_id = et.employee_id join farm_table ft on fa.farm_id = ft.farm_id union select null, employee_id, last_name, first_name, position, phone_number, null, null, null, null, null from employee_table union select user_id, employee_id, null, null, null, null, null, null, username, password, access_level from user_table ) as t1 group by employee_id order by position, farm_id, employee_id, num_assignments ) as t5 ${str}`;
	if (data != null)
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