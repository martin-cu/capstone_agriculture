function testStrength(chemical, val) {
	let stat = { strength: null, value: val, true_val };
	var base;
	if (chemical == 'Phosphorous') {
		switch(true) {
			case val <= 25 && val >= 0:
			stat.strength = 'Low';
			base = 25;
			break;
			case val <= 50 && val > 25:
			stat.strength = 'Medium';
			base = 50;
			break;
			case val > 50:
			stat.strength = 'High';
			base = 50;
			break;
		}
	}
	else if (chemical == 'Potassium') {
		switch(true) {
			case val <= 60 && val >= 0:
			stat.strength = 'Low';
			base = 60;
			break;
			case val <= 100 && val > 60:
			stat.strength = 'Medium';
			base = 100;
			break;
			case val > 100:
			stat.strength = 'High';
			base = 100;
			break;
		}
	}
	else if (chemical == 'Nitrogen') {
		switch(true) {
			case val <= 15 && val >= 0:
			stat.strength = 'Low';
			base = 15;
			break;
			case val <= 30 && val > 15:
			stat.strength = 'Medium';
			base = 30;
			break;
			case val > 30:
			stat.strength = 'High';
			base = 30;
			break;
		}
	}

	switch(stat.strength) {
		case 'Low':
		stat.value = 25;
		break;
		case 'Medium':
		stat.value = 50;
		break;
		case 'High':
		stat.value = 51;
		break;
	}

	stat.value = val / base * stat.value;

	return stat;
}

function selectChemicalBar(chemical) {
	let bar;

	if (chemical == 'Phosphorous') {
		bar = $('#p_bar');
	}
	else if (chemical == 'Potassium') {
		bar = $('#k_bar');
	}
	else if (chemical == 'Nitrogen') {
		bar = $('#n_bar');
	}

	return bar;
}

function setStrengthBarStyles(chemical, strength, val) {
	let bar = selectChemicalBar(chemical);

	let cont_width = bar.parent().width();
	val *= cont_width / 100;
	console.log(cont_width);

	bar.attr('style', 'width: '+val+'px;');
	bar.removeClass('bg-success bg-info bg-warning');

	switch(strength) {
		case 'Low':
	      bar.addClass('bg-danger');
	      bar.textContent = 'Weak';
	      break;
	    case 'Medium':
	      bar.removeClass('bg-danger');
	      bar.addClass('bg-warning');
	      bar.textContent = 'Moderate';
	      break;
	    case 'High':
	      bar.removeClass('bg-danger');
	      bar.addClass('bg-info');
	      bar.textContent = 'Strong';
	      break;
	    default:
	      bar.addClass('bg-danger');
	      //bar.textContent = '';
	      bar.attr('style', 'width: 0px;');
	};
}

function setChemicalStrengthValue(chemical, strength, val) {
	let bar = selectChemicalBar(chemical);

	bar.attr('aria-valuenow', val);
}



function initializeBars(e) {
	let val = parseFloat($('#ph_lvl').val());
	const arr = ['Phosphorous', 'Potassium', 'Nitrogen'];

	for (var i = 0; i < arr.length; i++) {
		let stat = testStrength(arr[i], val);

		setChemicalStrengthValue(arr[i], stat.strength, stat.value);
		setStrengthBarStyles(arr[i], stat.strength, stat.value);
	}

}

// Create recommended N-P-K values from input
function processSoilTest(obj) {
	var keys = ['n_test','p_test', 'k_test'];
	var db_keys = ['n_lvl', 'p_lvl', 'k_lvl'];
	var temp_obj = { };
	var obj_result = {
		Depleted: [14.0, 8.25, 13.5],
		Deficient: [7.75, 4.0, 8.75],
		Adequate: [3.75, 1.0, 4.75],
		Surplus: [0, 0, 0]
	};
	var indicator;
	var db_key;
	var index;
	for (var i = 0; i < keys.length; i++) {

		switch(keys[i]) {
			case 'n_test':
			index = 0;
			db_key = 'n_lvl';
			break;
			case 'p_test':
			index = 1;
			db_key = 'p_lvl';
			break;
			case 'k_test':
			index = 2;
			db_key = 'k_lvl';
			break;
		}

		obj[db_key] = obj_result[obj[keys[i]]][index] * area;
	}
	return obj;
}

function createDOM(obj) {
	var ele;

	ele = document.createElement(obj.type);
	ele.setAttribute('class', obj.class);
	ele.setAttribute('style', obj.style);
	ele.innerHTML = obj.html;

	for (prop in obj.attr) {
		if (Object.prototype.hasOwnProperty.call(obj.attr, prop)) {
			if (prop == 'data_href') {
				new_prop = 'data-href';
			}
			else {
				new_prop = prop;
			}
			ele.setAttribute(new_prop, obj.attr[prop]);
	    }
	}

	return ele;
}

