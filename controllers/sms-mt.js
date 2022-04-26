const js = require('../public/js/session.js');
const smsModel = require('../models/smsModel.js');
var request = require("request");


var app_id = 'X4kxHEG59nuXkT8ynri5KGuyR4xzHLbr'; //final
var app_secret = '280f39f528dc56db22e5f31a4a87dad0969d5cce23f659e3e3e888a2371fe585'; //final
var shortcode = '21585119'; //final




var code = 'osg68ErhoXxaACygn5yS7yAqRfB6E49S7qE75Id6z4puxBayXhpGMdzFzxeb6FKded8uayLbE8kxroI4zEB8taBrxeseAbLdsebpBLf4Rgp9Udkz6gFrnLdjC7oe9xu6begLFEyMj7FnRapRhjazkAuxaEyEIAoEdLSL6ALMfaqnE5SqjxXnCdX8johkpeBRs';






var access_token = 'PGgaVczHMKbJ6jbccFXiuZE57d6zSW3AiwS7S3ChCrg'; //sample only
var address = '9173028128';
var clientCorrelator = '264801';
var message = 'THIS IS A REPLY TO YOU';

var options = { method: 'POST',
  url: 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/' + shortcode + '/requests',
  qs: { 'access_token': access_token },
  headers: 
   { 'Content-Type': 'application/json' },
  body: 
   { 'outboundSMSMessageRequest': 
      { 'clientCorrelator': clientCorrelator,
        'senderAddress': shortcode,
        'outboundSMSTextMessage': { 'message': message },
        'address': address } },
  json: true };

exports.redirectPOSTurl = function(req, res){
  
}




//RECEIVE SMS FROM USERS
exports.globe_inbound_msg = function(req, res){

  //CHECK IF UNSUBSCRIBE
  console.log("--------------------");

  console.log(req.body);

  console.log("~~~~~~~~~~~~PROCESS DATA~~~~~~~~~~~~");



  console.log("~~~~~~~~~~~~STORE DATA~~~~~~~~~~~~");


  // this.globe_outbound_msg;
  // this.getAccessToken;


  console.log("sending outbound message");
  this.globe_outbound_msg();
  return;
  }


exports.registerUser = function(req,res){

    console.log(req.query);
    
    //PROCESS
    //Search in user tables the same number
    smsModel.addAccessToken(req.query.subscriber_number, req.query.access_token, function(err, result){
        if(err){
          console.log(err);
        }
        else{
          console.log("SUCCESSFULLY UPDATED EMPLOYEE ACCESS TOKEN");
        }
    });


    //SEND WELCOME MESSAGE TO USER
    //create outbound message
    smsModel.getEmployeeDetails(req.query.access_token, function(err, employee){
        if(err){
          throw err;
        }
        else{
            if(employee.length > 0){
                var emp = employee[0];
                var msg = "Welcome to LA Rice CMS, " + emp.first_name + " " + emp.last_name + "!";

                smsModel.insertOutboundMsg(msg, emp.employee_id, function(err, last){
                    if(err)
                        throw err;
                    else{
                        var last = last[0].last;
                        var message = { method: 'POST',
                        url: 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/' + shortcode + '/requests',
                        qs: { 'access_token': emp.access_token },
                        headers: 
                        { 'Content-Type': 'application/json' },
                        body: 
                        { 'outboundSMSMessageRequest': 
                            { 'clientCorrelator': last,
                              'senderAddress': shortcode,
                              'outboundSMSTextMessage': { 'message': msg + " " + last },
                              'address': emp.phone_number } },
                        json: true };
                        this.sendOutboundMsg(message);
                    }
                });
            }
        }
    });

    return {message : "Thank you"};
}


//SEND MESSAGE TO USER
exports.globe_outbound_msg = function(req, res){
    console.log("sending outbound message");
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
  
}


sendOutboundMsg = function(msg){
    request(msg, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
    });
}










//NOT NEEDED
exports.test_globe = function(req,res){
    request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
  res.render("globe_test_api",{test_data : "SELECT"});
  }



exports.test_globe2 = function(req,res){
  console.log(req);
  // request("https://developer.globelabs.com.ph/oauth/access_token?app_id=X4kxHEG59nuXkT8ynri5KGuyR4xzHLbr&app_secret=280f39f528dc56db22e5f31a4a87dad0969d5cce23f659e3e3e888a2371fe585&code=21585119", function(err, response){
  //   console.log(response);
  // });
}











//SMS Pages
exports.getSubscriptions = function(req, res) {
	var html_data = {};
  html_data["title"] = "SMS Management > Subscriptions";
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'sms_subscriptions', req.session);
  html_data["notifs"] = req.notifs;
	res.render('sms_subscriptions', html_data);
}

exports.getAddSubscription = function(req, res) {
	var html_data = {};
  html_data["title"] = "SMS Management > Subscriptions";
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'sms_add_subscription', req.session);
  html_data["notifs"] = req.notifs;
	res.render('add_subscription', html_data);
}

exports.getMessages = function(req, res) {
	var html_data = {};
  html_data["title"] = "SMS Management > Messages";
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'sms_messages', req.session);
  html_data["notifs"] = req.notifs;
	res.render('sms_messages', html_data);
}


