function getFarmDetails(obj) {
	var query = obj;
	$.get('/filter_farm_details', query, function(details) {
		$('#monitor_land_type').html(details[0].land_type);
		$('#monitor_farm_area').html(details[0].farm_area);
		$('#monitor_desc').html(details[0].farm_desc);

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

function tempReplaceFarm(reference) {
	var query = '';
	if (reference == 'farm1') {
		query = 'Iowa Demo Field';
	}
	else if (reference == 'farm2') {
		query = 'Iowa Demo Field';
	}
	else {
		query = 'LA Farm (API Paid)';
	}

	return query;
}

// ADD FARM PAGE

// DRAW POLYGON
mapboxgl.accessToken = 'pk.eyJ1IjoiaW1hcnRpbjAwMjMiLCJhIjoiY2t2NmJ1a2JsM3dldzJwcDZyeXp6bDlsYSJ9.8VlCX1xsLOIxjGiGO8X3Pg';

let coordinate_arr = [];

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [121.3816, 13.07316], // starting position [lng, lat]
    zoom: 12 // starting zoom
    });

map.on('load', function() {
        map.resize()
    });

const draw = new MapboxDraw({
	displayControlsDefault: false,
	// Select which mapbox-gl-draw control buttons to add to the map.
	controls: {
		polygon: true,
		trash: true
	},
	// Set mapbox-gl-draw to draw by default.
	// The user does not have to click the polygon control button first.
	defaultMode: 'draw_polygon'
});

map.addControl(draw);
 
map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);
 
function updateArea(e) {
	const data = draw.getAll();
	const size = document.getElementById('calculated-area');
    const coords = document.getElementById('show-coords');

   	coordinate_arr = turf.meta.coordAll(data);

	if (data.features.length > 0) {
	const area = turf.area(data);
	// Restrict the area to 2 decimal points.
	const rounded_area = Math.round(area * 100) / 100;
	size.innerHTML = `<p><strong>${rounded_area}</strong> square meters </p>`;
	alert(coordinate_arr);
    // coords.innerHTML =`<p><strong>${polyCoord}</strong></p>`; // temporary
    
	} else {
	size.innerHTML = '';

	if (e.type !== 'draw.delete')
	alert('Click the map to draw a polygon.');
	}
    
}

// This function resizes the mapbox div (fixes the "Leaflet and Mapbox in modal not displaying properly" bug)
function checkContainer() {
    if ($('#map').is(':visible')) { //if the container is visible on the page
    map.resize(); //Adds a grid to the html
    } else {
    setTimeout(checkContainer, 50); //wait 50 ms, then try again
    }
}
// END OF ADD FARM PAGE

$(document).ready(function() {
	
	console.log('sadasd');
	console.log(view);

	if (view == 'farm_monitoring') {
		var viewed_farm_id;
		var viewed_farm_name;

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
			var query = tempReplaceFarm(farms[0].farm_name);

			getFarmDetails({ farm_id: viewed_farm_id });
			getGeoData(query);
		});


		$('#monitor_farm_list').on('click', '.farm_li', function() {

			viewed_farm_id = $(this).attr('data');
			viewed_farm_name = $($(this).children()[0]).html();

			$('#monitor_farmers_table').empty();

			//To be removed
			var query = tempReplaceFarm(viewed_farm_name);
			console.log(query);
			getFarmDetails({ farm_id: viewed_farm_id });
			getGeoData(query);

			//Y2 Add Farm Monitoring Ajax
		});

		$('#toggle_ndvi').on('click', function() {
			type = 'NDVI';

			//To be removed
			var query = tempReplaceFarm(viewed_farm_name);

			getGeoData(query);
		});

		$('#toggle_weather').on('click', function() {
			type = 'Weather';
			
			//To be removed
			var query = tempReplaceFarm(viewed_farm_name);

			getGeoData(query);
		});

	}
	else if (view == '') {

	}
	else if (view == undefined) {

	}	

});