function appendWorkOrder(data) {
		var cont = $('#work_order_table');
		var keys = ['type', 'farm_name', 'status', 'date_due', 'wo_notes'];

		var tr = createDOM({ type: 'tr', class: '', style: '', html: '' });

		for (var i = 0; i < keys.length; i++) {
			tr.appendChild(createDOM({ type: 'td', class: '', style: '', html: data[keys[i]] }));
		}

		cont.append(tr);
	}

function processInventory(arr, recommendation, applied) {
	// var obj = {
	// 	headers: [''],
	// 	amount: ['Current Stock'],
	// 	requirements: ['Requirement'],
	// 	style: [''],
	// 	applied: ['Applied'],
	// 	deficiency: ['Deficiency']
	// };
	// var deficiency;
	// for (var i = 0; i < arr.length; i++) {
	// 	if (recommendation.hasOwnProperty(arr[i].fertilizer_name)) {
	// 		deficiency = Math.round((recommendation[arr[i].fertilizer_name] - applied[i].resources_used) * 100)/100;
	// 		obj.requirements.push(recommendation[arr[i].fertilizer_name]);
	// 		obj.deficiency.push(deficiency);
	// 		//if (arr[i].current_amount >= recommendation[arr[i].fertilizer_name]) {
	// 		if (deficiency != 'N/A') {
	// 			obj.style.push('text-danger font-weight-bold');
	// 		}
	// 		else {
	// 			obj.style.push('text-success font-weight-bold');
	// 		}
	// 	}
	// 	else {
	// 		obj.requirements.push('N/A');
	// 		obj.style.push('');
	// 		obj.deficiency.push('N/A');
	// 	}

	// 	obj.headers.push(arr[i].fertilizer_name);
	// 	obj.amount.push(arr[i].current_amount);
	// 	obj.applied.push(applied[i].resources_used);
	// }

	var row_arr = [];
	var temp_obj = {};
	var qty, recommendation_amt, applied_fertilizer, deficiency;
	var mat;

	//Fertilizer - Current Stock - Recommendation - Applied - Deficiency
	for (var i = 0; i < arr.length; i++) {
		mat = applied.filter(ele => ele.fertilizer_name == arr[i].fertilizer_name)[0];

		if (recommendation.hasOwnProperty(arr[i].fertilizer_name)) {
			recommendation_amt = recommendation[arr[i].fertilizer_name];
		}
		else {
			recommendation_amt = 'N/A';
		}


		qty = arr[i].current_amount;
		applied_fertilizer = mat.resources_used;

		deficiency = recommendation_amt != 'N/A' ? recommendation_amt - applied_fertilizer : 'N/A';
		deficiency = deficiency != 'N/A' ? Math.round(deficiency * 100) / 100 : 'N/A';

		if (deficiency != 'N/A') {
			deficiency = deficiency < 0 ? 'N/A' : deficiency;
		}

		temp_obj = {
			fertilizer: arr[i].fertilizer_name,
			desc: '('+arr[i].N+'-'+arr[i].P+'-'+arr[i].K+')',
			qty: qty,
			recommendation: recommendation_amt,
			applied: applied_fertilizer,
			deficiency: deficiency
		}

		row_arr.push(temp_obj);
	}

	return row_arr;
}

function appendInventory(data) {
	var cont = $('#inventory_table');
	var headers = ['Fertilizer', 'Current Stock', 'Recommended', 'Applied', 'Deficiency'];
	var ele_class = '';
	for (var i = 0; i < data.length; i++) {

		tr = createDOM({ type: 'tr', class: '', style: '', html: '' });

		tr.appendChild(createDOM({ type: 'td', class: ele_class, style: '', html: data[i].fertilizer }));
		tr.appendChild(createDOM({ type: 'td', class: ele_class, style: '', html: data[i].qty }));
		tr.appendChild(createDOM({ type: 'td', class: ele_class, style: '', html: data[i].recommendation }));
		tr.appendChild(createDOM({ type: 'td', class: ele_class, style: '', html: data[i].applied }));
		tr.appendChild(createDOM({ type: 'td', class: ele_class, style: '', html: data[i].deficiency }));

		cont.append(tr);
	}

	// var obj_keys = ['headers', 'amount', 'requirements', 'applied', 'deficiency'];
	// var tr;
	// var ele_class;
	// for (var y = 0; y < obj_keys.length; y++) {
	// 	tr = '';
	// 	tr = createDOM({ type: 'tr', class: '', style: '', html: '' });
	// 	for (var i = 0; i < data.headers.length; i++) {
	// 		if (y != 0) {
	// 			ele_class = data['style'][i];
	// 		}
	// 		else {
	// 			ele_class = '';
	// 		}
	// 		tr.appendChild(createDOM({ type: 'td', class: ele_class, style: '', html: data[obj_keys[y]][i] }));
	// 	}

	// 	cont.append(tr);
	// }

}

