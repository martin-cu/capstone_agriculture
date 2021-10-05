function addSeed(){
}

$(document).ready(function(){
    
    $("#pesticide").on("click", function(){
        $.get("/addPesticide", {}, function(result){
            alert(result.msg);
        });
    });

    $("#updatepesticide").on("click", function(){
        $.get("/updatePesticide", {type : "seed"}, function(result){
            alert(result.msg);
        });
    });

    $("#purchase").on("click", function(){
        $.get("/addPurchase", {}, function(result){
            alert(result.msg);
        });
    });

    $("#getpurchase").on("click", function(){
        alert("wef");
        $.get("/getPurchases", {}, function(result){
            alert(result.msg);
        });
    });

    $("#updatepurchase").on("click", function(){
        var data = {
            status : "Purchased",
            type : "Seed",
            item_id : 1,
            amount : -45
        }
        $.get("/updatePurchase", data, function(result){
            alert(result.msg);
        });
    });



    $("#weather").on("click", function(){
        $.get("/getWeather", {}, function(result){
            alert(result.msg);
        });
    });
});