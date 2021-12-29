$(document).ready(function() {
	console.log('Pest and disease recommendation');

	setInterval(function() {
		//Store recommendation to db
		$.get('/get_crop_plans', {status : ["Active", "In-Progress"]}, function(plans){
			//Loop through each active crop calendar
			var i; 
			for(i =0 ; i < plans.length; i++){
				$.get('/agroapi/polygon/readAll', {}, function(polygons) {
					var center = [];
					for (var x = 0; x < polygons.length; x++) {
						if (plans[i].farm_name == polygons[x].name) {
							center = polygons[x].center;
							console.log(plans[i].calendar_id);
							$.get("/getPossiblePD", {center:center, calendar_id : plans[i].calendar_id}, function(possibilities){
								// alert(plans[i].farm_name);

								//Store in recommendated db
								var y; 
								for(y = 0; y < possibilities.length; y++){
									$.get("/storePDRecommendation", {calendar_id : plans[i].calendar_id, possibilities : possibilities[y], farm_id : plans[i].farm_id}, function(recommendation){

									});
								}
							});
						}
					}
				});
			}
		});
	}, 60000);


	setInterval(function(){
		//Create Recommendation
		//Loop through diagnosis
		$.get('/ajaxGetDiagnoses', {farm_id : null, type : null}, function(diagnoses){
			var i;
			for(i = 0; i < diagnoses.length; i++){
				
			}
		});
	}, 100000)


	//CROP CALENDAR CREATION
	if (view == 'add_crop_calendar') {

		$('.next_step').on('click', function() {
			if (currentTab == 3) {
				alert("Pestiicde recommendation");
				$.get('/ajaxGetDiagnoses', {}, function(diagnoses){
					//Get Probabilities from DB
					$.get("/ajaxGetPastProbabilities", {}, function(probabilities){
						var i, x;
						var possibilities = [];
						for(i = 0; i < probabilities.length; i++){
							// console.log(probabilities[i]);
							for(x = 0; x < diagnoses.length; x++){
								if(diagnoses[x].pd_id == probabilities[i].pd_id && diagnoses[x].type == probabilities[i].pd_type){
									console.log(probabilities[i].pd_name);
									console.log(probabilities[i].probability);
									console.log("-------------------");
									probabilities[i].probability = probabilities[i].probability * 1.1;
									// if($("#farm_id").val() == diagnoses[x].farm_id){
									// 	console.log("same farm " + diagnoses[x].farm_name);
									// 	probabilities[i].probability = probabilities[i].probability * 1.2;
									// }
									// else{
									// 	probabilities[i].probability = probabilities[i].probability * 1.1;
									// }
								}
								if(probabilities[i].probability >= 30){
									console.log("push");
									possibilities.push(probabilities[i]);
								}
							}
							
								
						}
						console.log(possibilities);
						for(i = 0; i < possibilities.length; i++){
							//Get preventions
							console.log("plus 1");
							//Add to pesticide application plan
							$("#body_step4").append('<div class="row"> <div class="col-lg-5 col-xxl-4"> <div class="card shadow mb-4"> <div class="card-header mini py-3" style="background: #212529;"> <h6 class="fw-bold m-0" style="color: #FFFFFF;">Pest 1<br></h6> </div> <div class="card-body" style="height: 250px;"> <div class="table-responsive" style="border-style: none;"> <table class="table" style="height : 250px;"> <thead> </thead> <tbody> <tr style="border-style: none;"> <td style="border-style: none;"><span class="d-xxl-flex justify-content-xxl-start" style="font-weight: bold;">Name<br></span> <span class="d-xxl-flex justify-content-xxl-start" id="">' + possibilities[i].pd_name + '<br></span></td> <td style="border-style: none;"><span class="d-xxl-flex justify-content-xxl-start" style="font-weight: bold;">Type<br></span><span class="d-xxl-flex justify-content-xxl-start" id="">' + possibilities[i].pd_type + '<br></span></td> </tr> <tr style="border-style: none;"> <td style="border-style: none;"><span class="d-xxl-flex justify-content-xxl-start" style="font-weight: bold;">Last Diagnosed<br></span><span class="d-xxl-flex justify-content-xxl-start"  id="">' + possibilities[i].farm_name + '<br></span><span class="d-xxl-flex justify-content-xxl-start"  id="">[date]<br></span></td> </tr> </tbody> </table> </div> </div> </div> </div> <div class="col-lg-7 col-xxl-8"> <div class="card shadow mb-4"> <div class="card-header mini py-3" style="background: #212529;height: auto;"> <h6 class="fw-bold m-0" style="color: #FFFFFF;">Pesticide Application Plan 1 Information<br></h6> </div> <div class="card-body table-responsive" style="height : 250px; padding-left : 1.5rem; padding-right : 1.5rem;"> <table class="table" id="pd_recommendation_table" style="width: 100%;"> <thead> <tr> <th style="text-align: left; width : 25%">Date</th> <th style="text-align: left; width : 30%">Prevention</th> <th style="text-align: left; width : 40%">Description</th> <th style="text-align: left; width : 5%"></th> </tr> </thead> <tbody style="overflow: auto;"> <tr> <td style="text-align: left;">Date</td> <td style="text-align: left;">Prevention</td> <td style="text-align: left;">Description</td> <td style="text-align: left;"><input type="checkbox" form="" id="" value=""></td> </tr> </tbody> </table> </div> </div> </div> </div>');
						}
					});
				});
			}
		});
	}
})
