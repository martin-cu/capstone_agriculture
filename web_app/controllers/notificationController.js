const notifModel = require('../models/notificationModel.js');
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

exports.getNotification = function(req, res, next){
    notifModel.getNotifs(function(err, notifs){
        if(err)
            throw err;
        else{
            console.log(notifs);
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