function processForecastDB(data) {
	var date, day;
	var cont_arr = [];
	var obj = {};

	const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

	const unique = [...new Map(data.map(item =>
	  [item['date'], item.date])).values()];
	var temp_min, temp_max;

	for (var i = 0; i < unique.length; i++) {
		var filtered_forecast = data.filter(forecast => forecast.date == unique[i]);
		date = new Date(unique[i]);
		day = days[date.getDay()];

		obj['date'] = formatDate(date, 'mm DD, YYYY');
		obj['day'] = day;
		obj['data'] = [];
		for (var y = 0; y < filtered_forecast.length; y++) {
			if (y == 0) {
				temp_min = filtered_forecast[y].min_temp;
				temp_max = filtered_forecast[y].max_temp;
			}
			else {
				if (temp_min > filtered_forecast[y].min_temp)
					temp_min = filtered_forecast[y].min_temp

				if (temp_max < filtered_forecast[y].max_temp)
					temp_max = filtered_forecast[y].max_temp;
			}

			delete filtered_forecast[y].date;
			obj['data'].push(filtered_forecast[y]);
			obj['icon'] = processIcons(filtered_forecast[0].desc);
		}
		obj['max_temp'] = temp_max;
		obj['min_temp'] = temp_min;
		
		cont_arr.push(obj);
		obj = {};
	}
	return cont_arr;
}

function processIcons(desc) {
	var icon = '';
	if (desc == 'light rain') {
		icon = 'fas fa-cloud-rain';
	}
	else if (desc == 'overcast clouds') {
		icon = '';
	}
	else if (desc == 'heavy intensity rain') {
		icon = 'fas fa-cloud-showers-heavy';
	}
	else if (desc == 'few clouds') {
		icon = 'fas fa-cloud-sun';
	}
	else if (desc == 'clear sky') {
		icon = 'fas fa-sun';
	}
	else if (desc == 'scattered clouds') {
		icon = 'fas fa-cloud-meatball';
	}
	else {
		console.log('Unknown desc please add in js file!');
		console.log(desc);
	}
	return icon;
}

function createForecastCards(data) {
	var th, h2, h4, h6, div, i, small1, small2;

	th = document.createElement('th');
	th.setAttribute('style', 'border-style: none;');

	h2 = document.createElement('div');
	h2.setAttribute('class', 'justify-content-xl-center text-muted');
	h2.setAttribute('style', 'color: #332C1F;font-size: 12px;');
	h2.innerHTML = data.day;

	h4 = document.createElement('div');
	h4.setAttribute('class', 'justify-content-xl-center');
	h4.setAttribute('style', 'color: #332C1F;font-size: 12px;');
	h4.innerHTML = data.date;

	h6 = document.createElement('h6');
	h6.setAttribute('class', 'text-muted justify-content-xl-center text-align-center');
	h6.setAttribute('style', 'text-align: center !important;');

	i = document.createElement('i');
	i.setAttribute('class', 'justify-content-xl-center '+data.icon);
	i.setAttribute('style', 'color: #332C1F;font-size: 35px;');

	h6.appendChild(i);

	div = document.createElement('div');
	div.setAttribute('class', 'd-flex');

	small1 = document.createElement('small');
	small1.setAttribute('class', 'form-text font-weight-bold');
	small1.setAttribute('style', 'color: #332C1F;');
	small1.innerHTML = data.max_temp+'° ';

	small2 = document.createElement('small');
	small2.setAttribute('class', 'form-text text-muted');
	small2.setAttribute('style', 'color: #332C1F;');
	small2.innerHTML = data.min_temp+'°';

	div.appendChild(small1);
	div.appendChild(small2);

	th.appendChild(h2);
	th.appendChild(h4);
	th.appendChild(h6);
	th.appendChild(div);

	return th;
}

function appendForecastCards(arr) {
	var table = $('#weather_table');
	var tr;
	tr = document.createElement('tr');

	for (var i = 0; i < 14; i++) {
		tr.appendChild(createForecastCards(arr[i]));
	}

	table.append(tr);
}

function switchWeek(week, event) {
	var inner = $('#carousel_inner').children();

	$(inner[0]).toggleClass('hide');
	$(inner[1]).toggleClass('hide');

	$(event).toggleClass('active');
	
	if (!week)
		$(event).next().toggleClass('active');
	else
		$(event).prev().toggleClass('active');
}

