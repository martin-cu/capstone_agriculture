const employeeModel = require('../models/employeeModel');
const farmModel = require('../models/farmModel');
const dataformatter = require('../public/js/dataformatter.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
var request = require('request');

//var key = '1d1823be63c5827788f9c450fb70c595'; // Unpaid
var key = '2ae628c919fc214a28144f699e998c0f'; // Paid API Key

var temp_lat = 13.073091;
var temp_lon = 121.388563;

exports.ajaxGetFarmList = function(req, res) {
	farmModel.getFarmData({ where: null, group: 'farm_id'}, function(err, farms) {
		if (err)
			throw err;
		else {
			res.send(farms);
		}
	});
}

exports.getDashboard = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'dashboard');

	res.render('home', html_data);
}

exports.getFarms = function(req, res) {
	farmModel.getAllFarms(function(err, farm_list) {
		if (err)
			throw err;
		else {
			var html_data = { farm_list: farm_list };
			html_data = js.init_session(html_data, 'role', 'name', 'username', 'farms');
			res.render('farms', html_data);
		}
	});
}

// ADD FARMS PAGE (TO BE UPDATED)
exports.getaddFarm = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'farms');
	res.render('add_farm', html_data);
}

exports.getFarmDetails = function(req, res) {
	var query = req.query;
	farmModel.filteredFarmDetails(query, function(err, details) {
		if (err)
			throw err;
		else {
			res.send(details);
		}
	});
}

exports.getMonitorFarms = function(req, res) {
	res.render('farm_monitoring_test', {});
}

exports.assignFarmers = function(req, res) {
	var query = req.body.query;

	farmModel.addAssignedFarmers(query, function(err, result) {
		if (err)
			throw err;
		else {
			console.log(result);
			res.send({ success: true });
		}
	});
}

exports.retireFarm = function(req, res) {
	var update = {
		status: 'Inactive'
	};
	var filter = {
		farm_name: req.params.id
	};
	farmModel.updateFarm(update, filter, function(err, result) {
		if (err)
			throw err;
		else {
			res.redirect('/farms');
		}
	});
}

exports.getCropCalendar = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'crop_calendar');
	res.render('crop_calendar', html_data);
}

exports.getAddCropCalendar = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'crop_calendar');
	res.render('crop_calendar_test', html_data);
}

exports.getHarvestCycle = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'harvest_cycle');
	res.render('harvest_cycle', html_data);
}

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

exports.singleFarmDetails = function(req, res) {
	var query = { where: { farm_name: req.body.farm_name } };
	farmModel.getFarmData(query, function(err, result) {
		if (err)
			throw err;
		else {
			//console.log(result);
			res.send({ farm_list: result });
		}
	});
}

exports.createFarmRecord = function(req, res) {
	var query = {
		farm_name: req.body.farm_name,
		farm_desc: req.body.farm_desc,
		farm_area: 0,
		land_type: req.body.land_type,
	};

	farmModel.addFarm(query, function(err, result) {
		if (err)
			throw err;
		else {
			var status = false;
			if (result.affectedRows)
				status = true;

			res.send({ success: status, farm_id: result.insertId });
		}
	});
}

//Environment Variable Queries

//**** NDVI and Satellite Imagery ****//
exports.getHistoricalNDVI = function(req, res) {
	var polygon_id = req.query.polyid;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var obj;

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

			//console.log(ndvi_data.stats);

			res.render('home', {});
		}
	})
}

exports.getSatelliteImageryData = function(req, res) {
	var polygon_id = req.query.polygon_id;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var obj;

	var data = {
		polygon_id: polygon_id,
		start: start_date,
		end: end_date,
		clouds_max: 0.7
	};

	var options = {
		url: 'https://api.agromonitoring.com/agro/1.0/image/search?polyid='+polygon_id+'&start='+start_date+'&end='+end_date+'&appid='+key+'&clouds_max=0.5',
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

			for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.formatDate(dataformatter.unixtoDate(body[i].dt), 'mm DD, YYYY');
        	}
			//var result = body[body.length-1];
			//result.dt = dataformatter.unixtoDate(result.dt);

			res.send(body);
		}
	})
}

