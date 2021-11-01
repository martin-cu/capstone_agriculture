function processModalStep(origin, selector) {
	var step = selector.replace(/\D/g, "");
	var proceed = true;
	if (view == 'add_farm') {
		proceed = dataValidation(step);
	}

	if (proceed) {
		$('#'+origin).toggleClass('hide');
		$('#body'+origin).toggleClass('hide');

		$('#'+selector).toggleClass('hide');
		$('#body'+selector).toggleClass('hide');
	}
}

function resetForm(form_id) {
	$('#'+form_id).trigger('reset');

	$('.modal_body_content, .modal_footer_content').addClass('hide');

	$('#body_step1').removeClass('hide');
	$('#_step1').removeClass('hide');
}

function dataValidation(step) {
	var pass = true;
	var inp = [];
	var val;
	$('.inp-error').remove();
	if (view == 'add_farm') {
		if (step == 2) {
			inp = ['farmName'];
		}
		else if (step == 3) {
			pass = validatePolygon();

			if (!pass) {
				$('#geotag_lbl').after().append('<label class="inp-error">Please select atleast 3 points</label>');
			}
		}
	}

	for (var i = 0; i < inp.length; i++) {
		var m = $('#'+inp[i]).val();

		if (m == '' || m == undefined) {
			var parent = $('#'+inp[i]).parent().append('<label class="inp-error">This field is required</label>');
			pass = false;
		}
	}

	return pass;
}

function validatePolygon() {
	var pass = false;

	if (coordinate_arr.length >= 3) {
		pass = true;
	}

	return pass;
}

$(document).ready(function() {
	$('.prev_step, .next_step').on('click', function() {
		processModalStep($(this).parent().attr('id'), $(this).val());
	});
	$('[data-dismiss="modal"]').on('click', function() {
		resetForm($(this).val());
	});
})