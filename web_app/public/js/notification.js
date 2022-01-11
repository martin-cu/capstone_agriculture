$(document).ready(function(){
    $(".notification").on('click', function(){
        // alert($(this).attr("id"));
        $.get("/updateNotif", {notification_id : $(this).attr("id")}, function(result){});
    });
});