//**** Soil Data ****//
exports.getCurrentSoilData = function(req, res){
	var polygon_id = req.query.polyid;
	var url = 'http://api.agromonitoring.com/agro/1.0/soil?polyid='+polygon_id+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
			body.dt = dataformatter.unixtoDate(body.dt);
			body.moisture *= 100;
			body = dataformatter.kelvinToCelsius(body, 'Soil');

        	res.send(body);
        }
    });
}

//!!!!! havent tested yet because of this is a premium feature !!!!!//
exports.getHistoricalSoilData = function(req, res){
	var polygon_id = req.query.polyid;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var url = 'http://api.agromonitoring.com/agro/1.0/soil/history?start='+start_date+'&end='+end_date+'&polyid='+polygon_id+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	res.render('home', {});
        }
    });
}


//!!!!! havent tested yet because of this is a premium feature !!!!!//
//**** Temperature and Precipitation ****//
exports.getAccumulatedTemperature = function(req, res){
	var polygon_id = req.query.polyid;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var lat = req.query.lat, lon = req.query.lon, threshold = req.query.threshold;

	lat = temp_lat;
	lon = temp_lon;

	var url = 'http://api.agromonitoring.com/agro/1.0/weather/history?accumulated_temperature?lat='+lat+'&lon='+lon+'&threshold='+threshold+'&start='+start_date+'&end='+end_date+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	res.render('home', {});
        }
    });
}

exports.getAccumulatedPrecipitation = function(req, res){
	var polygon_id = req.query.polyid;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var lat = req.query.lat, lon = req.query.lon, threshold = req.query.threshold;

	lat = temp_lat;
	lon = temp_lon;

	var url = 'http://api.agromonitoring.com/agro/1.0/weather/history?accumulated_precipitation?lat='+lat+'&lon='+lon+'&threshold='+threshold+'&start='+start_date+'&end='+end_date+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	res.render('home', {});
        }
    });
}

//**** Ultra Violet Index ****//
exports.getCurrentUVI = function(req, res){
	var polygon_id = req.query.polyid;
	var url = 'http://api.agromonitoring.com/agro/1.0/uvi?polyid='+polygon_id+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
			body.dt = dataformatter.unixtoDate(body.dt);


        	res.render('home', {});
        }
    });
}

exports.getHistoricalUVI = function(req, res){
	var polygon_id = req.query.polyid;
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var url = 'http://api.agromonitoring.com/agro/1.0/uvi/history?polyid='+polygon_id+'&appid='+key+'&start='+start_date+'&end='+end_date;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	res.render('home', {});
        }
    });
}

//**** Weather API ****//
exports.getCurrentWeather = function(req, res){
	var polygon_id = req.query.polyid;
	var lat = req.query.lat, lon = req.query.lon;
	
	lat = temp_lat;
	lon = temp_lon;

	var url = 'https://api.agromonitoring.com/agro/1.0/weather?lat='+lat+'&lon='+lon+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	body.dt = dataformatter.unixtoDate(body.dt);
        	body = dataformatter.kelvinToCelsius(body, 'Weather');

        	res.send(body);
        }
    });
}

exports.getHistoricalWeather = function(req, res){
	var start_date = dataformatter.dateToUnix(req.query.start), end_date = dataformatter.dateToUnix(req.query.end);
	var lat = req.query.lat, lon = req.query.lon;
	
	lat = temp_lat;
	lon = temp_lon;

	var url = 'http://api.agromonitoring.com/agro/1.0/weather/history?lat='+lat+'&lon='+lon+'&start='+start_date+'&end='+end_date+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	res.send({ result: body, success: true });
        }
    });
    //res.send({});
}

