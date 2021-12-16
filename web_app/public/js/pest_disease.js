function update_color_meter(){
    $(".probability_value").each(function(){
        var value = $(this).text();
        var val = 214 - (parseInt(value) * 2);
        var rgb = "color : rgb(214, " + val + ", 19)";
        $(this).attr("style",rgb);
        if(value != ""){
            $(this).text(parseInt(value) + " %");
        }
    });
}
$(document).ready(function(){

    $(".add-pd-btn").on("click", function(){
        var cur_id = $(this).attr("id");
        if(cur_id == "step1"){
            //check if complete
            var step1 = true;
            if($("#pd_name").val().length == 0)
                step1 = false;
            if($("#pd_scientific").val().length == 0)
                step1 = false;
            if($("#pd_desc").val().length == 0)
                step1 = false;
            if(step1){
                // $("#step1_add").prop("hidden", !this.checked);
                $("#step1_add").toggle("hide");
                $("#step2_add").toggle("show")
                $("#step1_status").addClass("finish");
                $("#step2_status").addClass("active");
            }
            else{
                alert("please complete details");
            }
            
        }
        else if(cur_id == "step2"){
            //check if complete
            if($(".symptom-checkbox:checkbox:checked").length > 0){
                // $("#step1_add").prop("hidden", !this.checked);
                $("#step2_add").toggle("hide");
                $("#step3_add").toggle("show")
                $("#step2_status").addClass("finish");
                $("#step3_status").addClass("active");
            }
            else{
                alert("please select symptoms");
            }
        }
        else if(cur_id == "step3"){
            //check if complete
            if($(".factor-checkbox:checkbox:checked").length > 0){
                // $("#step1_add").prop("hidden", !this.checked);
                $("#step3_add").toggle("hide");
                $("#step4_add").toggle("show")
                $("#step3_status").addClass("finish");
                $("#step4_status").addClass("active");
            }
            else{
                alert("please select factors");

            }
        }
        else if(cur_id == "step4"){
            //check if complete
            if($(".prevention-checkbox:checkbox:checked").length > 0){
                // $("#step1_add").prop("hidden", !this.checked);
                $("#step4_add").toggle("hide");
                $("#step5_add").toggle("show")
                $("#step4_status").addClass("finish");
                $("#step5_status").addClass("active");
            }
            else{
                alert("please select preventions");

            }
        }
        else if(cur_id == "step5"){
            //check if complete
            if($(".solution-checkbox:checkbox:checked").length > 0){
                // $("#step1_add").prop("hidden", !this.checked);
                $("#step5_add").toggle("hide");
                $("#step6_add").toggle("show")
                $("#step5_status").addClass("finish");
                $("#step6_status").addClass("active");
            }
            else{
                alert("please select solutions");

            }
        }
    });

    $(".back-btn").on("click", function(){
        var cur_id = $(this).attr("id");
        if(cur_id == "step6_back"){
            if(true){
                // $("#step1_add").prop("hidden", !this.checked);
                $("#step6_add").toggle("hide");
                $("#step5_add").toggle("show")
                $("#step6_status").addClass("finish");
                $("#step5_status").addClass("active");
            }
            else{
            }
            
        }
        else if(cur_id == "step2_back"){
            //check if complete
            if(true){
                // $("#step1_add").prop("hidden", !this.checked);
                $("#step2_add").toggle("hide");
                $("#step1_add").toggle("show")
                $("#step2_status").addClass("finish");
                $("#step1_status").addClass("active");
            }
            else{
            }
        }
        else if(cur_id == "step3_back"){
            //check if complete
            if(true){
                // $("#step1_add").prop("hidden", !this.checked);
                $("#step3_add").toggle("hide");
                $("#step2_add").toggle("show")
                $("#step3_status").addClass("finish");
                $("#step2_status").addClass("active");
            }
            else{
            }
        }
        else if(cur_id == "step4_back"){
            //check if complete
            if(true){
                // $("#step1_add").prop("hidden", !this.checked);
                $("#step4_add").toggle("hide");
                $("#step3_add").toggle("show")
                $("#step4_status").addClass("finish");
                $("#step3_status").addClass("active");
            }
            else{
            }
        }
        else if(cur_id == "step5_back"){
            //check if complete
            if(true){
                // $("#step1_add").prop("hidden", !this.checked);
                $("#step5_add").toggle("hide");
                $("#step4_add").toggle("show")
                $("#step5_status").addClass("finish");
                $("#step4_status").addClass("active");
            }
            else{
            }
        }
    });


    $(".probability_value").each(function(){
        var value = $(this).text();
        var val = 214 - (parseInt(value) * 2);
        var rgb = "color : rgb(214, " + val + ", 19)";
        $(this).attr("style",rgb);
        if(value != ""){
            $(this).text(parseInt(value) + " %");
        }
    });

    $(".type").on("click", function(){
        $("#materials_list").empty();
        var url = "/getMaterialsAjax/" + $(this).text();
        alert( $(this).text());

        $.get(url, {}, function(result){
            var i;
            for(i = 0; i < result.length; i++)
                $("#materials_list").append('<li class="list-group-item"><div><span style="color: rgb(58,59,69);font-weight: bold;">' + result[i].name +'</span><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></div><div><span>' + result[i].mat_desc +'</span></div></li>');
        });
    });

    $("#newitem").on("click", function(){
        var data = {
            type : "Fertilizer",
            fertilizer_name : "Fertiii",
            fertilizer_desc : "New fertilizer desc",
        }
        $.get("/addNewItem", data, function(result){
            alert(result.msg);
        });
    });


    $(".pestdisease").on('click', function(){
        $(".pestdisease.active").css("background", "");
        $(".pestdisease.active").removeClass("active");
        $(this).addClass("active");
        $(this).css("background", "#F0F0F0");
        $("tr.details").remove();
        var type = $(this).text();
        //update table
        $("tr.probability").remove();
        $.get("/PDProbability", {farm_id : 1, type : $(this).text()}, function(result){
            var i = 0;
            for(i = 0; i < result.probability.length; i++){
                if(result.probability[i].pd_id != null)
                    $("#probability_table").append('<tr class="probability clickable" onclick=' + "'" + 'location.href="/pest_and_disease_details?type=' + type + '&id=' + result.probability[i].pd_id + '"' + "'" + '><a hidden >' + result.probability[i].pd_id +'</a><td>'+ result.probability[i].pd_name +'</td><td>' + result.probability[i].pd_desc + '</td><td class="probability_value">' + result.probability[i].probability + '</td></tr>');
                else
                    $("#probability_table").append('<tr class="probability clickable"><a hidden ></a><td></td><td></td><td class="probability_value"></td></tr>');
            }
            update_color_meter();
        });
    });

    $(".details_tab").on('click', function(){
        $(".details_tab.active").css("background", "");
        $(".details_tab.active").removeClass("active");
        $(this).addClass("active");
        $(this).css("background", "#F0F0F0");

        //update table
        $("div.details").remove();
        $.get("/update_pd_details/"+ $("#type").text() +"/"+ $("#id").text() +"/" + $(this).text(), {}, function(result){
            var i = 0;
            for(i = 0; i < result.length; i++){
                $("#detail_table").append('<div class="card-body card cards-shadown aos-init mini-card symptom-card details" data-aos="flip-left" data-aos-duration="350" ><h4 class="card-title">' + result[i].detail_name + '</h4><p> ' +   result[i].detail_desc +' </p></div>');
            //     if(result.probability[i].pd_id != null)
            //         $("#probability_table").append('<tr class="probability"><a hidden >' + result.probability[i].pd_id +'</a><td>'+ result.probability[i].pd_name +'</td><td>' + result.probability[i].pd_desc + '</td><td class="probability_value">' + result.probability[i].probability + '</td></tr>');
            //     else
            //         $("#probability_table").append('<tr class="probability"><a hidden ></a><td></td><td></td><td class="probability_value"></td></tr>');
            }
            
        });
    });

    $("#diagnosis_type").on("change", function(){
        
        var type = $(this).val();
        $("#pd_list").empty();
        $.get("/ajaxGetPestandDisease", {type : type}, function(pd_list){
            var i; 
            for(i = 0; i < pd_list.length; i++){
                $("#pd_list").append('<option value="' + pd_list[i].pd_id +'">' + pd_list[i].pd_name +'</option>');
            }
        });
    });

});


$(document).on("submit", "#resolve_form", function(event){
    // alert($("#date_solved").val())
    // if($("#date_solved").val() > dateDiff.){
    //     a = true;
    //     if(!a){
    //         event.preventDefault();
    //         alert( "Add date." );
    //     }
    // }
    
});