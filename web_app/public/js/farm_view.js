function setElementAttributes(ele, obj_arr) {
	for (var i = 0; i < obj_arr.prop.length; i++) {
		if (obj_arr.prop[i] == 'inner_HTML')
			ele.innerHTML = obj_arr.val[i]
		else
			ele.setAttribute(obj_arr.prop[i], obj_arr.val[i]);
	}

	return ele;
}

function createCheckbox(div_prop, inp_prop, lbl_prop) {
	var div, inp, lbl;

	div = document.createElement('div');
	div = setElementAttributes(div, div_prop);

	inp = document.createElement('input');
	inp = setElementAttributes(inp, inp_prop);

	lbl = document.createElement('label');
	lbl = setElementAttributes(lbl, lbl_prop);

	div.appendChild(inp);
	div.appendChild(lbl);

	return div;
}

function seggregateUnassigned(arr) {
	var obj = { assigned: [], unassigned: [] };
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].num_assignments == 0) 
			obj.unassigned.push(arr[i]);
		else
			obj.assigned.push(arr[i]);
	}
	return obj;
}

function loadAjaxEmployees() {
	var div = {
		prop: ['class'],
		val: ['form-check']
	};
	var inp = {
		prop: ['class', 'type', 'name' , 'style', 'form', 'value'],
		val: ['form-check-input', 'checkbox', 'worker_checkbox', 'margin-top: .4rem', 'create_farm_form']
	};

	//Clear list
	$('#unassigned_frmr_cont').empty();
	$('#unassigned_frmr_cont').empty();

	$.get('/get_employees', { position: 'Farmer' }, function(result1) {
		if (result1.success) {
			var emp1 = result1.employee_list;
			emp1 = seggregateUnassigned(emp1);

			for (var i = 0; i < emp1.assigned.length; i++) {
				inp.val.push(emp1.assigned[i].employee_id);
				$('#assigned_frmr_cont').append(createCheckbox(div, inp, 
				{ prop: ['inner_HTML'], val: [emp1.assigned[i].last_name+', '+emp1.assigned[i].first_name] }));
				inp.val = inp.val.slice(0, -1);
			}

			for (var i = 0; i < emp1.unassigned.length; i++) {
				inp.val.push(emp1.unassigned[i].employee_id);
				$('#unassigned_frmr_cont').append(createCheckbox(div, inp, 
				{ prop: ['inner_HTML'], val: [emp1.unassigned[i].last_name+', '+emp1.unassigned[i].first_name] }));
				inp.val = inp.val.slice(0, -1);
			}
		}
		else {

		}
	});
}

$(document).ready(function() {
	$.get('/get_employees', { position: 'Farm Manager' }, function(result) {
		result = result.employee_list.filter(e => e.num_assignments == 0);
		if (result.length != 0) {

			var emp = result;
			if (emp.length == 0) {
				$('#farm_mngr_error').removeClass('hide');
			}
			else {
				for (var i = 0; i < emp.length; i++) {
					// $('#farm_mngr_cont').append(createCheckbox(div, inp, 
					// 	{ prop: ['inner_HTML'], val: [emp[i].last_name+', '+emp[i].first_name] }));
					// inp.val = inp.val.slice(0, -1);
					$('#farm_mngr_cont').append('<option value="'+emp[i].employee_id+'">'+emp[i].last_name+', '+emp[i].first_name+'</option>');
				}
			}

		}
		else {
			$('#farm_mngr_cont').prop('disabled', true);
		}
	});
	$('#queueFarmers').on('click', function() {
		loadAjaxEmployees();
	});

	$('.material').on("click", function(){
		var txt = this.text();
		alert(txt);
	});
});