function appendForecastDetails(data) {
	$('#icon_detail').html(data.icon);
	$('#temp_detail').html(data.max_temp);
	$('#precipitation_detail').html(data.data[0].pressure);
	$('#humidity_detail').html(data.data[0].humidity);
	$('#rainfall_detail').html(data.data[0].rainfall);
	$('#weather_day_detail').html(data.date);
	$('#weather_desc_detail').html('');
}

function appendRecommendation(obj) {
	$('#weather_outlook').html(obj.risk_lvl);
	$('#weather_summary').html(obj.msg);
}

function generateRecommendation(arr) {
	var obj = {};
	var good_obj = {};
	var stats = {
		good: [], bad: [], risk_lvl: 0, msg: ''
	};
	var avg_rainfall = 0;
	var counter = 0;

	var start_date, end_date, good_start, good_end;
	var chain = false, good_chain = false;
	var push = false, good_push = false;


	for (var i = 0; i < arr.length; i++) {
		var count = arr[i].data.filter(data => data.desc == 'light rain').length;
		//console.log(arr[i].date+' - '+count);

		// Start bad day cycle if rainfall happens thrice in a day
		if (count >= 3) {

			if (!chain) {
				start_date = arr[i].date;
				chain = true;

				obj['start'] = start_date;
				
				avg_rainfall = count;
				counter = 1;
			}
			else {
				avg_rainfall += count;
				counter++;
			}

			if (good_chain) {
				good_end = arr[i-1].date;
				good_chain = false;

				good_obj['end'] = good_end;

				var diff = dateDiff(good_obj.end, good_obj.start);

				if (diff >= 3) {
					good_push = true;
				}
			}
		}
		// 
		else {
			avg_rainfall = 0;
			counter = 0;

			if (chain) {
				end_date = arr[i-1].date;
				chain = false;

				obj['end'] = end_date;


				var diff = dateDiff(obj.end, obj.start);

				if (diff >= 3) {
					push = true;
				}
			}

			if (!good_chain) {
				good_start = arr[i].date;
				good_chain = true;

				good_obj['start'] = good_start;
			}
			
		}

		// Check for ongoing bad or good days on the last index
		if (i == arr.length - 1) {
			if (obj.start != undefined) {
				end_date = arr[i].date;
				obj['end'] = end_date;

				push = true;

			}

			if (good_obj.start != undefined) {
				good_end = arr[i].date;
				good_obj['end'] = good_end;

				good_push = true;
			}
		}

		if (push) {
			stats.bad.push(obj);
			obj = {};
			push = false;
		}

		if (good_push) {
			stats.good.push(good_obj);
			good_obj = {};
			good_push = false;
		}
	}
	//console.log('-------------------');
	//console.log(stats.good);
	//console.log(stats.bad);

	for (var i = 0; i < stats.bad.length; i++) {
		var diff = dateDiff(stats.bad[i].start, stats.bad[i].end);

		if (diff >= 5) {
			stats.risk_lvl += 3;
		}

		stats.risk_lvl += 1.5;
	}

	if (stats.risk_lvl >= 8) {
		stats.risk_lvl = 'High Risk';
	}
	else if (stats.risk_lvl < 8 && stats.risk_lvl >= 6) {
		stats.risk_lvl = 'Moderately Risky';
	}
	else {
		stats.risk_lvl = 'Low Risk';
	}

	if (stats.bad.length == 1) {
		stats.msg += 'Continuous rainfall is expected from '+stats.bad[0].start+' to '+stats.bad[0].end+' with fairly low risks of seed damages. The recommended date of planting is ';

		if (stats.good.length == 2) {
			stats.msg += 'from between '+stats.good[0].start+' until '+stats.good[0].end+' or '+stats.good[1].start+' until '+stats.good[1].end+'.';
		}
		else {
			stats.msg += 'from '+stats.good[0].start+' onwards.';
		}
	}
	else if (stats.bad.length >= 2) {
		var date_diff = dateDiff(stats.bad[0].end, stats.bad[1].start);
		stats.msg += 'Multiple cycles of rainfall is expected within the next two weeks with the first rainfall expecting to hit by '+stats.bad[0].start+' which would last until '+stats.bad[0].end+' and the second cycle is expected to start '+date_diff+' days after the end of the first cycle on '+stats.bad[1].start+' and is expected to last until '+stats.bad[1].end+'.With this, the recommended date of planting is between '+stats.good[0].start+' and '+stats.good[0].end+'.';


	}

	appendRecommendation(stats);
}

