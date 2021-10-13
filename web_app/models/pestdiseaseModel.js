var mysql = require('./connectionModel');
mysql = mysql.connection;

exports.getAllSymptoms = function(next){

};

exports.getPestSymptoms = function(pest_id, next){
    var sql = "SELECT st.symptom_id, st.symptom_name, st.symptom_desc FROM pest_table p INNER JOIN symptoms_pest sp ON p.pest_id = sp.pest_id INNER JOIN symptoms_table st ON sp.symptom_id = st.symptom_id WHERE p.pest_id = ?;"
	sql = mysql.format(sql, pest_id);
	mysql.query(sql, next);
}