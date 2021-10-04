function addSeed(){
    $.get("/addSeed", {}, function(result){
        alert(result.msg);
    });
}

$(document).ready(function(){
    
    $("#pesticide").on("click", function(){
        $.get("/addPesticide", {}, function(result){
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
        $.get("/updatePurchase", {}, function(result){
            alert(result.msg);
        });
    });

});