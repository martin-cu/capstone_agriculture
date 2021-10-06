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

exports.toUnixTimeStamp = function(date) {
	let x = new Date(date);
	if (!x instanceof Date) {
		date = Date.parse(date);
	}

	return parseInt((new Date(date).getTime() / 1000).toFixed(0));
}