function appendDetails(obj) {
	$('#ph_lvl').html(obj.pH_lvl);
	$('#n_lvl').html(obj.n_val);
	$('#p_lvl').html(obj.p_val);
	$('#k_lvl').html(obj.k_val);

	$('#n_req').html(obj.n_lvl);
	$('#p_req').html(obj.p_lvl);
	$('#k_req').html(obj.k_lvl);
}

function getNDVI(farm_name, dat, N_recommendation) {
	console.log(farm_name);
	var result_arr = [];
	$.get('/agroapi/polygon/readAll', {}, function(polygons) {
		var polygon_id;
		var options = {};
		for (var i = 0; i < polygons.length; i++) {
			if (farm_name == polygons[i].name) {
				polygon_id = polygons[i].id;
				coordinates = polygons[i].geo_json.geometry.coordinates[0];

				center = polygons[i].center;
			}
		}

		var n_date = new Date();
		n_date.setDate(n_date.getDate() - 30);
		var n = new Date();
		var query = { polygon_id: polygon_id, start: n_date, end: n };

		options = {
			center: center,
			coordinates: coordinates
		}

		// Visualize plot
		$.get('/agroapi/ndvi/imagery', query, function(imagery) {
			var leaf_color_chart = {
				1: { val: 1, min: -.031, max: .04 },
				2: { val: 2, min: .05, max: .15 },
				3: { val: 3, min: .16, max: .24 },
				4: { val: 4, min: .25, max: .29 },
				5: { val: 5, min: .30, max: .34 },
				6: { val: 6, min: .35, max: .39 },
				7: { val: 7, min: .40, max: .44 },
				8: { val: 8, min: .45, max: .49 },
				9: { val: 9, min: .5, max: .54 },
				10: { val: 10, min: .55, max: .59 },
				11: { val: 11, min: .60, max: .64 },
				12: { val: 12, min: .65, max: .69 },
				13: { val: 13, min: .70, max: .74 },
				14: { val: 14, min: .75, max: .79 },
				15: { val: 15, min: .80, max: 1 },
			};
			var lcc_conversion = {
				5: { val: 'Surplus', range: [14, 15] },
				4: { val: 'Optimal', range: [11, 12, 13] },
				3: { val: 'Optimal', range: [9, 10] },
				2: { val: 'Deficient', range: [7, 8] }
			}
			var split_pattern = {
				Basal: { 
					dat_range: [0, 13],
					reqs: [0, 0, 0, 20]
				},
				Tillering: {
					dat_range: [14, 20],
					reqs: [20, 25, 35, 35]
				},
				Midtillering: { 
					dat_range: [20, 35],
					reqs: [0, 25, 40, 45]
				},
				Panicle: { 
					dat_range: [40, 50],
					reqs: [20, 30, 45, 50]
				},
				Flowering: { 
					dat_range: [60, 70],
					reqs: [0, 0, 0, 15]
				}
			}
			var pattern_arr = ['Basal', 'Tillering', 'Midtillering', 'Panicle', 'Flowering'];

			if (imagery.length != 0) {
				console.log('Last clear satellite image: '+imagery[imagery.length-1].dt);
				var stats_url = imagery[imagery.length-1].stats.ndvi;
				var ndvi_reading;
				var stage;
				$.get(imagery[imagery.length-1].stats.ndvi, {}, function(stats) {
					var ndvi = Math.round(stats.max * 100) / 100;
					console.log('NDVI Value: '+ndvi);
					for (prop in leaf_color_chart) {
						if (ndvi >= leaf_color_chart[prop].min && leaf_color_chart[prop].max >= ndvi) {
							ndvi_reading = leaf_color_chart[prop].val
						}
					}
					var range_start, range_end;
					var N = null;
					for (prop in lcc_conversion) {
						range_start = lcc_conversion[prop].range[0];
						range_end = lcc_conversion[prop].range[lcc_conversion[prop].range.length-1];
						if (ndvi_reading >= range_start && ndvi_reading <= range_end) {
							N = lcc_conversion[prop].val;
						}

					}

					var N_amount;
					var N_date;
					var index;
					var stage;
					var stages_arr = [];
					var stage_index = null;
					for (prop in split_pattern) {
						range_start = split_pattern[prop].dat_range[0];
						range_end = split_pattern[prop].dat_range[1];
						if (dat >= range_start && dat <= range_end) {
							stage = prop;
						}
					}

					if (N_recommendation <= 40) {
						index = 0;
					}
					else if (N_recommendation > 40 && N_recommendation <= 80) {
						index = 1;
					}
					else if (N_recommendation > 80 && N_recommendation <= 120) {
						index = 2;
					}
					else if (N_recommendation > 120 && N_recommendation <= 160) {
						index = 3;
					}

					for (var i = 0; i < pattern_arr.length; i++) {
						if (stage == pattern_arr[i]) {
							stage_index = i;
						}

						if (stage_index != null && i < pattern_arr.length) {
							stages_arr.push(pattern_arr[i]);
						}
					}

					var obj;
						
					for (var i = 0; i < stages_arr.length; i++) {
						var now = new Date();

						stage = stages_arr[i];
						N_amount = split_pattern[stages_arr[i]].reqs[index];

						if (N == 'Surplus' && stage == 'Midtillering' 
							|| stage == 'Panicle') {
							N_amount += 10;
						}
						else if (N == 'Deficient' && stage == 'Midtillering' 
							|| stage == 'Panicle') {
							N_amount -= 10;
						}

						var diff = (split_pattern[stages_arr[i]].dat_range[0] - dat);

						obj = {
							desc: stage,
							date: formatDate(new Date(now.setDate(now.getDate() + ( diff < 0 ? 1 : diff ) )), 'YYYY-MM-DD'),
							amount: N_amount,
							nutrient: 'N'
						};
							

						result_arr.push(obj);
					}

				});
			}
			else {
				console.log('No sufficient data from API!!');
			}
		});
	});

	return result_arr;
}

