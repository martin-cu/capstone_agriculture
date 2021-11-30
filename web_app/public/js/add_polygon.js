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
        map.resize(); 
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
    // const coords = document.getElementById('show-coords');

   	coordinate_arr = turf.meta.coordAll(data);
    // const polyCoord = turf.meta.cordAll(data); // has to be constant to load on innerHTML

	if (data.features.length > 0) {
	const area = turf.area(data);
	// Restrict the area to 2 decimal points.
	const rounded_area = Math.round(area * 100) / 100;
	size.innerHTML = `<p><strong>${rounded_area}</strong> square meters </p>`;
	// alert(coordinate_arr);
    // coords.innerHTML =`<p><strong>${polyCoord}</strong></p>`; // temporary
    
	} else {
	size.innerHTML = '<p>Click the map to draw a polygon.</p';

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