const dataformatter = require('../public/js/dataformatter.js');
const analyzer = require('../public/js/analyzer.js');
var request = require('request');

exports.getPestDiseaseManagement = function(req, res) {
	res.render('/pest_diseases', {});
}

exports.getNurientManagement = function(req, res) {
	res.render('/nutrient_mgt', {});
}