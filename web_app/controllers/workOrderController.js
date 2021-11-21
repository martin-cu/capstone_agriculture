const dataformatter = require('../public/js/dataformatter.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
const workOrderModel = require('../models/workOrderModel.js');
var request = require('request');

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
				resource_type = 'Fertilizer;'
			}

			if (resource_type != null) {
				var query_arr = [];
				var resource_query;

				var resource_id = req.body[''+resource_type+'_id'];
				var resource_qty = req.body[''+resource_type+'_qty'];

				for (var i = 0; i < resource_qty.length; i++) {
					if (resource_qty[i] == 0) {
						resource_qty.splice(i, 1);
						resource_id.splice(i, 1);
					}
				}

				for (var i = 0; i < resource_id.length; i++) {
					resource_query = {
						work_order_id: result.insertId,
						type: resource_type,
						units: null,
						qty: resource_qty[i],
						item_id: resource_id[i]
					};

					query_arr.push(resource_query);

					resource_query = null;
				}

				workOrderModel.createWorkOrderResources(query_arr, function(err, resource_result) {
					if (err)
						throw err;
					else {
						res.render('create_wo_test');
					}
				});
			}
			else {
				res.render('create_wo_test');
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