function mapFertilizertoSchedule(obj, materials, applied, recommendation) {
	var result_arr = [];
	var temp_obj;
	var fertilizer_cont = {
		n_fertilizer: { strongest: { name: null, val: null }, arr: [] },
		p_fertilizer: { strongest: { name: null, val: null }, arr: [] },
		k_fertilizer: { strongest: { name: null, val: null }, arr: [] }
	};

	materials = materials.sort((a,b) => (b.N - a.N));

	var empty = true;
	for (var i = 0; i < materials.length; i++) {
		if (recommendation.hasOwnProperty(materials[i].fertilizer_name)) {
			if (materials[i].N != 0) {
				fertilizer_cont.n_fertilizer.arr.push(materials[i]);
			}
			if (materials[i].P != 0) {
				fertilizer_cont.p_fertilizer.arr.push(materials[i]);
			}
			if (materials[i].K != 0) {
				fertilizer_cont.k_fertilizer.arr.push(materials[i]);
			}
		}
		if (empty) {
			fertilizer_cont.n_fertilizer.strongest.name = materials[i].fertilizer_name;
			fertilizer_cont.p_fertilizer.strongest.name = materials[i].fertilizer_name;
			fertilizer_cont.k_fertilizer.strongest.name = materials[i].fertilizer_name;

			fertilizer_cont.n_fertilizer.strongest.val = materials[i].N;
			fertilizer_cont.p_fertilizer.strongest.val = materials[i].P;
			fertilizer_cont.k_fertilizer.strongest.val = materials[i].K;

			empty = false;
		}
		else {
			if (fertilizer_cont.n_fertilizer.strongest.val < materials[i].N) {
				fertilizer_cont.n_fertilizer.strongest.name = materials[i].fertilizer_name;
				fertilizer_cont.n_fertilizer.strongest.val = materials[i].N;
			}
			if (fertilizer_cont.p_fertilizer.strongest.val < materials[i].P) {
				fertilizer_cont.p_fertilizer.strongest.name = materials[i].fertilizer_name;
				fertilizer_cont.p_fertilizer.strongest.val = materials[i].P;
			}
			if (fertilizer_cont.k_fertilizer.strongest.val < materials[i].K) {
				fertilizer_cont.k_fertilizer.strongest.name = materials[i].fertilizer_name;
				fertilizer_cont.k_fertilizer.strongest.val = materials[i].K;
			}
		}
	}
	console.log(recommendation);
	console.log(obj);
	//Create obj for P recommendation
	if (fertilizer_cont.p_fertilizer.arr.length != 0) {
		temp_obj = {
			fertilizer: fertilizer_cont.p_fertilizer.strongest.name,
			amount: recommendation[fertilizer_cont.p_fertilizer.strongest.name]+' bags',
			desc: obj.P[0].desc,
			date: obj.P[0].date,
			nutrient: 'P'
		}
		result_arr.push(temp_obj);
	}
	//Create obj for K recommendation
	if (fertilizer_cont.k_fertilizer.arr.length != 0) {
		var first, second, k_amt;
		var single_f_amt = materials.filter(ele => ele.fertilizer_name == fertilizer_cont.k_fertilizer.strongest.name)[0].K;
		if (obj.K.length != 1) {
			var K_reco_total = materials.filter(ele => ele.fertilizer_name == fertilizer_cont.k_fertilizer.strongest.name)[0].K;
			K_reco_total *= recommendation[fertilizer_cont.k_fertilizer.strongest.name];
			var applied_K;


			if (fertilizer_cont.p_fertilizer.arr.length != 0) {
				applied_K = materials.filter(ele => ele.fertilizer_name == fertilizer_cont.p_fertilizer.strongest.name)[0].K;
			applied_K *= recommendation[fertilizer_cont.p_fertilizer.strongest.name];
			}
			else {
				applied_K = 0;
			}
			
			first = (K_reco_total - applied_K) / 2;
			second = K_reco_total / 2;
		}
		else {
			first = recommendation[fertilizer_cont.p_fertilizer.strongest.name];
			second = first;
		}

		for (var i = 0; i < obj.K.length; i++) {
			if (i == 0) {
				k_amt = first;
			}
			else if (i == 1) {
				k_amt = second;
			}

			temp_obj = {
				fertilizer: fertilizer_cont.k_fertilizer.strongest.name,
				amount: Math.round(k_amt / single_f_amt * 100) / 100+' bags',
				desc: obj.K[i].desc,
				date: obj.K[i].date,
				nutrient: 'K'
			}
			result_arr.push(temp_obj);
		}
	}
		

	//Create obj for N recommendation
	var n_fertilizer_amt;
	console.log(obj);
	obj.N = obj.N.filter(ele => ele.amount != 0);
	console.log(obj.N);
	for (var i = 0; i < obj.N.length; i++) {
		n_fertilizer_amt = obj.N[i].amount / fertilizer_cont.n_fertilizer.strongest.val;
		temp_obj = {
			fertilizer: fertilizer_cont.n_fertilizer.strongest.name,
			amount: Math.round(n_fertilizer_amt * 100) / 100+' bags',
			desc: obj.N[i].desc+' Nitrogen Application (N)',
			date: obj.N[i].date,
			nutrient: 'N'
		}
		result_arr.push(temp_obj);
	}

	result_arr.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
	
	return result_arr;
}

