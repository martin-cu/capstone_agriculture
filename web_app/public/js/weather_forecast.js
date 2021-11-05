function appendForecastCards(arr) {
	var slide = $('#carousel_inner');
	var item = document.createElement('div');
	item.setAttribute('class', 'carousel-item d-inline-flex mx-2');

	for (var i = 0; i < 14; i++) {
		if (i == 7) {
			var item = document.createElement('div');
			item.setAttribute('class', 'carousel-item d-inline-flex hide mx-2');
		}
		item.appendChild(createForecastCards(arr.forecast[i], slide.width()))
		slide.append(item);

	}
	$('#page').toggleClass('hide');
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
		console.log(arr[i].date+' - '+count);

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
	console.log('-------------------');
	console.log(stats.good);
	console.log(stats.bad);

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

$(document).ready(function() {

	// Load forecast
	setTimeout(function() {
		console.log('Getting weather forecast...');
		var d1 = new Date(Date.now());
		var d2 = new Date(Date.now());
		d2.setDate(d2.getDate() - 10);

		$.get('/agroapi/weather/forecast', { start: d2, end: d1 }, function(result) {
			console.log(result);
			appendForecastCards(result);
			appendForecastDetails(result.forecast[0]);


			// Recommendation
			generateRecommendation(result.forecast);

			$('.carousel-inner').on('click', '.forecast_card', function() {
				var card = $('.forecast_card').index(this);

				appendForecastDetails(result.forecast[card]);
			});

		});	
	}, 1000);
});