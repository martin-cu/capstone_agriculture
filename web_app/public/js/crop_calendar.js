function changeFarmDetails(id, farm_list) {
	var i = 0;
	while (farm_list[i].farm_id != id) {
		i++;
	}
	$('#farm_desc').html(farm_list[i].farm_desc);
	$('#land_type').html(farm_list[i].land_type);
	$('#farm_area').html(farm_list[i].farm_area);
}

function setElementAttributes(ele, obj_arr) {
	for (var i = 0; i < obj_arr.prop.length; i++) {
		if (obj_arr.prop[i] == 'inner_HTML')
			ele.innerHTML = obj_arr.val[i]
		else
			ele.setAttribute(obj_arr.prop[i], obj_arr.val[i]);
	}

	return ele;
}

function processForecastData(data) {
	const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var day = new Date(data.date);
	day = weekday[day.getDay()];
	var icon = '';
	if (data.data[0].desc == 'light rain') {
		icon = '<i class="fas fa-cloud-rain"></i>';
	}
	else if (data.data[0].desc == 'overcast clouds') {
		icon = '<i class="fad fa-clouds"></i>';
	}
	else if (data.data[0].desc == 'heavy intensity rain') {
		icon = '<i class="fas fa-cloud-showers-heavy"></i>';
	}
	else if (data.data[0].desc == 'few clouds') {
		icon = '<i class="far fa-cloud"></i>';
	}
	else if (data.data[0].desc == 'clear sky') {
		icon = '<i class="fas fa-cloud-sun"></i>';
	}
	else {
		console.log(data.data[0].desc);
	}

	data['day'] = day;
	data['icon'] = icon;

	return data;
}

function createForecastCards(data, width, active) {
	var cont, day_div, icon_div, temp_cont, max_temp, min_temp, item;

	data = processForecastData(data);

	cont = document.createElement('div');
	cont.setAttribute('class', 'forecast_card');
	cont.setAttribute('style', 'width: '+width/7+'px');

	day_div = document.createElement('div');
	day_div.innerHTML = data.day;

	icon_div = document.createElement('div');
	icon_div.innerHTML = data.icon;
	
	temp_cont = document.createElement('div');
	temp_cont.setAttribute('class', 'd-inline-flex');
	temp_cont.setAttribute('style', 'font-size:10px;');

	max_temp = document.createElement('div');
	max_temp.innerHTML = data.max_temp+'° /';

	min_temp = document.createElement('div');
	min_temp.setAttribute('class', 'pl-1');
	min_temp.innerHTML = data.min_temp+'°';

	temp_cont.appendChild(max_temp);
	temp_cont.appendChild(min_temp);

	cont.appendChild(day_div);
	cont.appendChild(icon_div);
	cont.appendChild(temp_cont);

	return cont;
}

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

function dateDiff(d1, d2) {
	var diff = new Date(d1) - new Date(d2);
	diff /= 86400000;

	return diff;
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

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

$(document).ready(function() {
	var farm_select = $('#farm_id'), seed_select = $('#seed_id');
	var farm_list, seed_list;

	$('#crop_calendar_form').on('submit', function(e) {
		e.preventDefault();

		var form_data = $('#crop_calendar_form').serializeJSON();

		console.log(form_data);

		$.post('/create_crop_plan', form_data, function(crop_plan) {

		});
	})

	$.get('/get_crop_plans', { status: ['Active', 'In-Progress'], unique: true}, function(plans) {

		var plan_arr = [];
		for (var i = 0; i < plans.length; i++) {
			plan_arr.push(plans[i].crop_plan);
		} 
		autocomplete(document.getElementById("crop_plan"), plan_arr);

	});

	$.get('/get_farm_list', {  }, function(result) {
		farm_list = result;
		for (var i = 0; i < result.length; i++) {
			farm_select.append("<option value='"+result[i].farm_id+"'>"+result[i].farm_name+"</option>");
		}
		changeFarmDetails(result[0].farm_id, farm_list);
	});

	$('#farm_id').on('change', function(e) {
		changeFarmDetails($(this).val(), farm_list);
	});

	$.get('/getMaterials', { type: 'Seed' }, function(result) {
		for (var i = 0; i < result.length; i++) {
			seed_select.append("<option value='"+result[i].seed_id+"'>"+result[i].seed_name+"</option>");
		}
	});

	// Load forecast
	setTimeout(function() {
		console.log('Getting weather forecast...');
		var d1 = new Date(Date.now());
		var d2 = new Date(Date.now());
		d2.setDate(d2.getDate() - 30);

		$.get('/agroapi/weather/forecast', { start: d2, end: d1 }, function(result) {
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