function isInRecommendation(attr, reco_obj, db_obj) {
	reco_obj.amount = reco_obj.amount.replace(' bags', '');
	var temp_obj;
	var date = false, fertilizer = false, desc = false, amount = false;
	var found = false
	for (var i = 0; i < db_obj.length; i++) {
		date = db_obj[i].date == reco_obj.date ? true : false;
		temp_obj = db_obj[i].fertilizer.filter(ele => ele == reco_obj.fertilizer);


		if (temp_obj.length != 0 && date) {
			fertilizer = true;
			desc = db_obj[i].desc.filter(ele => ele.indexOf(reco_obj.desc) >= 0);
			amount = db_obj[i].amount.filter(ele => ele.toString().indexOf(reco_obj.amount) >= 0);

			if (desc.length != 0) {
				desc = true;
			}
			if (amount.length != 0) {
				amount = true;
			}
		}

		if (date && fertilizer && desc && amount) {
			found = true;
		}
	}

	if (found) {
		attr['disabled'] = found;
	}

	return attr;
}

function createSchedule(materials, recommendation, applied, farm_id, N_recommendation, details) {
	var fertilizer = {  };
	var fertilizer_arr = [];
	for (var i = 0; i < applied.length; i++) {
		if (recommendation.hasOwnProperty(applied[i].fertilizer_name)) {
			fertilizer = {
				name: applied[i].fertilizer_name,
				N: applied[i].N,
				P: applied[i].P,
				K: applied[i].K,
				recommendation: (Math.round((recommendation[applied[i].fertilizer_name] - applied[i].resources_used) * 100)/100)
			};
			fertilizer_arr.push(fertilizer);
		}
	}
	console.log("Farm ID: "+farm_id);
	var query = {
		where: {
			key: ['farm_id'],
			value: [farm_id]
		},
		order: ['work_order_table.status ASC', 'work_order_table.date_due DESC']
	}

	$.get('/get_work_orders', query, function(work_order_list) {

		var land_prep = work_order_list.filter(ele => ele.type == 'Land Preparation')[0];
		var sowing = work_order_list.filter(ele => ele.type == 'Sow Seed')[0];

		$.get('/get_crop_plans', { status: ['In-Progress', 'Active'] }, function(crop_calendar) {
			var target_date;
			var N, P, K = [];
			var method;
			var DAT;
			var active_calendar = crop_calendar.filter(ele => ele.farm_id == farm_id && ele.status == 'In-Progress' || ele.status == 'Active')[0];
			var method = active_calendar.method;
			var obj;
			var temp_d;
			console.log(method);
			if (method == 'Transplanting') {
				temp_d = land_prep.date_completed != null || land_prep.date_completed != undefined ? land_prep.date_completed : land_prep.date_due;
				target_date = new Date(temp_d);
			}
			else if (method == 'Direct Seeding') {
				temp_d = sowing.date_completed != null || sowing.date_completed != undefined ? sowing.date_completed : sowing.date_due;
				target_date = new Date(temp_d);
				target_date = target_date.getDate() + 12;
			}

			DAT = new Date();
			DAT = DAT.getDate() - (new Date (sowing.date_completed).getDate());
			console.log('DAT: '+DAT);
			
			//target_date = formatDate(target_date, 'YYYY-MM-DD');
			//K Fertilizer changes depending on K requirement
			var k_date, k_stage;
			if (details.k_lvl >= 30) {
				for (var i = 0; i < 2; i++) {
					if (i == 0) {
						k_date = new Date(land_prep.date_completed != null || land_prep.date_completed != undefined ? land_prep.date_completed : land_prep.date_due);
						k_stage = 'Basal Potassium Application (K)';
					}
					else {
						k_date = new Date(sowing.date_completed != null || sowing.date_completed != undefined ? sowing.date_completed : sowing.date_due);
						k_date = new Date(k_date.setDate(k_date.getDate() + 35));
						k_stage = 'Early Panicle Potassium Application (K)';
					}

					K.push({
						desc: k_stage,
						date: formatDate(new Date(k_date),'YYYY-MM-DD'),
						amount: details.k_lvl/2,
						nutrient: 'K'
					});
				}
			}
			else {
				K.push({
					desc: 'Potassium Application (K)',
					date: formatDate(new Date(target_date),'YYYY-MM-DD'),
					amount: details.k_lvl,
					nutrient: 'K'
				});
			}
			//P Fertilizer 100% always
			P = [{
				desc: 'Phosphorous Application (P)',
				date: formatDate(new Date(target_date),'YYYY-MM-DD'),
				amount: details.p_lvl,
				nutrient: 'P'
			}];


			//N Need-Based Approach
			N = getNDVI(farm_name, DAT, N_recommendation);

			obj = { N: N, P: P, K: K};
			var schedule_arr = mapFertilizertoSchedule(obj, materials, applied, recommendation);
			var schedule_arr_keys = ['date', 'fertilizer', 'desc', 'amount'];
			var tr, td;
			var hidden_atr = {
				type: 'hidden',
				name: '',
				value: '',
			};
			var checkbox_attr = {
				type: 'checkbox',
				name: 'checkbox',
				value: ''
			};

			var created_recommendation = work_order_list.filter(ele => ele.notes != '' && ele.notes != null && ele.notes.indexOf('Recommendation') >= 0);
			var cr_notes;
			var recommended_obj;
			var recommended_arr = [];
			var resources_arr = [];
			var t_arr = [];
			for (var i = 0; i < created_recommendation.length; i++) {
				cr_notes = created_recommendation[i].notes.replace('(Recommendation)', '');

				$.get('/get_wo_resources', { work_order_id: created_recommendation[i].work_order_id, type: 'Fertilizer' }, function(wo_resources) {
					resources_arr = wo_resources;
					resources_arr = resources_arr.filter(ele => ele.qty > 0);
				});

				recommended_obj = {
					date: formatDate(new Date(created_recommendation[i].date_start), 'YYYY-MM-DD'),
					fertilizer: [],
					desc: [],
					amount: []
				};

				if (cr_notes.search('Application and ') && resources_arr.length > 1) {
					var split = cr_notes.split(' and ');

					for (var x = 0; x < split.length; x++) {
						recommended_obj.desc.push(split[x]);
					}

					for (var y = 0; y < resources_arr.length; y++) {
						recommended_obj.fertilizer.push(resources_arr[y].material_name);
						recommended_obj.amount.push(Math.round(resources_arr[y].qty * 100) / 100);
					}
					recommended_arr.push(recommended_obj);
				}
				else {
					recommended_obj.fertilizer.push(resources_arr[0].material_name);
					recommended_obj.desc.push(cr_notes);
					recommended_obj.amount.push(Math.round(resources_arr[0].qty * 100) / 100);

					recommended_arr.push(recommended_obj);
				}
			}

			for (var i = 0; i < schedule_arr.length; i++) {
				tr = createDOM({ type: 'tr', class: '', style: '', html: '' });
				for (var y = 0; y < schedule_arr_keys.length; y++) {
					hidden_atr.name = schedule_arr_keys[y];
					hidden_atr.value = schedule_arr[i][schedule_arr_keys[y]];
					tr.appendChild(createDOM({
						type: 'input',
						class: '',
						style: '',
						html: '',
						attr: hidden_atr
					}));
					tr.appendChild(createDOM({ 
						type: 'td', 
						class: '', 
						style: '',
						html: schedule_arr[i][schedule_arr_keys[y]]
					}));
				}
				delete checkbox_attr.disabled;
				checkbox_attr.value = i +1;
				checkbox_attr = isInRecommendation(checkbox_attr, schedule_arr[i], recommended_arr);
				
				tr.appendChild(createDOM({
					type: 'input', 
					class: 'form-check-input', 
					style: 'margin-top: 10px;',
					attr: checkbox_attr
				}));
				$('#schedule_table').append(tr);
			}
		});
	});
}

