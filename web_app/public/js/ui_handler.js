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
		if($(this).attr("id") == "add_diagnosis_btn1"){
			var today = new Date();
			if(!$("#date_diagnosed").val() || $("#date_diagnosed").val() > (today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate())){
				alert("Enter proper date");
			}
			else{
				//GENERATE RECOMMENDATION
				$.get('/generateRecommendationDiagnosis',{farm_name : $("#farm_id option:selected").text(), type : $("#diagnosis_type").val(), pd_id : $("#pd_list").val()}, function(result){
					var i;
					for(i = 0; i < result.length; i++)
						$("#recommended_solutions").append('<div class="row"><div class="col-lg-3"><label class="form-check-label font-weight-bold" for="formCheck-2" >' + result[i].date_words + '</label></div><div class="col-lg-3"><label class="form-check-label font-weight-bold" for="formCheck-2" >' + result[i].type + '</label></div><div class="col-lg-5"><label class="form-check-label font-weight-bold" for="formCheck-2" style="max-width: 200px;overflow: hidden;white-space: nowrap; text-overflow: ellipsis;">' + result[i].desc + '</label></div><div class="col-lg-1"><input name="solution[' + i + ']" id="" class="form-check-input symptom-checkbox" type="checkbox" value="' + result[i].date + '|' + result[i].type + '|' + result[i].desc + '" form="add_diagnosis_form"></div></div>');
				});
				processModalStep($(this).parent().attr('id'), $(this).val());
				
			}
		}
		else{
			processModalStep($(this).parent().attr('id'), $(this).val());
		}
	});
	$('[data-dismiss="modal"]').on('click', function() {
		if($("#update_purchase_btn").val() == "Pending"){
			$("#process_step").toggle("show");
		}
		else if($("#update_purchase_btn").val() == "Processing"){
		   $("#purchase_step").toggle("show");
		}
		resetForm($(this).val());
	});
})