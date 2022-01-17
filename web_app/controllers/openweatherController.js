var request = require('request');
const dataformatter = require('../public/js/dataformatter.js');
const weatherForecastModel = require('../models/weatherForecastModel.js');


var key = 'd7aa391cd7b67e678d0df3f6f94fda20';
var temp_lat = 13.073091;
var temp_lon = 121.388563;

exports.get14DWeatherForecast = function(req, res) {
	var lat = req.query.lat, lon = req.query.lon, cnt = 14;
	lat = temp_lat;
	lon = temp_lon;

	var url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${key}`;

	request(url, {json: true}, function(err, response, body) {
		if (err)
			throw err;
		else {
			var query = [];
			var weather_obj;
			var date = new Date();
			var hour = date.getHours();

			for (var i = 0; i < body.list.length; i++) {
				weather_obj = {
					date: dataformatter.formatDate(dataformatter.unixtoDate(body.list[i].dt), 'YYYY-MM-DD'),
					humidity: body.list[i].humidity,
					max_temp: Math.round((body.list[i].temp.max - 273.15) * 100) / 100,
					min_temp: Math.round((body.list[i].temp.min - 273.15) * 100) / 100,
					pressure: body.list[i].pressure,
					rainfall: body.list[i].rain,
					weather_id: body.list[i].weather[0].id,
					desc: body.list[i].weather[0].description,
					time_uploaded: hour
				}
				query.push(weather_obj);
				weather_obj = {};
			}
			weatherForecastModel.saveForecastResults(query, function(err, status) {
				if (err)
					throw err;
				else {
					res.send(body);
				}
			});
					
		}
	})
}

exports.getNationalAlerts = function(req, res) {
	var lat = req.query.lat, lon = req.query.lon;
	lat = temp_lat;
	lon = temp_lon;

	var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${key}`;

	request(url, {json: true}, function(err, response, body) {
		if (err)
			throw err;
		else {
			if (body.hasOwnProperty('alerts')) {
				console.log(body.alerts);
			}
			res.send(body);
		}
	});
}

