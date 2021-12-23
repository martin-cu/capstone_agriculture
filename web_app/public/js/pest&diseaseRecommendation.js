$(document).ready(function() {
	console.log('Pest and disease recommendation');

	$.get('/get_crop_plans', {status : ["Active", "In-Progress"]}, function(plans){
		//Loop through each active crop calendar
		var i; 
		for(i =0 ; i < plans.length; i++){
			$.get('/agroapi/polygon/readAll', {}, function(polygons) {
				var center = [];
				for (var x = 0; x < polygons.length; x++) {
					if (plans[i].farm_name == polygons[x].name) {
						center = polygons[x].center;
						console.log(plans[i].calendar_id);
						$.get("/getPossiblePD", {center:center, calendar_id : plans[i].calendar_id}, function(possibilities){
							alert(plans[i].farm_name);
						});
					}
					
				}
				
			});
		}
		
	});

	setInterval(function() {
		//Store recommendation to db
		$.get('/get_crop_plans', {status : ["Active", "In-Progress"]}, function(plans){
			//Loop through each active crop calendar
			var i; 
			for(i =0 ; i < plans.length; i++){
				$.get('/agroapi/polygon/readAll', {}, function(polygons) {
					var center = [];
					for (var x = 0; x < polygons.length; x++) {
						if (plans[i].farm_name == polygons[x].name) {
							center = polygons[x].center;
							console.log(plans[i].calendar_id);
							$.get("/getPossiblePD", {center:center, calendar_id : plans[i].calendar_id}, function(possibilities){
								alert(plans[i].farm_name);
							});
						}
						
					}
					
				});
			}
			
		});
				
	}, 100000);
})