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
});