// 
exports.getForecastWeather = function(req, res) {
	var start_date = dataformatter.dateToUnix(req.query.start), 
	end_date = dataformatter.dateToUnix(req.query.end);
	
	var lat = req.query.lat, lon = req.query.lon;
	lat = temp_lat;
	lon = temp_lon;


	var url = 'http://api.agromonitoring.com/agro/1.0/weather/history?lat='+lat+'&lon='+lon+'&start='+start_date+'&end='+end_date+'&appid='+key;

    request(url, { json: true }, function(err, response, body) {
        if (err)
        	throw err;
        else {
        	for (var i = 0; i < body.length; i++) {
        		body[i].dt = dataformatter.unixtoDate(body[i].dt);
        	}

        	//***** Call Agro API for succeeding 5 day forecast

        	var forecast_url = 'https://api.agromonitoring.com/agro/1.0/weather/forecast?lat='+lat+'&lon='+lon+'&appid='+key;
        	console.log(forecast_url);
		    request(forecast_url, { json: true }, function(err, forecast_response, forecast_body) {
		        if (err)
		        	throw err;
		        else {
		        	var hour_arr = [];
					//console.log(forecast_body);
		        	for (var i = 0; i < forecast_body.length; i++) {
		        		forecast_body[i].dt = dataformatter.unixtoDate((forecast_body[i].dt));
		        		hour_arr.push(dataformatter.formatDate(forecast_body[i].dt, 'HH:m'))
		        	}
		        	
		        	//***** Get unique hour timestamps from forecast and filter data
		        	hour_arr = [...new Map(hour_arr.map(item =>
	  					[item, item])).values()];

		        	body = dataformatter.smoothHourlyData(body, hour_arr);
		        	forecast_body = dataformatter.smoothHourlyData(forecast_body, hour_arr);

		        	//console.log(forecast_body);
		        	//***** Build on Agro API and use ANN to forecast remaining 9 days
		        	var result = analyzer.weatherForecast14D
		        	(dataformatter.prepareData(body, 1), dataformatter.prepareData(forecast_body, 1), hour_arr.length+1);
		        	var keys = ['min_temp', 'max_temp', 'humidity', 'pressure', 'rainfall', 'id'];
		        	
		        	result.forecast = 
		        	dataformatter.convertForecastWeather(dataformatter.arrayToObject(result.forecast, keys));

		        	forecast = dataformatter.mapAndFormatForecastResult(result, hour_arr);

		        	res.send({ forecast: forecast });
		        }
		    });
        }
    });
}

//Polygon Queries
exports.createPolygon = function(req, res) {
	var data = ({
		name: req.body.farm_name,
		geo_json: {
			type:"Feature",
			properties:{},
			geometry:{
				type:"Polygon",
				coordinates: typeof req.body.coordinates == 'undefined' || req.body.coordinates == null ? 0 : 
				dataformatter.coordinateToFloat(req.body.coordinates)// dataformatter.parseCoordinate(req.body.coordinates.split(',')) 
			}}
		});
	console.log(req.body.coordinates);
	console.log(data.geo_json.geometry.coordinates);

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

			res.send({ success: true });
		}
	})
}

exports.getPolygonInfo = function(req, res){
	var polygon_id = req.query.polyid;
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
        	//console.log(body);

        	res.send(body);
        }
    });
}

exports.updatePolygonName = function(req, res){
	var polygon_id = req.query.polyid;

	var data = {
		geo_json: {
			something: "something",
		},
		name: req.query.name
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
	var polygon_id = req.query.polyid;
	
	var options = {
		url: 'http://api.agromonitoring.com/agro/1.0/polygons/'+polygon_id+'?appid='+key,
		method: 'DELETE',
		followRedirect: false,
		followAllRedirects: false
	}

    request(options, function(err, response, body) {
        if (err)
        	throw err;
        else {

        	res.send({ success: true });
        }
    });

}