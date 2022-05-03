$(document).ready(function(){
    $(".notification").on('click', function(){
        // alert($(this).attr("id"));
        //Sets Notif status to 0
        $.get("/updateNotif", {notification_id : $(this).attr("id")}, function(result){});
    });
});
