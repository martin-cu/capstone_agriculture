const employeeModel = require('../models/employeeModel');
const farmModel = require('../models/farmModel');
const dataformatter = require('../public/js/dataformatter.js');
var request = require('request');

var key = '1d1823be63c5827788f9c450fb70c595';

exports.getGeoMap = function(req, res) {
	farmModel.getFarmData(null, function(err, farm_data) {
		if (err) {
			throw err;
		}
		else {
			farmModel.getPlotData(null, function(err, plot_data) {
				if (err) {
					throw err;
				}
				else {
					employeeModel.queryEmployee('allEmployees', null, function(err, employee_data) {
						if (err) {
							throw err;
						}
						else {
							var html_data = { farm_data: dataformatter.aggregateFarmData(farm_data, plot_data, employee_data)};
							//console.log(html_data);
							res.render('home', {});
						}
					})
				}
			})
		}
	});
}


//Environment Variable Queries
exports.getHistoricalNDVI = function(req, res) {
	var polygon_id = '615c2d16a81b7613486812f8';
	var start_date = '', end_date = '';
	var data = {

	};

	var options = {
		url: 'http://api.agromonitoring.com/agro/1.0/ndvi/history?start='+start_date+'&end='+end_date+'&polyid='+polygon_id+'&appid='+key;
		method: 'GET';
		headers: {
			'Content-type':'application/json'
		}
	};
	request(options, function(err, response, body) {
		if (err)
			throw err;
		console.log(body);
	})

	res.render('home', {});
}

exports.getHistoricalNDVI = function(req, res) {
	var data = {

	};
	var options = {
		url: '';
		method: '';
		headers: {

		}
	};
	request(options, function(err, response, body) {
		if (err)
			throw err;
		console.log(body);
	})

	res.render('home', {});
}


//Polygon Queries
exports.createPolygon = function(req, res) {
	var data = ({
		name: "trial2",
		geo_json: {
			type:"Feature",
			properties:{},
			geometry:{
				type:"Polygon",
				coordinates:[[[108.6232,11.33567],[108.62224,11.3296],[108.61798,11.33297],[108.6232,11.33567]]]
			}}
		});
	var options = {
		url: 'http://api.agromonitoring.com/agro/1.0/polygons?appid='+key,
		method: 'POST',
		headers: {
			'Content-type':'application/json'
		},
		body: JSON.stringify(data)
	}

	request(options, function(err, response, body) {
		if (err)
			throw err;
		console.log(body);
	})

	res.render('home', {});
}

exports.getPolygonInfo = function(req, res){
	var polygon_id = '615c2d16a81b7613486812f8';
	var url = 'http://api.agromonitoring.com/agro/1.0/polygons/'+polygon_id+'?appid='+key;
    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	console.log(body);
        }
    });
    res.render('home', {});
}

exports.getAllPolygons = function(req, res){
	var url = 'http://api.agromonitoring.com/agro/1.0/polygons?appid='+key;
    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	console.log(body);
        }
    });
    res.render('home', {});
}

exports.updatePolygonName = function(req, res){
	var polygon_id = '615c2d16a81b7613486812f8';

	var data = {
		geo_json: {
			something: "something",
		},
		name: "new_name"
	};

	var options = {
		url: 'http://api.agromonitoring.com/agro/1.0/polygons/'+polygon_id+'?appid='+key,
		method: 'PUT',
		headers: {
			'Content-type':'application/json'
		},
		body: JSON.stringify(data)
	}

    request(options, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	console.log(body);
        }
    });
    res.render('home', {});
}

exports.removePolygon = function(req, res){
	var polygon_id = '615c2d16a81b7613486812f8';

	var options = {
		url: 'http://api.agromonitoring.com/agro/1.0/polygons/'+polygon_id+'?appid='+key,
		method: 'DELETE'
	}

    request(options, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	console.log(body);
        }
    });
    res.render('home', {});
}