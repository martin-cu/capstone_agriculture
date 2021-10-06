const employeeModel = require('../models/employeeModel');
const farmModel = require('../models/farmModel');
const dataformatter = require('../public/js/dataformatter.js');
const analyzer = require('../public/js/analyzer.js');
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

//**** NDVI and Satellite Imagery ****//
exports.getHistoricalNDVI = function(req, res) {
	var polygon_id = '603cd48056545d00081a7e33';
	var start_date = '2020-07-01', end_date = new Date("2021-07-01");
	var obj;

	start_date = dataformatter.dateToUnix(start_date);
	end_date = dataformatter.dateToUnix(end_date);

	var data = {
		polygon_id: polygon_id,
		start: start_date,
		end: end_date
	};

	var options = {
		url: 'https://api.agromonitoring.com/agro/1.0/ndvi/history?polyid='+polygon_id+'&start='+start_date+'&end='+end_date+'&appid='+key,
		method: 'GET',
		headers: {
			'Content-type':'application/json'
		},
		body: JSON.stringify(data)
	};

	request(options, function(err, response, body) {
		if (err)
			throw err;
		else {
			obj = body;
			
			var ndvi_data = analyzer.analyzeHistoricalNDVI(JSON.parse(body));

			console.log(ndvi_data.stats);

			res.render('home', {});
		}
	})
}

exports.getSatelliteImageryData = function(req, res) {
	var polygon_id = '603cd48056545d00081a7e33';
	var start_date = '2021-05-03', end_date = new Date("2021-06-28");
	var obj;

	start_date = dataformatter.dateToUnix(start_date);
	end_date = dataformatter.dateToUnix(end_date);

	var data = {
		polygon_id: polygon_id,
		start: start_date,

		end: end_date
	};

	var options = {
		url: 'https://api.agromonitoring.com/agro/1.0/image/search?polyid='+polygon_id+'&start='+start_date+'&end='+end_date+'&appid='+key,
		method: 'GET',
		headers: {
			'Content-type':'application/json'
		},
		body: JSON.stringify(data)
	};

	request(options, function(err, response, body) {
		if (err)
			throw err;
		else {
			body = JSON.parse(body);

			var result = body[body.length-1];
			result.dt = dataformatter.unixtoDate(result.dt);

			console.log(result.dt);

			res.render('home', {});
		}
	})
}

//**** Soil Data ****//
exports.getCurrentSoilData = function(req, res){
	var polygon_id = '603cd48056545d00081a7e33';
	var url = 'http://api.agromonitoring.com/agro/1.0/soil?polyid='+polygon_id+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	body = JSON.parse(body);
			body.dt = dataformatter.unixtoDate(body.dt);

        	console.log(body);

        	res.render('home', {});
        }
    });
}

//!!!!! havent tested yet because of this is a premium feature !!!!!//
exports.getHistoricalSoilData = function(req, res){
	var polygon_id = '603cd48056545d00081a7e33';
	var start_date = '2021-05-03', end_date = new Date("2021-06-28");
	var url = 'http://api.agromonitoring.com/agro/1.0/soil/history?start='+start_date+'&end='+end_date+'&polyid='+polygon_id+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	console.log(body);

        	res.render('home', {});
        }
    });
}


//!!!!! havent tested yet because of this is a premium feature !!!!!//
//**** Temperature and Precipitation ****//
exports.getAccumulatedTemperature = function(req, res){
	var polygon_id = '603cd48056545d00081a7e33';
	var start_date = '2021-05-03', end_date = new Date("2021-06-28");
	var lat = 35, lon = 139, threshold = 284;
	var url = 'http://api.agromonitoring.com/agro/1.0/weather/history?accumulated_temperature?lat='+lat+'&lon='+lon+'&threshold='+threshold+'&start='+start_date+'&end='+end_date+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	console.log(body);

        	res.render('home', {});
        }
    });
}

exports.getAccumulatedPrecipitation = function(req, res){
	var polygon_id = '603cd48056545d00081a7e33';
	var start_date = '2021-05-03', end_date = new Date("2021-06-28");
	var lat = 35, lon = 139, threshold = 284;
	var url = 'http://api.agromonitoring.com/agro/1.0/weather/history?accumulated_precipitation?lat='+lat+'&lon='+lon+'&threshold='+threshold+'&start='+start_date+'&end='+end_date+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	console.log(body);

        	res.render('home', {});
        }
    });
}

//**** Ultra Violet Index ****//
exports.getCurrentUVI = function(req, res){
	var polygon_id = '603cd48056545d00081a7e33';
	var url = 'http://api.agromonitoring.com/agro/1.0/uvi?polyid='+polygon_id+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
			body.dt = dataformatter.unixtoDate(body.dt);

        	console.log(body);

        	res.render('home', {});
        }
    });
}

exports.getHistoricalUVI = function(req, res){
	var polygon_id = '603cd48056545d00081a7e33';
	var start_date = '2021-03-03', end_date = new Date("2021-06-28");
	var url = 'http://api.agromonitoring.com/agro/1.0/uvi/history?polyid='+polygon_id+'&appid='+key+'&start='+start_date+'&end='+end_date;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	console.log(body);

        	res.render('home', {});
        }
    });
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
		else {
			console.log(body);

			res.render('home', {});
		}
	})
}

exports.getPolygonInfo = function(req, res){
	var polygon_id = '603cd48056545d00081a7e33';
	var url = 'http://api.agromonitoring.com/agro/1.0/polygons/'+polygon_id+'?appid='+key;
    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	console.log(body);

        	res.render('home', {});
        }
    });
}

exports.getAllPolygons = function(req, res){
	var url = 'http://api.agromonitoring.com/agro/1.0/polygons?appid='+key;
    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	console.log(body);

        	res.render('home', {});
        }
    });
}

exports.updatePolygonName = function(req, res){
	var polygon_id = '603cd48056545d00081a7e33';

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

        	res.render('home', {});
        }
    });
}

exports.removePolygon = function(req, res){
	// var polygon_id = ['615d3f2da81b763cf86816fe', '615d3f36a81b761a316816ff', '615d3f3ca81b76152a681700', 
	// '615d3f42a81b7600f8681701', '615d3f49a81b76f9c3681702', '615d3f4fa81b765116681703', '615d3f54a81b765dda681704', 
	// '615d3f5ba81b768572681705', '615d3fc8a81b76560a681706'];
	var polygon_id = ['615c4a15a81b76457968134a', '615c4acfa81b763e1268134b'];

	for (var i = 0; i < polygon_id.length; i++) {
		var options = {
			url: 'http://api.agromonitoring.com/agro/1.0/polygons/'+polygon_id[i]+'?appid='+key,
			method: 'DELETE'
		}

	    request(options, function(err, response, body) {
	        if (err)
	        	throw err;
	        else {
	        	console.log(body);

	        	res.render('home', {});
	        }
	    });
	}
}