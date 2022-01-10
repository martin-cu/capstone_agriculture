exports.init_session = function(obj, role, name, username, tab) {
	obj['name'] = name;
	obj['role'] = role;
	obj['username'] = username;
	obj['session'] = true;

	if (role === 'System Admin') 
		obj['admin_role'] = true;
	else if (role === 'Sales Employee')
		obj['sales_role'] = true;
	else if (role === 'Purchasing Employee')
		obj['purchasing_role'] = true;
	else if (role === 'Logistics Employee')
		obj['logistics_role'] = true;

	if (tab === 'dashboard')
		obj['home_tab'] = true;
	else if (tab === 'farms') 
		obj['farm_tab'] = true;
	else if (tab === 'monitor_farms')
		obj['monitor_farms_tab'] = true;
	// Crop Calendar Tab
	else if (tab === 'crop_calendar') 
		obj['calendar_tab'] = true;
	else if (tab === 'detailed_crop_calendar') 
		obj['calendar_tab'] = true;
	else if (tab === 'add_crop_calendar') 
		obj['calendar_tab'] = true;

	else if (tab === 'harvest_cycle') 
		obj['harvest_cycle_tab'] = true;
	else if (tab === 'sms_subcription') 
		obj['sms_tab'] = true;
	else if (tab === 'pest_and_disease') 
		obj['pest_and_disease_tab'] = true;
	else if (tab === 'nutrient_mgt_discover') 
		obj['nutrient_discover_tab'] = true;
	else if (tab === 'nutrient_mgt_diagnose') 
		obj['nutrient_diagnose_tab'] = true;
	else if (tab === 'user_mgt') 
		obj['user_tab'] = true;
	else if (tab === 'analytics') 
		obj['analytics_tab'] = true;
	else if (tab === 'inventory_tab')
		obj['inventory_tab'] = true;
	else if (tab === 'orders_tab')
		obj['orders_tab'] = true;
	else if (tab === 'add_crop_calendar') 
		obj['farm_tab'] = true;
	else if (tab === 'add_farm') 
		obj['monitor_farms_tab'] = true;
		
	// Pest and Disease Diagnose Tab
	else if (tab === 'pest_and_disease_discover') 
		obj['pest_and_disease_discover'] = true;
	else if (tab === 'pest_and_disease_diagnoses') 
		obj['pest_and_disease_diagnoses'] = true;
	else if (tab === 'pest_and_disease_add_diagnosis') 
		obj['pest_and_disease_diagnoses'] = true;
	else if (tab === 'pest_and_disease_add_pest') 
		obj['pest_and_disease_diagnoses'] = true;
	else if (tab === 'pest_and_disease_add_disease') 
		obj['pest_and_disease_diagnoses'] = true;
	else if (tab === 'pest_and_disease_detailed_diagnosis') 
		obj['pest_and_disease_diagnoses'] = true;
	else if (tab === 'pest_and_disease_detailed_pest') 
		obj['pest_and_disease_diagnoses'] = true;
	else if (tab === 'pest_and_disease_detailed_disease') 
		obj['pest_and_disease_diagnoses'] = true;

	// SMS Management Tab
	else if (tab === 'sms_subscriptions') 
		obj['subscriptions_tab'] = true;
	else if (tab === 'sms_add_subscription') 
		obj['subscriptions_tab'] = true;
	else if (tab === 'sms_messages') 
		obj['messages_tab'] = true;

	// Reports
	else if (tab === 'reports') 
	obj['reports_tab'] = true;


	return obj;
}

exports.innit_pagination = function(obj, start, end, total_record) {
	if (total_record > end) {
		obj['page_next'] = 'ajax(10, 10, "")';
	}
	if (start != '0') {
		obj['page_prev'] = (start - 10).toString();
	}
	return obj;
}

exports.innit_reports = function(obj, role, url) {
	var str;
	var roles = [
		{ name: 'System Admin' }, { name: 'Sales' }, { name: 'Purchasing' }, { name: 'Logistics' }
	];
	if (role === 'System Admin') {
		obj['report_url'] = url;
		obj['roles'] = roles;
	}
	else if (role === 'Sales Employee') {
		obj['report_url'] = url;
		obj['roles'] = [roles[1]];
	}
	else if (role === 'Purchasing Employee') {
		obj['report_url'] = url;
		obj['roles'] = [roles[2]];
	}
	else if (role === 'Logistics Employee') {
		obj['report_url'] = url;
		obj['roles'] = [roles[3]];
	}

	return obj;
}

exports.innitQuery_to_Arr = function(obj) {
	var keys = Object.keys(obj);

	for (var i = 0; i < keys.length; i++) {
		obj[keys[i]] = obj[keys[i]].split(',');
	}
	
	return obj;
}