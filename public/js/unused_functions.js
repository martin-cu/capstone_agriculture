{
  dt: '2021-10-17 - 2:0AM',
  min_temp: 0.013994910941477538,
  max_temp: 0.013994910941477538,
  humidity: 1,
  pressure: 0.7142857142857143,
  rainfall: 0.4922779922779923,
  id: 0
}
{
  dt: '2021-10-17 - 5:0AM',
  min_temp: 0,
  max_temp: 0,
  humidity: 1,
  pressure: 0.5714285714285714,
  rainfall: 0.44015444015444016,
  id: 0
}
{
  dt: '2021-10-17 - 8:0AM',
  min_temp: 0.05343511450381873,
  max_temp: 0.05343511450381873,
  humidity: 0.9705882352941176,
  pressure: 0.7142857142857143,
  rainfall: 0.21621621621621626,
  id: 0
}


[
  0.013994910941477538,
  0.013994910941477538,
  1,
  0.7142857142857143,
  0.4922779922779923,
  0
]
[ 0, 0, 1, 0.5714285714285714, 0.44015444015444016, 0 ]
[
  0.05343511450381873,
  0.05343511450381873,
  0.9705882352941176,
  0.7142857142857143,
  0.21621621621621626,
  0
]

////////////////////////////////////

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


// var class_name = 'main';
	// var features = ['min_temp', 'max_temp'];

	// var dt = new DecisionTree(dataset, class_name, features);

	// var accuracy = dt.evaluate(dataset.testing);

	// console.log(accuracy);

	// var treeJson = dt.toJSON();

	// console.log(treeJson);

	// var predicted_class = dt.predict({
	//   min_temp: 285,
	//   max_temp: 301
	// });

	//console.log(predicted_class);

	//console.log(dataset.stats);
	//ANNForecast(dataset.stats);


