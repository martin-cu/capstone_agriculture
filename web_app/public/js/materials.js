function clearList(){
    
}

$(document).ready(function(){
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


    $(".resources").on('click', function(){
        $(".resources.active").css("background", "");
        $(".resources.active").removeClass("active");
        $(this).addClass("active");
        $(this).css("background", "#F0F0F0");

        $("tr.resources").remove();

        //update table
        $.get("/getResourcesPerFarm", {farm_id : 1, type : $(this).text()}, function(result){
            var i = 0;
            for(i = 0; i < result.items.length; i++){
                $("#resources_table").append('<tr class="resources"><td>' + result.items[i].item_name +'</td><td>' +  result.items[i].item_type  +'</td><td>' + result.items[i].current_amount +'</td><td>sacks</td><td>PHP 500.00</td><td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');
            }
            for(i = 0; i < result.blanks.length; i++)
                $("#resources_table").append('<tr class="resources"><td></td><td></td><td></td><td>sacks</td><td>PHP 500.00</td><td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');

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
                $("#resources_table").append('<tr class="resources"><td>' + result.items[i].item_name +'</td><td>' +  result.items[i].item_type  +'</td><td>' + result.items[i].current_amount +'</td><td>sacks</td><td>PHP 500.00</td><td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');
            }
            for(i = 0; i < result.blanks.length; i++)
                $("#resources_table").append('<tr class="resources"><td></td><td></td><td></td><td>sacks</td><td>PHP 500.00</td><td><i class="fa fa-ellipsis-h d-inline float-end" style="text-align: right;"></i></td></tr>');

        });
    });
});