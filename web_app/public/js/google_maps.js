let map;    
let markers = [];
let coordinate_arr = [];

function initMap() {
    const socorroMindoro = { lat: 13.07316, lng: 121.3816 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13.2,
        center: socorroMindoro
    });

    // This event listener will call addMarker() when the map is clicked.
    map.addListener("click", (event) => {
        addMarker(event.latLng);
    });

    // add event listeners for the buttons
    document
        .getElementById("show-markers")
        .addEventListener("click", showMarkers);
    document
        .getElementById("hide-markers")
        .addEventListener("click", hideMarkers);
    document
        .getElementById("delete-markers")
        .addEventListener("click", deleteMarkers);

    // Adds a marker at the center of the map.
    //addMarker(socorroMindoro);
}

// Adds a marker to the map and push to the array.
function addMarker(position) {
  const marker = new google.maps.Marker({
    position,
    map,
  });

  markers.push(marker);
  coordinate_arr.push(position.toJSON());
}

/* What the data looks like 
    position:{lat:13.0736, lng:121.3832},
    map:map
*/

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
  console.log(coordinate_arr);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  hideMarkers();
  markers = [];
  coordinate_arr = [];
}