function update_color_meter(){
	alert("update color");
    $(".probability_value").each(function(){
        var value = $(this).text().slice(0,-1);
        var val = 214 - (parseInt(value) * 2);
        var rgb = "color : rgb(214, " + val + ", 19)";
        $(this).attr("style",rgb);
        if(value != ""){
            $(this).text(parseInt(value) + " %");
        }
    });
}

function getFarmDetails(obj) {
	var query = obj;
	console.log('!!!')
	console.log(obj);
	$.get('/filter_farm_details', query, function(details) {
		console.log(details);
		$('#monitor_land_type').html(details.details[0].land_type);
		$('#monitor_farm_area').html(details.details[0].farm_area);
		$('#monitor_desc').html(details.details[0].farm_desc);

		query['status'] = 'Active';
		query['position'] = 'Farm Manager'

		$.get('/filter_farmers', query, function(farmers) {
			$('#monitor_farm_mngr').html(farmers[0].last_name+', '+farmers[0].first_name);
		});

		query['position'] = 'Farmer'

		$.get('/filter_farmers', query, function(farmers) {
			//console.log(farmers);
			var tr, td, append = false;
			for (var i = 0; i < farmers.length; i++) {
				if (i % 3 == 0) {
					tr = '<tr>'
				}

				td = '<td>'+farmers[i].last_name+', '+farmers[i].first_name+'</td>';
				tr += td;
					
				if (i == farmers.length-1) {
					append = true;
				}

				if (append) {
					tr += '</tr>';

					$('#monitor_farmers_table').append(tr);
					append = false;
				}
			}

		});

	});
}

function unixToDate(timestamp) {
	return new Date(timestamp * 1000);
}

function getGeoData(farm_name) {
	var image_url;
	var coordinates = [];
	var center = [];

	toggleStatistics();

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
		console.log(polygons)
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
			console.log(imagery);
			console.log(imagery.length == 0);

			if (imagery.length != 0) {
				console.log(imagery);
				image_url = imagery[imagery.length-1].image.ndvi;

				options['url'] = image_url;
				// for (var i = 0; i < imagery.length; i++) {
				// 	console.log(unixToDate(imagery[i].dt));
				// }

				$.get(imagery[imagery.length-1].stats.ndvi, {}, function(stats) {
					$('#ndvi_date').html(imagery[imagery.length-1].dt);
					$('#statistics_max').html(Math.round(stats.max * 100) / 100);
					$('#statistics_mean').html(Math.round(stats.mean * 100) / 100);
					$('#statistics_median').html(Math.round(stats.median * 100) / 100);
					$('#statistics_min').html(Math.round(stats.min * 100) / 100);
					$('#statistics_deviation').html(Math.round(stats.std * 100) / 100);
				});
			}
			else {
				
			}

			loadGeoMap(options);
		});

		// Load environment details
		$.get('/agroapi/soil/current', { polyid: polygon_id }, function(soil) {
			$('#monitor_surface_temp').html(soil.t0);
			$('#monitor_ground_temp').html(soil.t10);
			$('#monitor_soil_moisture').html(soil.moisture == 'N/A' ? soil.moisture : Math.round(soil.moisture * 100) / 100 + '%');
		});
		$.get('/agroapi/weather/current', { polyid: polygon_id }, function(weather) {
			//console.log(weather);
			// $('#monitor_icon').html();
			$('#monitor_temp').html(weather.main.temp);
			$('#monitor_desc').html(weather.weather[0].description);
		});

	});
}

function toggleStatistics() {
	if (type == 'Weather') {
		$('#statistics_ndvi').addClass('hide');
		$('#statistics_weather').removeClass('hide');
	}
	else if (type == 'NDVI') {
		$('#statistics_ndvi').removeClass('hide');
		$('#statistics_weather').addClass('hide');

	}
}

function createMap(token, options) {
	var map = new mapboxgl.Map({
        container: 'monitor_map',
        zoom: 13.2,
        center: options.center,
        style: 'mapbox://styles/mapbox/satellite-v9',
        transition: {
        	duration: 300,
        	delay: 0
        }
    });

    return map;
}

function addRasterImage(map, options) {
	map.on('load', () => {
        map.addSource('radar', {
            'type': 'image',
            'url': options.url,
            'coordinates': options.coordinates
        });
        map.addLayer({
            id: 'radar-layer',
            'type': 'raster',
            'source': 'radar',
            'paint': {
                'raster-fade-duration': 0
            }
        });
    });

    return map;
}

