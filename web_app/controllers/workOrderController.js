const dataformatter = require('../public/js/dataformatter.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
const workOrderModel = require('../models/workOrderModel.js');
var request = require('request');

function consolidateResources(type, ids, qty, wo_id) {
	var query_arr = [];
	var resource_query;

	var resource_id = ids;
	var resource_qty = qty;

	for (var i = 0; i < resource_qty.length; i++) {
		if (resource_qty[i] == 0) {
			resource_qty.splice(i, 1);
			resource_id.splice(i, 1);
		}
	}

	for (var i = 0; i < resource_id.length; i++) {
		resource_query = {
			work_order_id: wo_id,
			type: type,
			units: null,
			qty: resource_qty[i],
			item_id: resource_id[i]
		};

		query_arr.push(resource_query);

		resource_query = null;
	}

	return query_arr;
}

exports.ajaxGetWOResources = function(req, res) {
	var query = { work_order_id: req.query.work_order_id };
	workOrderModel.getResourceDetails(query, req.query.type, function(err, resource_details) {
		if (err)
			throw err;
		else {
			// html_data['resources'] = resource_details;
			// html_data['resources']['title'] = type+'s:';
			// html_data['resources']['lbl'] = { name: type, item: type+'_id', qty: type+'_qty' };
			// res.render('detailed_work_order', html_data);
			res.send(resource_details);
		}
	});
}

exports.getDetailedWO = function(req, res) {
	var query = { work_order_id: req.params.work_order_id };
	workOrderModel.getDetailedWorkOrder(query, function(err, details) {
		if (err)
			throw err;
		else {
			details = details[0];
			details['date_start'] = dataformatter.formatDate(new Date(details['date_start']), 'YYYY-MM-DD');
			details['date_due'] = dataformatter.formatDate(new Date(details['date_due']), 'YYYY-MM-DD');
			details['date_created'] = dataformatter.formatDate(new Date(details['date_created']), 'YYYY-MM-DD');
			details['date_completed'] = dataformatter.formatDate(new Date(details['date_completed']), 'YYYY-MM-DD');

			var type;
			var html_data = {
				work_order: details,
				editable: details.status == 'Completed' || details.status == 'Cancelled' ? false : true
			};
			html_data = js.init_session(html_data, 'role', 'name', 'username', 'farms');

			switch (details.type) {
				case 'Sow Seed':
				type = 'Seed';
				break;
				case 'Pesticide Application':
				type = 'Pesticide';
				break;
				case 'Fertilizer Application':
				type = 'Fertilizer';
				break;
				default:
				type = null;
			}

			if (type != null) {
				workOrderModel.getResourceDetails(query, type, function(err, resource_details) {
					if (err)
						throw err;
					else {
						html_data['resources'] = resource_details;
						html_data['resources']['title'] = type+'s:';
						html_data['resources']['lbl'] = { name: type, item: type+'_id', qty: type+'_qty' };
						res.render('detailed_work_order', html_data);
					}
				});
			}
			else {
				res.render('detailed_work_order', html_data);
			}
		}
	});
}

exports.createWorkOrder = function(req, res) {
	var query = {
		type: req.body.wo_type,
		crop_calendar_id: req.body.crop_calendar_id,
		date_created: dataformatter.formatDate(new Date(), 'YYYY-MM-DD'),
		date_due: dataformatter.formatDate(new Date(req.body.due_date), 'YYYY-MM-DD'),
		date_start: dataformatter.formatDate(new Date(req.body.start_date), 'YYYY-MM-DD'),
		status: 'Pending',
		desc: null,
		notes: req.body.notes
	};

	workOrderModel.createWorkOrder(query, function(err, result) {
		if (err)
			throw err;
		else {
			var resource_type = null;

			if (query.type == 'Pesticide Application') {
				resource_type = 'Pesticide';
			}
			else if (query.type == 'Fertilizer Application') {
				resource_type = 'Fertilizer'
			}

			if (resource_type != null) {
				var query_arr = consolidateResources(resource_type, req.body[''+resource_type+'_id']
						, req.body[''+resource_type+'_qty'], result.insertId);

				workOrderModel.createWorkOrderResources(query_arr, function(err, resource_result) {
					if (err)
						throw err;
					else {
						res.redirect('/farms/work_order&id='+result.insertId);
					}
				});
			}
			else {
				res.redirect('/farms/work_order&id='+result.insertId);
			}
		}
	})
}

exports.ajaxCreateWorkOrder = function(req, res) {
	var query = {
		type: req.body.wo_type,
		crop_calendar_id: req.body.crop_calendar_id,
		date_created: dataformatter.formatDate(new Date(), 'YYYY-MM-DD'),
		date_due: dataformatter.formatDate(new Date(req.body.due_date), 'YYYY-MM-DD'),
		date_start: dataformatter.formatDate(new Date(req.body.start_date), 'YYYY-MM-DD'),
		status: 'Pending',
		desc: null,
		notes: req.body.notes
	};
	var resource_ids = req.body.resources.ids;
	var resource_qty = req.body.resources.qty;

	workOrderModel.createWorkOrder(query, function(err, result) {
		if (err)
			throw err;
		else {
			var resource_type = null;

			if (query.type == 'Pesticide Application') {
				resource_type = 'Pesticide';
			}
			else if (query.type == 'Fertilizer Application') {
				resource_type = 'Fertilizer'
			}

			if (resource_type != null) {
				var query_arr = consolidateResources(resource_type, resource_ids
						, resource_qty, result.insertId);

				workOrderModel.createWorkOrderResources(query_arr, function(err, resource_result) {
					if (err)
						throw err;
					else {
						res.send('/farms/work_order&id='+result.insertId);
					}
				});
			}
			else {
				res.send('/farms/work_order&id='+result.insertId);
			}
		}
	})
}

exports.ajaxGetWorkOrders = function(req, res) {
	var query = req.query;
	workOrderModel.getWorkOrders(query, function(err, list) {
		if (err)
			throw err;
		else {
			res.send(list);
		}
	});
}

exports.getWorkOrdersPage = function(req, res) {
	var query = {
        order: ['work_order_table.status ASC', 'work_order_table.date_due DESC']
    }
	workOrderModel.getWorkOrders(query, function(err, list) {
		if (err)
			throw err;
		else {
			for (var i = 0; i < list.length; i++) {
				list[i].date_created = dataformatter.formatDate(new Date(list[i].date_created), 'YYYY-MM-DD');
				list[i].notes = list[i].notes == null ? 'N/A' : list[i].notes[i];
			}

			var html_data = { wo_list: list };
			html_data = js.init_session(html_data, 'role', 'name', 'username', 'farms');
			console.log(html_data.wo_list);
			res.render('farms', html_data);
		}
	});
}

exports.editWorkOrder = function(req, res) {
	var query = {
		type: req.body.type,
		crop_calendar_id: req.body.crop_calendar_id,
		date_created: req.body.date_created,
		date_start: req.body.date_start,
		date_due: req.body.date_due,
		status: req.body.status,
		desc: null,
		notes: req.body.notes
	};
	var filter = {
		work_order_id: req.body.wo_id
	};

	console.log(query.status);

	query['date_completed'] = dataformatter.formatDate(new Date(), 'YYYY-MM-DD');

	workOrderModel.updateWorkOrder(query, filter, function(err, list) {
		if (err)
			throw err;
		else {
			workOrderModel.deleteResourceRecord(filter, function(err, resource_delete) {
				if (err)
					throw err;
				else {	
					var resource_type = null;
					if (query.type == 'Pesticide Application') {
						resource_type = 'Pesticide';
					}
					else if (query.type == 'Fertilizer Application') {
						resource_type = 'Fertilizer;'
					}

					console.log(resource_type, req.body[''+resource_type+'_id']);
					console.log(req.body[''+resource_type+'_qty']);
					var query_arr = consolidateResources(resource_type, req.body[''+resource_type+'_id']
						, req.body[''+resource_type+'_qty'], filter.work_order_id);

					workOrderModel.createWorkOrderResources(query_arr, function(err, resource_create) {
						if (err)
							throw err;
						else {
							res.redirect('/farms/work_order&id='+filter.work_order_id);
						}
					})
				}
			});
		}
	});
}