function calculateDeficientN(reqs, applied) {
	var N = reqs.n_lvl;

	for (var i = 0; i < applied.length; i++) {
		if (applied[i].resources_used != 0) {
			N -= applied[i].resources_used * applied[i].N;
		}
	}
	return N;
}

function consolidateUniqueWO(arr, calendar_id, material_list) {
	const unique = [...new Map(arr.map(ele =>
	  [ele.date, ele])).values()];
	var unique_ele;
	var wo_obj;
	var wo_arr = [];
	var adjusted_date;

	for (var i = 0; i < unique.length; i++) {
		adjusted_date = new Date(unique[i].date);
		adjusted_date = adjusted_date.setDate(adjusted_date.getDate() + 3);

		unique_ele = arr.filter(ele => ele.date == unique[i].date);

		wo_obj = {
			wo_type: 'Fertilizer Application',
			crop_calendar_id: calendar_id,
			due_date: formatDate(new Date(adjusted_date), 'YYYY-MM-DD'),
			start_date: unique[i].date,
			resources: { name: [], ids: [], qty: [] },
			notes: ''
		}
		for (var y = 0; y < unique_ele.length; y++) {
			if (y != 0) {
				wo_obj.notes += ' and ';
			}
			wo_obj.notes += unique_ele[y].desc
			wo_obj.resources.name.push(unique_ele[y].fertilizer);
			wo_obj.resources.qty.push(unique_ele[y].amount.replace(' bags', ''));

			var f_id = material_list.filter(ele => ele.fertilizer_name == unique_ele[y].fertilizer)[0].fertilizer_id;
			wo_obj.resources.ids.push(f_id);
		}
		wo_obj.notes += ' (Recommendation)';
		wo_arr.push(wo_obj);
	}

	return wo_arr;
}