function addPolygon(map, options) {
	console.log(options);
	let temp_arr = [];
	temp_arr.push(options.coordinates);
	options.coordinates = temp_arr;

	map.on('load', () => {
		map.addSource('polygon', {
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'geometry': {
					'type': 'Polygon',
					'coordinates': options.coordinates
				}
			}
		});
		 
		// Add a new layer to visualize the polygon.
		map.addLayer({
			'id': 'polygon',
			'type': 'fill',
			'source': 'polygon', // reference the data source
			'layout': {},
			'paint': {
				'fill-color': '#9370db', //color fill
				'fill-opacity': 0.5
			}
		});
		// Add a black outline around the polygon.
		map.addLayer({
			'id': 'outline',
			'type': 'line',
			'source': 'polygon',
			'layout': {},
			'paint': {
				'line-color': '#663399',
				'line-width': 2
			}
		});
	});
	$(".loader").toggle("hide");
	return map;
}

function loadGeoMap(options) {
	mapboxgl.accessToken = 'pk.eyJ1IjoiaW1hcnRpbjAwMjMiLCJhIjoiY2t2NmJ1a2JsM3dldzJwcDZyeXp6bDlsYSJ9.8VlCX1xsLOIxjGiGO8X3Pg';
    const map = createMap(mapboxgl.accessToken, options);


    if (type == 'NDVI') {
    	addRasterImage(map, options);
    }
    else if (type == 'Weather') {
    	addPolygon(map, options);
    }
	    
}

