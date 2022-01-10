const brain = require('brain.js');
const DecisionTree = require('decision-tree');

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
}

exports.processDetailedFarmProductivity = function(fp, resources) {
	var fp_obj = {
		yield: { arr: [], total: 0 },
		inputs: { arr: [], total: 0 },
		productivity: 0
	}

	var category_cont;
	var cont_obj;
	var obj;
	var input_types = ['Seed', 'Fertilizer', 'Pesticide', 'Employee Labor'];
	var input_categories = ['Input Resources', 'Labor']
	var temp_arr;
	var index = 0;

	var input_obj = {
		name: fp[0].seed_name, forecasted_yield: fp[0].forecast_yield+' cavans/ha', 
		current_yield: fp[0].current_yield != null ? fp[0].current_yield+' cavans/ha' : 'N/A',
		total: fp[0].current_yield != null ? fp[0].current_yield * fp[0].farm_area+' cavans': 'N/A'
	}
	fp_obj.yield.arr.push(input_obj);
	fp_obj.yield.total = input_obj.total;

	for (var y = 0; y < input_categories.length; y++) {
		category_cont = { title: input_categories[y], rows: [], total: 0 };

		for (var i = index; i < input_types.length; i++) {
			temp_arr = resources.filter(e => e.type == input_types[i]);

			cont_obj = { title: input_types[i], rows: [], total: 0 };
			for (var x = 0; x < temp_arr.length; x++) {
				obj = { input: temp_arr[x].resource_name, qty: temp_arr[x].qty, units: temp_arr[x].resource_unit, 
					cost_per_unit: numberWithCommas((Math.round(parseFloat(temp_arr[x].price) * 100)/100).toFixed(2)), 
					total_cost: numberWithCommas((Math.round(parseFloat(temp_arr[x].total_cost) * 100)/100).toFixed(2)) };
				
				cont_obj.total += parseFloat(temp_arr[x].total_cost);
				cont_obj.rows.push(obj);
				fp_obj.inputs.total += parseFloat(temp_arr[x].total_cost);
			}
			cont_obj.total = numberWithCommas((Math.round(cont_obj.total * 100)/100).toFixed(2));
			if (input_categories[y] == 'Input Resources' && input_types[i] != 'Employee Labor' 
				|| input_categories[y] == 'Labor' && input_types[i] == 'Employee Labor') {
				category_cont.rows.push(cont_obj);
			}
		}
		fp_obj.inputs.arr.push(category_cont);
		index++;
	}

	fp_obj.productivity = fp_obj.yield.total != 'N/A' ? (Math.round(parseInt(fp_obj.yield.total.replace(' cavans','')) / fp_obj.inputs.total * 1000) / 1000)+' cavans per peso' : 'N/A';
	fp_obj['cost_per_cavan'] = fp_obj.yield.total != 'N/A' ? (Math.round(fp_obj.inputs.total / parseInt(fp_obj.yield.total.replace(' cavans','')) * 1000) / 1000)+' pesos per cavan per' : 'N/A';
	fp_obj.inputs.total = numberWithCommas((Math.round(fp_obj.inputs.total * 100)/100).toFixed(2));

	return fp_obj;
}

exports.calculateProductivity = function(fp_overview, input_resources) {
	for (var i = 0; i < fp_overview.length; i++) {
		fp_overview[i]['input_items'] = input_resources.filter(e => fp_overview[i].calendar_id == e.calendar_id);
		fp_overview[i]['net_spend'] = fp_overview[i]['input_items'].reduce((a, b) => a + b.total_cost, 0);
		fp_overview[i]['prev_input_items'] = input_resources.filter(e => fp_overview[i].max_prev_calendar == e.calendar_id);
		fp_overview[i]['prev_net_spend'] = fp_overview[i]['prev_input_items'].reduce((a, b) => a + b.total_cost, 0);

		fp_overview[i]['current_productivity'] = 'N/A';
		fp_overview[i]['prev_productivity'] = Math.round((fp_overview[i].max_previous_yield / fp_overview[i].prev_net_spend) * 100000) / 100000;
		
		fp_overview[i].current_yield = fp_overview[i].current_yield != null ? fp_overview[i].current_yield
			 : fp_overview[i].current_yield = 'N/A';
		fp_overview[i]['current_productivity'] = fp_overview[i].current_yield != 'N/A' ? Math.round((fp_overview[i].current_yield / fp_overview[i].net_spend) * 100000) / 100000 : 'N/A';
		
		fp_overview[i]['change'] = { 
			val: fp_overview[i].current_productivity != 'N/A' ? 
				fp_overview[i].current_productivity > fp_overview[i].prev_productivity ? 
				fp_overview[i].current_productivity / fp_overview[i].prev_productivity :
				fp_overview[i].prev_productivity / fp_overview[i].current_productivity
				: 0,
			arrow: fp_overview[i].current_productivity != 'N/A' ? 
				fp_overview[i].current_productivity > fp_overview[i].prev_productivity ? 
				'up' :
				'down'
				: 'up'
		};

		fp_overview[i].change.val = fp_overview[i].change.val != 0 ? parseInt((fp_overview[i].change.val * 100) - 100) : 0;
		fp_overview[i].change.color = fp_overview[i].change.arrow == 'up' ? 
		fp_overview[i].change.val != 0 ? 'text-success' : 'text-muted' : 'text-danger';
	}

	//console.log(fp_overview);
	return fp_overview;
}

 exports.processNutrientRecommendation = function(data) {
 	
 }

