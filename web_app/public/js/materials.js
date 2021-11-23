function clearList(){
    
}

$(document).ready(function(){
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
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


    $(".resources_tab").on('click', function(){
        $(".resources_tab.active").css("background", "");
        $(".resources_tab.active").removeClass("active");
        $(this).addClass("active");
        $(this).css("background", "#F0F0F0");

        $("tr.resources").remove();

        //update table
        $.get("/getResourcesPerFarm", {farm_id : 1, type : $(this).text()}, function(result){
            var i = 0;
            for(i = 0; i < result.items.length; i++){
                $("#resources_table").append('<tr class="clickable resources"><td>' + result.items[i].item_name +'</td><td>' +  result.items[i].item_type  +'</td><td>' + result.items[i].current_amount +'</td><td>' + result.items[i].units +'<td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');
            }
            for(i = 0; i < result.blanks.length; i++)
                $("#resources_table").append('<tr class="clickable resources"><td></td><td></td><td></td><td></td><td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');

        });
    });

    $(".requests").on('click', function(){
        $(".requests.active").css("background", "");
        $(".requests.active").removeClass("active");
        $(this).addClass("active");
        $(this).css("background", "#F0F0F0");

        $("tr.requests").remove();

        $.get("/getResourcesPerFarm", {farm_id : 1, type : $(this).text()}, function(result){
            var i = 0;
            for(i = 0; i < result.items.length; i++){
                $("#resources_table").append('<tr class="clickable resources"><td>' + result.items[i].item_name +'</td><td>' +  result.items[i].item_type  +'</td><td>' + result.items[i].current_amount +'</td><td>sacks</td><td>PHP 500.00</td><td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');
            }
            for(i = 0; i < result.blanks.length; i++)
                $("#resources_table").append('<tr class="clickable resources"><td></td><td></td><td></td><td>sacks</td><td>PHP 500.00</td><td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');

        });
    });

    $(".materials_tab").on('click', function(){
        $(".materials_tab.active").css("background", "");
        $(".materials_tab.active").removeClass("active");
        $(this).addClass("active");
        $(this).css("background", "#F0F0F0");

        var cur_id = $(this).attr("id");
        var url;
        if(cur_id == "all_farms"){
            $("#per_farm_materials").prop("hidden", !this.checked);
            $("#all_farm_materials").removeAttr("hidden");
            url = "/ajaxGetInventory/all_farms";
        }
        else if (cur_id == "per_farm"){
            $("#all_farm_materials").prop("hidden", !this.checked);
            $("#per_farm_materials").removeAttr("hidden");
            url = "/ajaxGetInventory/per_farm";
        }
        // $.get(url, {}, function(result){
            
        //     if(cur_id == "all_farms"){
        //     }
        //     else if (cur_id == "per_farm"){
        //         alert(result.farms[0].farm_name);
        //         var i;
        //         for(i = 0; i < result.farms.length; i++){
        //             $("#per_farm_materials").append('<div class="row farm_inventory aos-init" data-aos="flip-up" data-aos-duration="450" style="margin: 1rem 1rem; "><div class="col-xl-3" style="padding: 2rem;"><div class="" ><div class=""><h4 class="card-title">'+ result.farms[i].farm_name +'</h4><p class="">Farm Description </p></div></div></div><div class="col" style="padding: 1rem;"><div class="table-responsive" style="height: 200px;"><table class="table" style="width : 100%"><thead style=""><tr><th>Name</th><th>Material Type</th><th>Stock Level</th><th>Units</th></tr></thead><tbody style="overflow: auto"><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td><td>Cell 3</td></tr><tr><td>Cell 3</td><td>Cell 4</td><td>Cell 3</td><td>Cell 3</td></tr><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td><td>Cell 3</td></tr><tr><td>Cell 3</td><td>Cell 4</td><td>Cell 3</td><td>Cell 3</td></tr><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td><td>Cell 3</td></tr><tr><td>Cell 3</td><td>Cell 4</td><td>Cell 3</td><td>Cell 3</td></tr></tbody></table></div></div></div></div>');
        //         }
        //     }
        //     // var i = 0;
        //     // for(i = 0; i < result.items.length; i++){
        //     //     $("#resources_table").append('<tr class="clickable resources"><td>' + result.items[i].item_name +'</td><td>' +  result.items[i].item_type  +'</td><td>' + result.items[i].current_amount +'</td><td>sacks</td><td>PHP 500.00</td><td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');
        //     // }
        //     // for(i = 0; i < result.blanks.length; i++)
        //     //     $("#resources_table").append('<tr class="clickable resources"><td></td><td></td><td></td><td>sacks</td><td>PHP 500.00</td><td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');

        // });
    });

    $(".purchases_tab").on('click', function(){
        $(".purchases_tab.active").css("background", "");
        $(".purchases_tab.active").removeClass("active");
        $(this).addClass("active");
        $(this).css("background", "#F0F0F0");

        var cur_id = $(this).attr("id");
        var url;
        if(cur_id == "all_farms"){
            $("#per_farm_materials").prop("hidden", !this.checked);
            $("#all_farm_materials").removeAttr("hidden");
            url = "/ajaxGetPurchases/all_farms";
        }
        else if (cur_id == "per_farm"){
            $("#all_farm_materials").prop("hidden", !this.checked);
            $("#per_farm_materials").removeAttr("hidden");
            url = "/ajaxGetPurchasesy/per_farm";
        }
        // $.get(url, {}, function(result){
            
        //     if(cur_id == "all_farms"){
        //     }
        //     else if (cur_id == "per_farm"){
        //         alert(result.farms[0].farm_name);
        //         var i;
        //         for(i = 0; i < result.farms.length; i++){
        //             $("#per_farm_materials").append('<div class="row farm_inventory aos-init" data-aos="flip-up" data-aos-duration="450" style="margin: 1rem 1rem; "><div class="col-xl-3" style="padding: 2rem;"><div class="" ><div class=""><h4 class="card-title">'+ result.farms[i].farm_name +'</h4><p class="">Farm Description </p></div></div></div><div class="col" style="padding: 1rem;"><div class="table-responsive" style="height: 200px;"><table class="table" style="width : 100%"><thead style=""><tr><th>Name</th><th>Material Type</th><th>Stock Level</th><th>Units</th></tr></thead><tbody style="overflow: auto"><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td><td>Cell 3</td></tr><tr><td>Cell 3</td><td>Cell 4</td><td>Cell 3</td><td>Cell 3</td></tr><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td><td>Cell 3</td></tr><tr><td>Cell 3</td><td>Cell 4</td><td>Cell 3</td><td>Cell 3</td></tr><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td><td>Cell 3</td></tr><tr><td>Cell 3</td><td>Cell 4</td><td>Cell 3</td><td>Cell 3</td></tr></tbody></table></div></div></div></div>');
        //         }
        //     }
        //     // var i = 0;
        //     // for(i = 0; i < result.items.length; i++){
        //     //     $("#resources_table").append('<tr class="clickable resources"><td>' + result.items[i].item_name +'</td><td>' +  result.items[i].item_type  +'</td><td>' + result.items[i].current_amount +'</td><td>sacks</td><td>PHP 500.00</td><td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');
        //     // }
        //     // for(i = 0; i < result.blanks.length; i++)
        //     //     $("#resources_table").append('<tr class="clickable resources"><td></td><td></td><td></td><td>sacks</td><td>PHP 500.00</td><td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');

        // });
    });

    $("input").on("keyup", function(){
        $(this).css("border-color", "#d1d3e2");
    });
    $("textarea").on("keyup", function(){
        $("#item_name").css("border-color", "#d1d3e2");
    });
    $(".add-material-btn").on("click", function(){
        var cur_id = $(this).attr("id");
        if(cur_id == "step1"){
            //check if complete
            var complete = true;
            if($("#item_name").val().length == 0){
                $("#item_name").css("border-color", "red");
                complete = false;
            }
            if($("#item_desc").val().length == 0){
                $("#item_desc").css("border-color", "red");
                complete = false;
            }
            if(complete){
                // $("#step1_add").prop("hidden", !this.checked);
                $("#step1_add").toggle("hide");
                // $("#step2_add").removeAttr("hidden");
                $("#step2_add").toggle("show");
                $("#step1_status").addClass("finish");
                $("#step2_status").addClass("active");

                $("#review_name").text($("#item_name").val());
                $("#review_type").text($("#item_type").val());
                $("#review_desc").text($("#item_desc").val());
            }
            else{
                alert("Please complete details.");
            }
            
        }
        else if(cur_id == "back"){
            // $("#step1_add").prop("hidden", !this.checked);
            $("#step2_add").toggle("hide");
            // $("#step2_add").removeAttr("hidden");
            $("#step1_add").toggle("show");
            $("#step1_status").removeClass("finish");
            $("#step1_status").addClass("active");
            $("#step2_status").removeClass("active");
        }
    });

    
});