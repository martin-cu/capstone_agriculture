function globe(){
    alert("oks");

    $.post("/globe_api2", {}, function(result){
    });
}

$(document).ready(function(){
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

    $("#getPesticide").on("click", function(){
        $.get("/getMaterials", {}, function(result){
            alert(result.msg);
        });
    });

    $("#getPurchase").on("click", function(){
        alert("wef");
        $.get("/getPurchases", {}, function(result){
            alert(result.msg);
        });
    });

    $("#updateMaterial").on("click", function(){
        $.get("/updateMaterial", {type : "Pesticide"}, function(result){
            alert(result.msg);
        });
    });

    $("#addPurchase").on("click", function(){
        $.get("/addPurchase", {}, function(result){
            alert(result.msg);
        });
    });

    

    $("#updatePurchase").on("click", function(){
        var data = {
            farm_mat_id : 2,
            status : "Purchased",
            type : "Seed",
            item_id : 1,
            amount : -45
        }
        $.get("/updatePurchase", data, function(result){
            alert(result.msg);
        });
    });

    $("#newFarmItem").on("click", function(){
        var data = {
            item_type : "Fertilizer",
            item_id : 3,
            farm_id : 2,
            current_amount : 100,
            isActive : 1
        }
        $.get("/addFarmMaterial", data, function(result){
            alert(result.msg);
        });
    });

    $("#weather").on("click", function(){
        $.get("/getWeather", {}, function(result){
            alert(result.msg);
        });
    });
});