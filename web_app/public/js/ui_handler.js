function processModalStep(origin, selector) {
	$('#'+origin).toggleClass('hide');
	$('#body'+origin).toggleClass('hide');

	$('#'+selector).toggleClass('hide');
	$('#body'+selector).toggleClass('hide');
}

function resetForm(form_id) {
	$('#'+form_id).trigger('reset');

	$('.modal_body_content, .modal_footer_content').addClass('hide');

	$('#body_step1').removeClass('hide');
	$('#_step1').removeClass('hide');
}

$(document).ready(function() {
	$('.prev_step, .next_step').on('click', function() {
		processModalStep($(this).parent().attr('id'), $(this).val());
	});
	$('[data-dismiss="modal"]').on('click', function() {
		resetForm($(this).val());
	});
})