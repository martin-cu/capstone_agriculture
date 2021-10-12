const brain = require('brain.js');
var DecisionTree = require('decision-tree');

function parseDecimal(num, decimal) {
	return parseFloat((num).toFixed(decimal));
}

exports.forecastWeather = function(arr) {
	console.log(arr);

	
	
	return arr;
}

// const colors = [
// 		{ green: 0.2, blue: 0.4 },
// 		{ green: 0.4, blue: 0.6 },
// 		{ red: 0.2, green: 0.8, blue: 0.8 },
// 		{ green: 1, blue: 1 },
// 		{ red: 1, green: 1, blue: 1 },
// 		{ red: 1, green: 0.8, blue: 0.8 },
// 	];

// 	const brightness = [
// 		{ dark: 0.8 },
// 		{ neutral: 0.8 },
// 		{ light: 0.7 },
// 		{ light: 0.8 },
// 		{ light: 1 },
// 	];

// 	for (var i = 0; i < colors.length; i++) {
// 		trainingData.push({
// 			input: brightness[i],
// 			output: colors[i]
// 		});
// 	}

// 	const stats = net.train(trainingData);
// 	console.log(stats);

// 	console.log(net.run({
// 		green: 1
// 	}));


// Daily Obj = { min_temp: , max_temp: , humidity: , pressure: , total_rainfall, weather: '', weather_desc: '' }

function ANNForecast(dataset) {
	const net = new brain.brain.recurrent.LSTMTimeStep({
	  inputSize: 2,
	  hiddenLayers: [10],
	  outputSize: 2,
	});

	//console.log(dataset.temp.training);

	// const trainingData = dataset.temp.training;

	// net.train(trainingData, { log: true });

	// for (var i = 0; i < 10; i++) {
	// 	console.log(dataset.temp.testing[i]);
	// }

	// const forecast = net.forecast(
	// 	[
	// 		[296.85, 296.85],
	// 		[296.07, 296.07],
	// 		[296.54, 296.54],
	// 	],
	// 	7
	// );

	// console.log(forecast);

	// const check = net.run(
	// 	{ min_temp: 301.15, max_temp: 301.15, humidity: 86, pressure: 1007, 
	// 	total_rainfall: 0, weather: 'Clouds', weather_desc: 'overcast clouds' }
	// );

	// console.log(check);


	// console.log(forecast);

	// console.log(dataset.training);
	// console.log('--------------------------');
	// console.log(dataset.testing);
	return 1;
}

exports.trainWeatherData = function(dataset) {
	var class_name = 'main';
	var features = ['min_temp', 'max_temp'];

	var dt = new DecisionTree(dataset.training, class_name, features);

	var accuracy = dt.evaluate(dataset.testing);

	 console.log(accuracy);

	// var treeJson = dt.toJSON();

	// console.log(treeJson);

	var predicted_class = dt.predict({
	  min_temp: 285,
	  max_temp: 301
	});

	console.log(predicted_class);

	//console.log(dataset.stats);
	//ANNForecast(dataset.stats);

	return 1;
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