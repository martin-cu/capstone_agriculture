// MAPBOX ACCESS TOKEN
mapboxgl.accessToken = 'pk.eyJ1IjoiaW1hcnRpbjAwMjMiLCJhIjoiY2t2NmJ1a2JsM3dldzJwcDZyeXp6bDlsYSJ9.8VlCX1xsLOIxjGiGO8X3Pg';

// CREATE MAP
const map = new mapboxgl.Map({
    container: 'dashboard-map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [121.3856, 13.07316], // starting position [lng, lat]
    zoom: 13.2, // starting zoom
    transition: {
        duration: 300,
        delay: 0
    }
});

// SHOW POLYGONS FROM AGRO API
$(document).ready(function() {

    if (view == 'home') {
		jQuery.ajaxSetup({async: false });
        var geojson;
        var coordinates = [];

        // GET FARMS AJAX kept incase pushing of polygons to coordinates array
            // need to be filtered with current list of farms (compared to agro api's list)
            // Ideally, it should be the same once (delete functionalities are added next time?)
        $.get('/get_farm_list', { group: 'farm_id' }, function(farms) {
			
        // Start getting list of polygons
        $.get('/agroapi/polygon/readAll', {}, function(polygons) {

            // Initialize geojson object that stores an array of features
                geojson = {
                    "name":"MyPolygons",
                    "type":"FeatureCollection",
                    "features":[]
                };

                // Loop through polygons and push coordinates to the array of features (One feature object per farm)
                for (var i = 0; i < farms.length; i++) {
                for (var j = 0; j < polygons.length; j++) {

                    if (polygons[j].name == farms[i].farm_name) {
               
                    coordinates.push(polygons[j].geo_json.geometry.coordinates[0]);
                    
                    geojson.features.push({ "type": "Feature","geometry": {"type": "Polygon","coordinates": coordinates},"properties": null });
                    //alert(coordinates);
                    
                    // Empty coordinates array at the end of the loop to filter coordinates per farm and feature on every push
                    coordinates = [];
                    
                }
                        
                }     
            
                }
                   //alert(geojson.features);

    });

    // END OF GET POLYGONS AJAX

    });
    // END OF GET FARMS AJAX

    // ADD POLYGON SOURCE AND LAYERS ON MAP LOAD
    map.on('load', function () {

    // Add the features to the Mapbox source
    map.addSource('polygon', {
        type: 'geojson',
        data: {
        type: 'FeatureCollection',
        features: geojson.features // get array of features 
    },
    });

     map.addLayer({
        'id': 'polygonfill',
        'type': 'fill',
        'source': 'polygon', // reference the data source
        "layout": {
        'visibility': 'visible',
        },
        'paint': {
        'fill-color': '#9370db', //color fill
        'fill-opacity': 0.5,
        }
        });

        //Add a black outline around the polygon.
        map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'polygon',
        "layout": {
        'visibility': 'visible',
        },
        'paint': {
        'line-color': '#663399',
        'line-width': 2,
        }
        });

    });
    // END OF ADD POLYGON SOURCE AND LAYERS

    }
    // END OF IF STATEMENT FOR PAGE VIEW
 
});
// END OF SHOW POLYGONS FROM AGRO API