function formatDate(date, format) {
	var year,month,day;
	const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
	  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];
	year = date.getFullYear();
	month = date.getMonth()+1;
	day = date.getDate();

	if (format === 'MM/DD/YYYY') {
		if (month < 10)
			month = '0'+month;
		if (day < 10)
			day = '0'+day;
		date = month+'/'+day+'/'+year;
	}
	else if (format === 'YYYY-MM-DD') {
		if (month < 10)
			month = '0'+month;
		if (day < 10)
			day = '0'+day;
		date = year+'-'+month+'-'+day;
	}
	else if (format === 'mm DD, YYYY') {
		date = monthNames[month]+' '+day+', '+year;
	}

	return date;
}

function normalizeForDB(result, hour) {
	var temp_obj = {};
	var cont_arr = [];
	var date;
	result = result.forecast;

	for (var i = 0; i < result.length; i++) {
		for (var y = 0; y < result[i].data.length; y++) {
			temp_obj = {};

			date = new Date(result[i].date);
			date = formatDate(date, 'YYYY-MM-DD');

			temp_obj['date'] = date;
			temp_obj['time'] = result[i].data[y].time;
			temp_obj['weather_id'] = result[i].data[y].id;
			temp_obj['desc'] = result[i].data[y].desc;
			temp_obj['humidity'] = result[i].data[y].humidity;
			temp_obj['max_temp'] = result[i].data[y].max_temp;
			temp_obj['min_temp'] = result[i].data[y].min_temp;
			temp_obj['name'] = result[i].data[y].name;
			temp_obj['pressure'] = result[i].data[y].pressure;
			temp_obj['rainfall'] = result[i].data[y].rainfall;
			temp_obj['time_uploaded'] = hour;

			cont_arr.push(temp_obj);
		}
	}
	return {data:cont_arr};
}

$(document).ready(function() {
	var d1 = new Date(Date.now());
	var d2 = new Date(Date.now());
	d2.setDate(d2.getDate() - 10);
	var refresh_on = 0;
	var loaded = false;

	setInterval(function() {
		var hour = new Date();
		hour = hour.getHours();

		////console.log(hour+' - '+refresh_on);

		/************  Weather Forecast to DB Start *************/
		$.get('/get_weather_forecast', {}, function(forecast_result) {

			if (forecast_result == 0) {
				console.log('Generating weather forecast...');
				refresh_on = hour + 1;
				$.get('/agroapi/weather/forecast', { start: d2, end: d1 }, function(result) {
					let query = normalizeForDB(result, hour);

					$.post('/upload_weather_forecast', query, function(upload_result) {
						//console.log('DB upload success');

						loaded = false;
					});
				});	
			}
			else if (hour == refresh_on && hour != forecast_result[0].time_uploaded) {
				console.log(new Date()+' : Deleting DB records...');
				$.get('/clear_weather_forecast', {}, function(status) {

					console.log('Generating weather forecast...');
					refresh_on = hour + 1;
					$.get('/agroapi/weather/forecast', { start: d2, end: d1 }, function(result) {
						let query = normalizeForDB(result, hour);

						$.post('/upload_weather_forecast', query, function(upload_result) {
							console.log('DB upload success');

							loaded = false;
						});
					});	
				})
			}
			else {
				console.log('Getting weather forecast...');

				refresh_on = forecast_result[0].time_uploaded + 1;
			}

			/************  DB to UI Start *************/
			//console.log(view+' - '+loaded);
			if (view == 'farm_monitoring' && loaded == false) {

				loaded = true;
				$('#weather_table').empty();
				appendForecastCards(processForecastDB(forecast_result));
				//appendForecastDetails(result.forecast[0]);

				// // Recommendation
				// generateRecommendation(result.forecast);

				// $('.carousel-inner').on('click', '.forecast_card', function() {
				// 	var card = $('.forecast_card').index(this);

				// 	appendForecastDetails(result.forecast[card]);
				// });
			}

			/************  DB to UI End *************/
		});
		/************  Weather Forecast to DB End *************/


	}, 12000);

});