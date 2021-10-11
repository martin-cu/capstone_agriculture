function parseDecimal(num, decimal) {
	return parseFloat((num).toFixed(decimal));
}

exports.forecastWeather = function(arr) {
	console.log(arr);

	
	
	return arr;
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