function denormalizeData(data, val) {
	return val.min + data * (val.max - val.min);
}

function parseDecimal(num, decimal) {
	return parseFloat((num).toFixed(decimal));
}

// [temp, humidity, pressure, rainfall, seed_type, yield, N, P, K, seed rate]
exports.forecastYield = function(dataset, testing) {
	const net = new brain.brain.recurrent.LSTMTimeStep({
	  inputSize: 10,
	  hiddenLayers: [9],
	  outputSize: 10,
	});
	const trainingData = [dataset.data];
	//console.log(trainingData);
	net.train(trainingData, { 
		//log: true 
	});
	//console.log(testing.data);
	const forecast = net.forecast(testing.data, 1);
	//console.log(forecast);
	//console.log(dataset.val);
	for (var i = 0; i < forecast.length; i++) {
		for (var x = 0; x < forecast[i].length; x++) {
			// console.log(dataset.val[x]);
			// console.log(x);
			forecast[i][x] = denormalizeData(forecast[i][x], dataset.val[x]);
		}
	}

	return forecast;
}

//!!
exports.weatherForecast14D = function(dataset, testing, length) {
	var result_obj;
	const net = new brain.brain.recurrent.LSTMTimeStep({
	  inputSize: 6,
	  hiddenLayers: [10],
	  outputSize: 6,
	});

	const trainingData = dataset.data_arr;

	net.train(trainingData, { 
		//log: true 
	});


	const forecast = net.forecast(testing.data_arr, 9 * length);

	var api_forecast = testing.data_arr;

	// Merge first 5 days from Agro API and 9 days from ANN forecast
	for (var i = 0; i < forecast.length; i++) {
		api_forecast.push(forecast[i]);
	}

	// Normalize values and process data
	for (var i = 0; i < dataset.denormalize_val.length; i++) {
		for (var x = 0; x < api_forecast.length; x++) {
			api_forecast[x][i] = denormalizeData(api_forecast[x][i], dataset.denormalize_val[i]);
		}
	}

	result_obj  = { forecast: api_forecast, weather_data: dataset.uniqueWeather };

	return result_obj;
}

exports.analyzeHistoricalNDVI = function(arr) {
	var resultObj = { stats: {}, dataArr: [] };
	var dc = 0, cl = 0, 
	std = 0, p25 = 0, p75 = 0, min = 0, max = 0, mean = 0, median = 0;

	for (var i = 0; i < arr.length; i++) {
		dc += arr[i].dc;
		cl += arr[i].cl;

		std += arr[i].data.std;
		p25 += arr[i].data.p25;
		p75 += arr[i].data.p75;
		min += arr[i].data.min;
		max += arr[i].data.max;
		mean += arr[i].data.mean;
		median += arr[i].data.median;

		resultObj.dataArr.push(arr[i]);
	}

	std /= (arr.length);
	p25 /= (arr.length);
	p75 /= (arr.length);
	min /= (arr.length);
	max /= (arr.length);
	mean /= (arr.length);
	median /= (arr.length);

	resultObj.stats['avg_dc'] = parseDecimal(dc,5);
	resultObj.stats['avg_cl'] = parseDecimal(cl,5);
	resultObj.stats['avg_std'] = parseDecimal(std,5);
	resultObj.stats['avg_p25'] = parseDecimal(p25,5);
	resultObj.stats['avg_p75'] = parseDecimal(p75,5);
	resultObj.stats['avg_min'] = parseDecimal(min,5);
	resultObj.stats['avg_max'] = parseDecimal(max,5);
	resultObj.stats['avg_mean'] = parseDecimal(mean,5);
	resultObj.stats['avg_median'] = parseDecimal(median,5);

	return resultObj;
}



