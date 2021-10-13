
function appendtoURL(url, element_selector, param_names) {
	var data = '';
	for (var i = 0; i < element_selector.length; i++) {
		data = $(element_selector[i]).val();

		url += param_names[i]+''+data;

		data = '';
	}

	console.log(url);

	return url;
}


$(document).ready(function() {

})