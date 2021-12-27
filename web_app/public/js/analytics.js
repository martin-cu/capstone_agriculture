exports.holtWinters = function(data, period, products) {
	var alpha = 0.5, beta = 0.5, gamma = 0.5;
	if (data.length != 0) {
		var last_index;
		var forecast = [];
		var d = new Date();
		var date = d.getDate();
		var day = d.getDay();
		var curr_week = Math.ceil(Math.abs((date - 1 - day) / 7));
		var obj;
		var arr_data;
		var indices = [0, 1, 2, 3];
		for (var i = 0; i < products.length; i++) {
			forecast.push({ product: products[i].product_name });
		}

		for (var y = 0; y < forecast.length; y++) {
			arr_data = [];
			for (var x = 0; x < data.length; x++) {
				forecast[y]['week'] = curr_week;
				if (data[x].length > 0) {
					if (forecast[y].product === data[x][0].product_name ) {
						for (var i = 0; i < data[x].length; i++) {
							if (i < 4) {
								data[x] = prepInitialData(data[x], i, indices);
								last_index = i;
							}
							else {
								data[x] = prepDataPrediction(data[x], i, alpha, beta, gamma);
								last_index = i;
							}
						}
						forecast[y].data = [];
						for (var i = 1; i < 5; i++) {
							var temp = Math.ceil(( data[x][last_index].u + ((i + last_index) - last_index) * data[x][last_index].v ) * data[x][last_index + i - 4].s);
							forecast[y].data.push({ week: i, data: temp });
						}
					}
				}
				else {
					obj = forecast[y];
					obj['data'] = ['Cannot forecast insufficient data'];
					forecast[y] = obj;
				}
			}
		}
		if (period === 'Week') {
			return forecast;
		}
		else if (period === 'Month') {
			return forecast;
		}
	}
	else {
		return null
	}
}

function prepInitialData(data, i, indices) {
	data[i]['v'] = 0;
	data[i]['s'] = data[i].products_sold / avg(data, indices);
	data[i]['u'] = data[i].products_sold / data[i]['s'];

	if (isNaN(data[i].u))
		data[i].u = 1;
	if (isNaN(data[i].s) || data[i].s === 0)
		data[i].s = 1;

	return data;
}

function prepDataPrediction(data, i, alpha, beta, gamma) {
	data[i]['u'] = (alpha*data[i].products_sold) / data[i-4].s + ( (1 - alpha) * (data[i-1].u + data[i-1].v) );
	data[i]['v'] = beta*(data[i].u - data[i-1].u) + (1 - beta) * data[i-1].v;
	data[i]['s'] = gamma*(data[i].products_sold / data[i].u) + (1 - gamma) * data[i-4].s

	return data;
}

function avg(obj, indices) {
	var avg = 0;
	for (var i = 0; i < indices.length; i++) {
		avg += obj[indices[i]].products_sold;
	}
	avg = avg / indices.length;
	return avg;
}