function appendFertilizerHistory(records) {
	var target = $('#fertilizer_history');
	var tr, td;
	var keys = [];
	var resources_arr = [];
	var date, desc, fertilizer, amount;
	for (var i = 0; i < records.length; i++) {
		tr = createDOM({ type: 'tr', class: '', style: '', html: '' });

		date = formatDate(new Date(records[i].date_completed != null || records[i].date_completed != undefined ? records[i].date_completed : records[i].date_due), 'YYYY-MM-DD');
		desc = records[i].notes == null || records[i].notes == undefined ? 'N/A' : records[i].notes;

		date = createDOM({ type: 'td', class: 'align-middle', style: '', html: date });
		desc = createDOM({ type: 'td', class: 'align-middle', style: '', html: desc });

		tr.appendChild(date);
		

		$.get('/get_wo_resources', { work_order_id: records[i].work_order_id, type: 'Fertilizer' }, function(wo_resources) {
			resources_arr = wo_resources;
			resources_arr = resources_arr.filter(ele => ele.qty > 0);

			for (var x = 0; x < resources_arr.length; x++) {
				if (x != 0) {
					tr = createDOM({ type: 'tr', class: '', style: '', html: '' });
				}
				tr.appendChild(createDOM({ type: 'td', class: '', style: '', html: resources_arr[x].material_name }));
				if (x == 0)
					tr.appendChild(desc);
				tr.appendChild(createDOM({ type: 'td', class: '', style: '', html: resources_arr[x].qty+' bags' }));
			
				target.append(tr);
			}

			if (resources_arr.length > 1) {
				date = $(date).attr('rowspan', '2');
				desc = $(desc).attr('rowspan', '2');
			}
		});

		// for (var y = 0; y < keys.length; y++) {
		// 	tr.appendChild(createDOM({ type: 'td', class: '', style: '', html: records[y][keys[i]] }));
		// }
	}
}

