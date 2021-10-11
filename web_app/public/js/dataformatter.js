function objectMerger(arr1, arr2, arr1_param, arr2_param, id) {
	var objArr = [];
	var obj;

	for (var i = 0; i < arr1.length; i++) {
		obj = arr1[i];
		obj[id] = [];

		for (var x = 0; x < arr2.length; x++) {
			if (arr1[i][arr1_param.key] == arr2[x][arr2_param.key]) {

				if (arr2_param.cleanse.length != 0) {
					for (var m = 0 ; m < arr2_param.cleanse.length; m++) {
						delete arr2[x][arr2_param.cleanse[m]];
					}
				}
				obj[id].push(arr2[x]);
			}
		}
		
		objArr.push(obj);
	}

	return objArr;
}


exports.aggregateFarmData = function(farms, plots, employees) {
	var objArr;

	var param1 = { key:'farm_id' };
	var param2 = { key:'farm_id', cleanse:['farm_id'] };
	var id = 'plots';

	objArr = objectMerger(farms, plots, param1, param2, id);

	var param1 = { key:'farm_id' };
	var param2 = { key:'assigned_farm', cleanse:['assigned_farm'], append_key:'position', append_var:'Farm Manager' };
	var id = 'employees';

	objArr = objectMerger(objArr, employees, param1, param2, id);

	return objArr;
}
exports.parseCoordinate = function(data) {
	var counter = 0;
	var coordArr = [], arr = [], apiArr = [];
	if (data.length % 2 != 0 || data.length == 0) {
		return false;
	}
	else {
		for (var i = 0; i < data.length; i++) {
			arr.push(data[i]);


			counter++;

			if (counter == 2) {
				coordArr.push(arr);

				arr = [];
				counter = 0;
			}
		}
	}
	apiArr.push(coordArr)
	
	return apiArr;
}

exports.dateToUnix = function(date) {
	let x = new Date(date);
	if (!x instanceof Date) {
		date = Date.parse(date);
	}

	return parseInt((new Date(date).getTime() / 1000).toFixed(0));
}

exports.unixtoDate = function(timestamp) {
	return new Date(timestamp * 1000);
}

exports.normalizeInitialForecast = function(arr) {
	var result_arr = [];
	var m = { };
	var x = 1;
	var date;
	var min_temp, max_temp, humidity, pressure, rainfall;
	for (var i = 0; i < arr.length - 1; i++) {
		date = formatDate(arr[i].dt, 'YYYY-MM-DD');
		min_temp = arr[i].main.temp_min;
		max_temp = arr[i].main.temp_max;
		humidity = arr[i].main.humidity;
		pressure = arr[i].main.pressure;
		rainfall = typeof arr[i].rain == 'undefined'? 0 : arr[i].rain['3h'];
		x = 1;

		do {
			i++;
			if (arr[i-1].main.temp_min > arr[i].main.temp_min)
				min_temp = arr[i].main.temp_min;
			if (arr[i-1].main.temp_max < arr[i].main.temp_max)
				max_temp = arr[i].main.temp_max;

			humidity += arr[i].main.humidity;
			pressure += arr[i].main.pressure;
			rainfall += typeof arr[i].rain == 'undefined'? 0 : arr[i].rain['3h'];

			x++;
		}
		while (i < arr.length-1 && formatDate(arr[i].dt, 'YYYY-MM-DD') == formatDate(arr[i+1].dt, 'YYYY-MM-DD'));

		humidity /= x;
		pressure /= x;

		m['dt'] = date;
		m['min_temp'] = min_temp;
		m['max_temp'] = max_temp;
		m['mean_humidity'] = humidity;
		m['mean_pressure'] = pressure;
		m['total_rainfall'] = rainfall;

		result_arr.push(m);
		m = {};
	}
	
	return result_arr;
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
	else if (format === 'HH:m') {
		var hour = parseInt(date.getHours());
		var lbl;
		if (hour < 12)
			lbl = 'AM';
		else {
			lbl = 'PM';
		}

		if (hour == 0)
			hour = 12;
		else if (hour > 12)
			hour -= 12;

		date = hour+':'+date.getMinutes()+lbl;
	}

	return date;
}