const brain = require('brain.js');
const DecisionTree = require('decision-tree');

function denormalizeData(data, val) {
	return val.min + data * (val.max - val.min);
}

function parseDecimal(num, decimal) {
	return parseFloat((num).toFixed(decimal));
}

//!! To add weather value based on weather data id
exports.weatherForecast14D = function(dataset) {
	const net = new brain.brain.recurrent.LSTMTimeStep({
	  inputSize: 6,
	  hiddenLayers: [3],
	  outputSize: 6,
	});

	const trainingData = dataset.data_arr;

	net.train(trainingData, { 
		//log: true 
	});

	// Feed last 3 days before start of forecast date
	// to be replaced by agro api forecast values
	const forecast = net.forecast(
		[
			[
			  0.013994910941477538,
			  0.013994910941477538,
			  1,
			  0.7142857142857143,
			  0.4922779922779923,
			  0
			],
			[ 0, 0, 1, 0.5714285714285714, 0.44015444015444016, 0 ],
			[
			  0.05343511450381873,
			  0.05343511450381873,
			  0.9705882352941176,
			  0.7142857142857143,
			  0.21621621621621626,
			  0
			]
		],
		9
	);

	for (var i = 0; i < dataset.denormalize_val.length; i++) {
		for (var x = 0; x < forecast.length; x++) {
			forecast[x][i] = denormalizeData(lo[x][i], dataset.denormalize_val[i]);
		}
	}

	return forecast;
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