$(document).ready(function(){

    $.get("/employeeDetails", {employee_id : $(".active_chat").attr("id")}, function(result){
        $("#texter_name").text(result.first_name + " " + result.last_name);
    });
    $("#msgHistory").empty();
    // alert($(".active_chat").attr("id"));
    $.get("/userConvos", {employee_id : $(".active_chat").attr("id")}, function(result){
        for(var i = 0 ; i < result.length; i++){
            //ADD TO #msgHistory
            if(result[i].origin == "inbound"){
                //append
                $("#msgHistory").append(' <div class="incoming_msg"> <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div> <div class="received_msg"> <div class="received_withd_msg"> <p>' + result[i].message +'</p> <span class="time_date">' + result[i].time + ' | ' + result[i].date + '</span></div> </div> </div>');
            }
            else if(result[i].origin == "outbound"){
                $("#msgHistory").append(' <div class="outgoing_msg"> <div class="sent_msg"> <p>' + result[i].message +'</p> <span class="time_date">' + result[i].time + ' | ' + result[i].date + '</span> </div> </div> ');
            }
        }

    });
    //Scroll to botom
    $("#msgHistory").animate({scrollTop: $("#msgHistory").prop("scrollHeight")}, 1000)

    $(".chat_list").on("click", function(){
        changeConversation();
    });



    $(".notification").on('click', function(){
        // alert($(this).attr("id"));
        //Sets Notif status to 0
        $.get("/updateNotif", {notification_id : $(this).attr("id")}, function(result){});
    });

    
});


function changeConversation(){
    $.get("/employeeDetails", {employee_id : $(".active_chat").attr("id")}, function(result){
        $("#texter_name").text(result.first_name + " " + result.last_name);
    });
    $("#msgHistory").empty();
    // alert($(".active_chat").attr("id"));
    $.get("/userConvos", {employee_id : $(".active_chat").attr("id")}, function(result){
        for(var i = 0 ; i < result.length; i++){
            //ADD TO #msgHistory
            if(result[i].origin == "inbound"){
                //append
                $("#msgHistory").append(' <div class="incoming_msg"> <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div> <div class="received_msg"> <div class="received_withd_msg"> <p>' + result[i].message +'</p> <span class="time_date">' + result[i].time + ' | ' + result[i].date + '</span></div> </div> </div>');
            }
            else if(result[i].origin == "outbound"){
                $("#msgHistory").append(' <div class="outgoing_msg"> <div class="sent_msg"> <p>' + result[i].message +'</p> <span class="time_date">' + result[i].time + ' | ' + result[i].date + '</span> </div> </div> ');
            }
        }

    });
    //Scroll to botom
    $("#msgHistory").scrollTop($("#msgHistory").prop("scrollHeight"));
}