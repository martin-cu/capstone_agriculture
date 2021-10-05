var key = '1d1823be63c5827788f9c450fb70c595';

function createPolygon(name, geo_json) {
	var http = new XMLHttpRequest();
	var url = 'http://api.agromonitoring.com/agro/1.0/polygons?appid='+key;
	var params = {
		name: name, 
		geo_json: geo_json
	}

	http.open('POST', url, true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-type', 'application/json');

	http.onreadystatechange = function() {//Call a function when the state changes.
		console.log(http.responseText);
	    if(http.readyState == 4 && http.status == 200) {
	    }
	}
	http.send(JSON.stringify(params));
}

function getPolygonInfo(id) {

}

$(document).ready(function() {

	createPolygon(name, obj);
});