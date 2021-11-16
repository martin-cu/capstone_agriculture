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

function processInventory(arr) {
	console.log(arr);
	var obj = {
		headers: [''],
		amount: ['Current Stock'],
		requirements: ['Requirement']
	};

	for (var i = 0; i < arr.length; i++) {
		obj.headers.push(arr[i].fertilizer_name);
		obj.amount.push(arr[i].current_amount);
		obj.requirements.push('0');
	}

	return obj;
}

function appendInventory(data) {
	var cont = $('#inventory_table');
	var obj_keys = ['headers', 'amount', 'requirements'];
	var tr;
	console.log(data);
	for (var y = 0; y < obj_keys.length; y++) {
		tr = '';
		tr = createDOM({ type: 'tr', class: '', style: '', html: '' });
		for (var i = 0; i < data.headers.length; i++) {
			tr.appendChild(createDOM({ type: 'td', class: '', style: '', html: data[obj_keys[y]][i] }));
		}

		cont.append(tr);
	}

}

$(document).ready(function() {
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
				console.log(record);
				window.location.href = record;
			})
		});
	}
	else if (type == 'Soil Detailed') {
		console.log('Getting data for farm: '+id);
		console.log(area);
		$.get('/get_materials', { type: 'Fertilizer', filter: id }, function(materials) {
			appendInventory(processInventory(materials));
		})
	}

});