$(document).ready(function() {
	
	console.log('GIS Map Loader!!');
	console.log(view);

	if (view == 'farm_monitoring') {
		var viewed_farm_id;
		var viewed_farm_name;
		jQuery.ajaxSetup({async: false });

		$.get('/get_farm_list', { group: 'farm_id' }, function(farms) {
			console.log(farms);
			var li, style = 'border: 1px solid rgba(0,0,0,.125)';
			viewed_farm_id = farms[0].farm_id;
			viewed_farm_name = farms[0].farm_name;

			for (var i = 0; i < farms.length; i++) {
				li = '';

				li = '<li style="'+style+'" class="farm_li list-group-item" data="'+farms[i].farm_id+'"><span>'+farms[i].farm_name+'</span><span class="float-end">'+farms[i].farm_area+'ha'+'</span></li>';
				$('#monitor_farm_list').append(li);
			}
			var query = farms[0].farm_name;

			getFarmDetails({ farm_id: viewed_farm_id });
			getGeoData(query);
		});

		console.log(viewed_farm_id);
		$.get("/ajax_farm_details", {farm_id : viewed_farm_id}, function(farm_details){
			console.log(farm_details);
			$("#farm_id").text(farm_details.details[0].farm_id);
			$("#farm_name").text(farm_details.details[0].farm_name);
			$("#farm_type").text(farm_details.details[0].land_type);
			$("#farm_manager").text(farm_details.details[0].first_name + " " + farm_details.details[0].last_name);
			$("#farm_desc").text(farm_details.details[0].farm_desc);
			$("#farm_area").text(farm_details.details[0].farm_area + " sqm");
		});



		$('#monitor_farm_list').on('click', '.farm_li', function() {

			viewed_farm_id = $(this).attr('data');
			viewed_farm_name = $($(this).children()[0]).html();

			$('#monitor_farmers_table').empty();

			//To be removed
			var query = viewed_farm_name;
			console.log(query);
			getFarmDetails({ farm_id: viewed_farm_id });
			getGeoData(query);

			//Y2 Add Farm Monitoring Ajax
			//UPDATE FARM DETAILS
			$(".table-details").empty();
			$.get('/agroapi/polygon/readAll', {}, function(polygons) {
				var center = [];
				for (var i = 0; i < polygons.length; i++) {
					if (viewed_farm_name == polygons[i].name) {
						center = polygons[i].center;
					}
				}
				
				//GET DETAILS OF NEW FARM
				$.get("ajax_farm_details", {farm_id : viewed_farm_id, center : center}, function(farm_details){
					$("#farm_id").text(farm_details.details[0].farm_id);
					$("#farm_name").text(farm_details.details[0].farm_name);
					$("#farm_type").text(farm_details.details[0].land_type);
					$("#farm_manager").text(farm_details.details[0].first_name + " " + farm_details.details[0].last_name);
					$("#farm_desc").text(farm_details.details[0].farm_desc);
					$("#farm_area").text(farm_details.details[0].farm_area + " sqm22");
	
					var i;
					//UPDATE ROUSEOURCES
					for(i = 0; i < 5; i++){
						if(farm_details.seed[i].item_name == null)
							$("#seed-table").append('<tr style="min-height: 50px;"><td class="text-center" style="padding: 2px;"></td><td style="padding: 2px;text-align: center;"> <i class="fa fa-warning" data-toggle="tooltip" data-bss-tooltip="" style="margin-left: 5px;color: var(--orange);" title="Low in Stock. Replenish now."></i>&nbsp;</td></tr>');
						else
							$("#seed-table").append('<tr style="min-height: 50px;"><td class="text-center" style="padding: 2px;">' + farm_details.seed[i].item_name + '</td><td style="padding: 2px;text-align: center;">' + farm_details.seed[i].current_amount + ' <i class="fa fa-warning" data-toggle="tooltip" data-bss-tooltip="" style="margin-left: 5px;color: var(--orange);" title="Low in Stock. Replenish now."></i>&nbsp;</td></tr>');
					}
					for(i = 0; i < 5; i++){
						if(farm_details.fertilizer[i].item_name == null)
							$("#fertilizer-table").append('<tr style="min-height: 50px;"><td class="text-center" style="padding: 2px;"></td><td style="padding: 2px;text-align: center;"><i class="fa fa-warning" data-toggle="tooltip" data-bss-tooltip="" style="margin-left: 5px;color: var(--orange);" title="Low in Stock. Replenish now."></i>&nbsp;</td></tr>');
						else
							$("#fertilizer-table").append('<tr style="min-height: 50px;"><td class="text-center" style="padding: 2px;">' + farm_details.fertilizer[i].item_name + '</td><td style="padding: 2px;text-align: center;">' + farm_details.fertilizer[i].current_amount + ' <i class="fa fa-warning" data-toggle="tooltip" data-bss-tooltip="" style="margin-left: 5px;color: var(--orange);" title="Low in Stock. Replenish now."></i>&nbsp;</td></tr>');
					}
					for(i = 0; i < 5; i++){
						if(farm_details.pesticide[i].item_name == null)
							$("#pesticide-table").append('<tr style="min-height: 50px;"><td class="text-center" style="padding: 2px;"></td><td style="padding: 2px;text-align: center;"><i class="fa fa-warning" data-toggle="tooltip" data-bss-tooltip="" style="margin-left: 5px;color: var(--orange);" title="Low in Stock. Replenish now."></i>&nbsp;</td></tr>');
						else
							$("#pesticide-table").append('<tr style="min-height: 50px;"><td class="text-center" style="padding: 2px;">' + farm_details.pesticide[i].item_name + '</td><td style="padding: 2px;text-align: center;">' + farm_details.pesticide[i].current_amount + ' <i class="fa fa-warning" data-toggle="tooltip" data-bss-tooltip="" style="margin-left: 5px;color: var(--orange);" title="Low in Stock. Replenish now."></i>&nbsp;</td></tr>');
					}
					//UPDATE PEST AND DISEASE CARD
					for(i = 0; i < 3; i++){
						if(farm_details.probability[i].pd_name == null)
							$("#probability_table").append('<tr class="clickable"><td style="text-align: left;"></td><td class="probability_value"></td></tr>');
						else
							$("#probability_table").append('<tr class="clickable"><td style="text-align: left;">' + farm_details.probability[i].pd_name + '</td><td>' + farm_details.probability[i].type + '</td><td class="probability_value">' + farm_details.probability[i].probability + '%</td></tr>');
						

					}
					update_color_meter();
				});
			});
			
			
		

			
		});

		$('#toggle_ndvi').on('click', function() {
			type = 'NDVI';

			//To be removed
			var query = viewed_farm_name;

			getGeoData(query);
		});

		$('#toggle_weather').on('click', function() {
			type = 'Weather';
			
			//To be removed
			var query = viewed_farm_name;

			getGeoData(query);
		});

	}
	else if (view == '') {

	}
	else if (view == undefined) {

	}	

});