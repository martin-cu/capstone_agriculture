$(document).ready(function() {
	console.log('work order harvest!');

	setInterval(function() {
		$.get('/get_crop_plans', { status: ['In-Progress', 'Active'] }, function(wo_list) {
			wo_list = wo_list.filter(list => list.stage == 'Harvesting');
			for (var i = 0; i < wo_list.length; i++) {
				$.get('/ajax_edit_wo', { calendar_id: wo_list[i].calendar_id }, function(edit_status) {
					console.log(edit_status);
				});
			}
		});
	}, 600000);
})