$(document).ready(function() {
	var wo_arr = [];
	var calendar_id;
	var material_list;
	if (type == 'Soil Test') {
		// var ph_inp = document.getElementById('ph_lvl');

		// ph_inp.addEventListener('input', (e) => {
		// 	initializeBars(e);
		// });
		$.get('/get_farm_list', {  }, function(result) {
			farm_list = result;
			for (var i = 0; i < result.length; i++) {
				$('#farm_id').append("<option value='"+result[i].farm_id+"'>"+result[i].farm_name+"</option>");
			}
		});

		$('#soil_data_form').on('submit', function(e) {
			e.preventDefault();
			var form_data = $('#soil_data_form').serializeJSON();
			form_data = processSoilTest(form_data);
			
			$.post('/nutrient_management/add_record', form_data, function(record) {
				console.log('Successfully added soil record');
				window.location.href = record;
			})
		});
	}
	else if (type == 'Soil Detailed') {
		console.log('Getting data for farm: '+id);
		console.log(area);
		jQuery.ajaxSetup({async: false });
		$.get('/filter_nutrient_mgt', { farm_name: farm_name, type: 'Fertilizer', filter: id }, function(details) {
			appendDetails(details);
			calendar_id = details.calendar_id;
			console.log('Calendar id: '+calendar_id);
			$.get('/getAll_materials', { type: 'Fertilizer', filter: id }, function(materials) {
				material_list = materials;
				$.get('/get_cycle_resources_used', { type: 'Fertilizer', farm_id: id }, function(list) {
					
					var query = {
						where: {
							key: ['farm_id'],
							value: [id]
						},
						order: ['work_order_table.status ASC', 'work_order_table.date_due DESC']
					}
					$.get('/get_work_orders', query, function(work_order_list) {
						appendFertilizerHistory(work_order_list.filter(ele => ele.type == 'Fertilizer Application'));

						var recommendation = processInventory(materials, details.recommendation, list);
						appendInventory(recommendation);
						
						createSchedule(materials, details.recommendation, list, id, calculateDeficientN(details, list), details);
					});
						
				});
			});
		});



		$('#schedule_table').on('click', '.form-check-input', function() {
			var checkboxes = [];
			$("input:checkbox[name='checkbox']:checked").each(function() {
			   checkboxes.push($($(this)).val());
			});
			wo_arr = [];
			if (checkboxes.length != 0) {
				var index = [];
				var rows = $($('#schedule_table').children()[0]).children();
				var selected;
				var wo_obj;
				$('#generate_wo').removeClass('hide');

				for (var i = 0; i < checkboxes.length; i++) {
					wo_obj  = {
						date: '',
						fertilizer: '',
						desc: '',
						amount: ''
					};
					selected = $($(rows)[checkboxes[i]]).children().filter('input:hidden');

					wo_obj.date = $(selected[0]).prop('value');
					wo_obj.fertilizer = $(selected[1]).prop('value');
					wo_obj.desc = $(selected[2]).prop('value');
					wo_obj.amount = $(selected[3]).prop('value');
					
					wo_arr.push(wo_obj);
				}

			}
			else {
				$('#generate_wo').addClass('hide');
			}
		});

		$('#generate_wo').on('click', function() {
			var data = consolidateUniqueWO(wo_arr, calendar_id, material_list);

			for (var i = 0; i < data.length; i++) {
				$.post('/upload_wo', data[i], function(result) {
					if (i == data.length - 1) {
						console.log(result);
						window.location = result;
					}
				});
			}
		});

		$.get('/get_farm_list', {  }, function(result) {
			farm_list = result;
			for (var i = 0; i < result.length; i++) {
				$('#farm_id').append("<option value='"+result[i].farm_id+"'>"+result[i].farm_name+"</option>");
			}
		});

		$('#soil_data_form').on('submit', function(e) {
			e.preventDefault();
			var form_data = $('#soil_data_form').serializeJSON();
			form_data = processSoilTest(form_data);
			
			$.post('/nutrient_management/add_record', form_data, function(record) {
				console.log('Successfully added soil record');
				window.location.href = record;
			})
		});
	}

});