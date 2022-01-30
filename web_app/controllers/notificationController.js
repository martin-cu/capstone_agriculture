const notifModel = require('../models/notificationModel.js');
const workOrderModel = require('../models/workOrderModel.js');
const dataformatter = require('../public/js/dataformatter.js');
const js = require('../public/js/session.js');
var request = require('request');


exports.getNotification = function(req, res, next) {
    var html_data = {};

    var wo_list_query = {
        where: {
            key: ['work_order_table.status', 'work_order_table.status', ''],
            value: ['Pending', 'In-Progress', 'date_due < date_add(now(), interval 7 day)']
        },
        order: ['work_order_table.status ASC', 'work_order_table.date_due DESC']
    };
    workOrderModel.getWorkOrders(wo_list_query, function(err, wo_list) {
        if (err)
            throw err;
        else {
            var notif_obj_arr = [];
            var title, desc, url, icon, color;
            for (var i = 0; i < wo_list.length; i++) {
                switch (wo_list[i].notif_type) {
                    case 'Overdue':
                    title = `"Overdue work order: ${wo_list[i].work_order_id}"`;
                    desc = `"Overdue ${wo_list[i].type} for ${wo_list[i].farm_name} with WO ${wo_list[i].work_order_id}"`;
                    color = `"danger"`;
                    break;
                    case 'Due soon':
                    title = `"Incoming work order: ${wo_list[i].work_order_id} due soon"`;
                    desc = `"${wo_list[i].type} for ${wo_list[i].farm_name} with WO ${wo_list[i].work_order_id} due soon"`;
                    color = `"warning"`;
                    break;
                    case 'Due in a week':
                    title = `"Incoming work order: ${wo_list[i].work_order_id} due in a week"`;
                    desc = `"${wo_list[i].type} for ${wo_list[i].farm_name} with WO ${wo_list[i].work_order_id} due in a week"`;
                    color = `"warning"`;
                    break;
                }

                notif_obj_arr.push({
                    date: '"'+dataformatter.formatDate(new Date(), 'YYYY-MM-DD')+'"',
                    notification_title: title,
                    notification_desc: desc,
                    farm_id: wo_list[i].farm_id,
                    url: `"/farms/work_order&id=${wo_list[i].work_order_id}"`,
                    icon: '"exclamation-triangle"',
                    color: color,
                    status: 1
                });
            }
            notifModel.getAllNotifs(function(err, notif_list) {
                if (err)
                    throw err;
                else {
                    var notif_query = [];
                    var list_index;
                    for (var i = 0; i < notif_obj_arr.length; i++) {
                        list_index = notif_list.filter(e => '"'+e.notification_title+'"' == notif_obj_arr[i].notification_title && 
                            '"'+e.notification_desc+'"' == notif_obj_arr[i].notification_desc);
                        if (list_index.length == 0) {
                            notif_query.push(notif_obj_arr[i]);
                        }
                    }

                    if (notif_query.length != 0) {
                        notifModel.createNotif(notif_query, function(err, create_status) {
                            if (err)
                                throw err;
                        });
                    }
                    notif_list = notif_list.slice(0, 10);

                    for (var i = 0; i < notif_list.length; i++) {
                        notif_list[i].date = dataformatter.formatDate(new Date(notif_list[i].date), 'mm DD, YYYY');
                    }

                    req.notifs = notif_list;

                    return next();
                }
            });
                    
        }
    });
}

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

exports.createNotif = function(req,res) {
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
// exports.getNotification = function(req, res, next){
//     console.log("test");
//     notifModel.getNotifs(function(err, prenotifs){
//         if(err)
//             throw err;
//         else{
//             workOrderModel.getDueWorkorders(function(err, due){
//                 if(err)
//                     throw err;
//                 else{
//                     //loop through
//                     var i,x;
//                     console.log("due");
//                     console.log(due.length);

//                     for(i = 0; i < due.length; i++){
//                         var create = true;
//                         for(x = 0; x < prenotifs.length; x++){
//                             var id = prenotifs[x].notification_title.split('-');
//                             console.log(due[i].work_order_id + "-" + id[1]);
//                             if(due[i].work_order_id == id[1]){
//                                 console.log("Do not create notif");
//                                 create = false;
//                             }
//                         }
//                         if(create){
//                             var notif = {
//                                 date : new Date(),
//                                 farm_id : due[i].farm_id,
//                                 notification_title : "Work Order due today: WO-"+due[i].work_order_id,
//                                 url : "/farms/work_order&id=" + due[i].work_order_id,
//                                 icon : "exclamation-triangle",
//                                 color : "warning"
//                             };
//                             notifModel.createNotif(notif, function(err, success){
//                             });
//                         }
//                     }

//                     workOrderModel.getOverdueWorkorders(function(err, overdue){
//                         if(err)
//                             throw err;
//                         else{
//                             //loop through
//                             var i,x;
//                             for(i = 0; i < overdue.length; i++){
//                                 var create = true;
//                                 for(x = 0; x < prenotifs.length; x++){
//                                     var id = prenotifs[x].notification_title.split('-');
//                                     if(overdue[i].work_order_id == id[1]){
//                                         console.log("Do not create notif OVERDUE");
//                                         create = false;
//                                     }
//                                 }
//                                 if(create){
//                                     var notif = {
//                                         date : new Date(),
//                                         farm_id : overdue[i].farm_id,
//                                         notification_title : "Work Order Overdue: WO-"+overdue[i].work_order_id,
//                                         url : "/farms/work_order&id=" + overdue[i].work_order_id,
//                                         icon : "exclamation-triangle",
//                                         color : "danger"
//                                     };
//                                     notifModel.createNotif(notif, function(err, success){
//                                     });
//                                 }
//                             }
//                         }
//                     });
//                 }
//             });
//         }
//     });
    
    
//     notifModel.getNotifs(function(err, notifs){
//         if(err)
//             throw err;
//         else{
//             // console.log(notifs);


//             for(i = 0; i < notifs.length; i++){
// 				notifs[i].date = dataformatter.formatDate(new Date(notifs[i].date), 'mm DD, YYYY');
// 			}

//             req.notifs = notifs;
//             // res.send
//             return next();
//         }
       
//     });
    
// }

exports.updateNotif = function(req,res){
    var id = req.query.notification_id;
    console.log(id);
    notifModel.updateNotif(id, function(err, success){});
    res.send("ok");
};

