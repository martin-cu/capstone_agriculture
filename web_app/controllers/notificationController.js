const notifModel = require('../models/notificationModel.js');
const workOrderModel = require('../models/workOrderModel.js');
const dataformatter = require('../public/js/dataformatter.js');
const js = require('../public/js/session.js');
var request = require('request');


exports.getNotificationTab = function(req,res){
    var html_data = {};
    notifModel.getAllNotifs(function(err, notifs){
        if(err)
            throw err;
        else{
            var i;
            for(i = 0; i < notifs.length; i++){
                notifs[i].date = dataformatter.formatDate(new Date(notifs[i].date), 'mm DD, YYYY');
                if(notifs[i].status == 0)
                    notifs[i]["done"] = true;
            }
            html_data["notifs"] = notifs;
        }
        res.render("notifications", html_data);
    });
}


exports.createNotif = function(req,res){
    var notif = {
        date : new Date(),
        farm_id : farm_id,
        notification_title : "New pending order",
        url : "/orders/details?id=" + add.insertId,
        icon : "fax",
        color : "primary"
    };
    notifModel.createNotif(notif, function(err, success){
        res.send("ok");
    });
}
exports.getNotification = function(req, res, next){
    console.log("test");
    notifModel.getNotifs(function(err, prenotifs){
        if(err)
            throw err;
        else{
            workOrderModel.getDueWorkorders(function(err, due){
                if(err)
                    throw err;
                else{
                    //loop through
                    var i,x;
                    console.log("due");
                    console.log(due.length);

                    for(i = 0; i < due.length; i++){
                        var create = true;
                        for(x = 0; x < prenotifs.length; x++){
                            var id = prenotifs[x].notification_title.split('-');
                            console.log(due[i].work_order_id + "-" + id[1]);
                            if(due[i].work_order_id == id[1]){
                                console.log("Do not create notif");
                                create = false;
                            }
                        }
                        if(create){
                            var notif = {
                                date : new Date(),
                                farm_id : due[i].farm_id,
                                notification_title : "Work Order due today: WO-"+due[i].work_order_id,
                                url : "/farms/work_order&id=" + due[i].work_order_id,
                                icon : "exclamation-triangle",
                                color : "warning"
                            };
                            notifModel.createNotif(notif, function(err, success){
                            });
                        }
                    }

                    workOrderModel.getOverdueWorkorders(function(err, overdue){
                        if(err)
                            throw err;
                        else{
                            //loop through
                            var i,x;
                            for(i = 0; i < overdue.length; i++){
                                var create = true;
                                for(x = 0; x < prenotifs.length; x++){
                                    var id = prenotifs[x].notification_title.split('-');
                                    if(overdue[i].work_order_id == id[1]){
                                        console.log("Do not create notif OVERDUE");
                                        create = false;
                                    }
                                }
                                if(create){
                                    var notif = {
                                        date : new Date(),
                                        farm_id : overdue[i].farm_id,
                                        notification_title : "Work Order Overdue: WO-"+overdue[i].work_order_id,
                                        url : "/farms/work_order&id=" + overdue[i].work_order_id,
                                        icon : "exclamation-triangle",
                                        color : "danger"
                                    };
                                    notifModel.createNotif(notif, function(err, success){
                                    });
                                }
                            }
                        }
                    });
                }
            });
        }
    });
    
    
    notifModel.getNotifs(function(err, notifs){
        if(err)
            throw err;
        else{
            // console.log(notifs);


            for(i = 0; i < notifs.length; i++){
				notifs[i].date = dataformatter.formatDate(new Date(notifs[i].date), 'mm DD, YYYY');
			}

            req.notifs = notifs;
            // res.send
            return next();
        }
       
    });
    
}

exports.updateNotif = function(req,res){
    var id = req.query.notification_id;
    console.log(id);
    notifModel.updateNotif(id, function(err, success){});
    res.send("ok");
};

