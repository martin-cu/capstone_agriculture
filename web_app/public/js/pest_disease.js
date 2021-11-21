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
                    $("#probability_table").append('<tr class="probability" href="/pest_and_disease_details?type=' + type + '&id=' + result.probability[i].pd_id + '"><a hidden >' + result.probability[i].pd_id +'</a><td>'+ result.probability[i].pd_name +'</td><td>' + result.probability[i].pd_desc + '</td><td class="probability_value">' + result.probability[i].probability + '</td></tr>');
                else
                    $("#probability_table").append('<tr class="probability"><a hidden ></a><td></td><td></td><td class="probability_value"></td></tr>');
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
});