const js = require('../public/js/session.js');
const smsModel = require('../models/smsModel.js');
const employeeModel = require('../models/employeeModel.js');
const farmModel = require('../models/farmModel.js');
var request = require("request");
const { text } = require('express');
const dataformatter = require('../public/js/dataformatter.js');
const { formatDate } = require('../public/js/dataformatter.js');

//API Key for WEATHER API
var key = '2ae628c919fc214a28144f699e998c0f'; // Paid API Key

var app_id = 'X4kxHEG59nuXkT8ynri5KGuyR4xzHLbr'; //final OLD
var app_secret = '280f39f528dc56db22e5f31a4a87dad0969d5cce23f659e3e3e888a2371fe585'; //final OLD
//var shortcode = '21585119'; //OLD
var shortcode = "21663543"; //NEW




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
    console.log(req.body);

    //CHECK IF UNSUBSCRIBE
    if("unsubscribed" in req.body){
        smsModel.removeAccessToken(req.body.unsubscribed.subscriber_number, req.body.unsubscribed.access_token, function(err, result){
        });
        
        smsModel.getEmployeeDetails({ key: "phone_number" , value : req.body.unsubscribed.subscriber_number}, function(err, employee_details){
            if(err)
                console.log(err);
            else{
                smsModel.insertOutboundMsg("YOU HAVE UNSUBSCRIBED", employee_details[0].employee_id, function(err, last_id){
                    if(err)
                        throw err;
                    else{
                        console.log("SUCCESSFULLY INSERTED OUTBOUND MSG");
                    }
                });
            }
        });
    }
    else{
        // console.log(req.body.inboundSMSMessage);

        //get employee details using phone number
        //SLICE 7 to remove 'tel:+63'
        smsModel.getEmployeeDetails({ key: "phone_number" , value : req.body.inboundSMSMessageList.inboundSMSMessage[0].senderAddress.slice(7)}, function(err, employee_details){
            if(err)
                console.log(err);
            else{
                
                if(employee_details.length > 0){
                    var message = req.body.inboundSMSMessageList.inboundSMSMessage[0].message;
                    var message_id = req.body.inboundSMSMessageList.inboundSMSMessage[0].messageId;
                    var employee_id = employee_details[0].employee_id;

                    //Store message to db
                    smsModel.insertInboundMsg(message, message_id, employee_id, function(err, success){
                        
                    });

                    //POCESS MESSAGE
                    var text_message = req.body.inboundSMSMessageList.inboundSMSMessage[0].message.slice(" ");
                    var msg;
                    switch (text_message[0]){
                        case "1" : msg = getWeatherForecastMsg(employee_id); break; //Weather Forecast
                        case "2" : msg = "INCOMING WORK ORDERS"; break; //SEND "HELP"
                        case "3" : msg = "PEST/DISEASE SYMPTOMS"; break; //INCOMING WORK ORDERS
                        default : msg = "Below are the list of actions that can be performed.\n1 - Weather Forecast\n2 - Incoming work orders\n3 - Report Pest/Disease Symptoms\nTo complete action, send <number of desired action> to 21663543";
                    }

                    sendOutboundMsg(employee_details[0], msg);
                }
            }
        });
    }
    console.log("--------------------");

    // this.globe_outbound_msg;
    // this.getAccessToken;
    return true;
}



//RUNS WHEN USER REGISTERS THROUGH SMS
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
          
            //SEND WELCOME MESSAGE TO USER
            //create outbound message
            smsModel.getEmployeeDetails({ key : "access_token", value : req.query.access_token}, function(err, employee){
                if(err){
                  throw err;
                }
                else{
                    console.log(employee);
                    if(employee.length > 0){
                        var emp = employee[0];
                        var msg = "Welcome to LA Rice CMS, " + emp.first_name + " " + emp.last_name + "!";
                        console.log(msg);
                        sendOutboundMsg(emp, msg);
                        // smsModel.insertOutboundMsg(msg, emp.employee_id, function(err, last_id){
                        //     if(err)
                        //         throw err;
                        //     else{
                        //         var last = last_id.insertId;
                        //         console.log(last_id.insertId);
                        //         console.log(last);
                        //         var message = { method: 'POST',
                        //                         url: 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/' + shortcode + '/requests',
                        //                         qs: { 'access_token': emp.access_token },
                        //                         headers: 
                        //                         { 'Content-Type': 'application/json' },
                        //                         body: 
                        //                         { 'outboundSMSMessageRequest': 
                        //                             { 'clientCorrelator': last,
                        //                             'senderAddress': shortcode,
                        //                             'outboundSMSTextMessage': { 'message': msg },
                        //                             'address': emp.phone_number } },
                        //                         json: true };
                        //         sendOutboundMsg(message);
                        //     }
                        // });
                    }
                }
            });
        }
    });
    return true;
}


//SEND MESSAGE TO USER FROM APP
exports.globe_outbound_msg = function(req, res){
    console.log("sending outbound message");
    console.log(req.query);
    var employee_id = req.query.employee_id;
    var message = req.query.message;
    //GET EMPLOYEE DETAILS
    smsModel.getEmployeeDetails({key : "employee_id", value : employee_id}, function(err, employee_details){
        if(err)
            throw err;
        else{
            if(employee_details.length > 0){
                var emp = employee_details[0];

                if(emp.access_token == null){
                    res.send("No access token");
                }
                else{
                    sendOutboundMsg(emp, message);
                    res.send("message sent");
                }
            }
        }
    });
}


function sendOutboundMsg(emp, message){
    smsModel.insertOutboundMsg(message, emp.employee_id, function(err, last_id){
        if(err)
            throw err;
        else{
            console.log("SUCCESSFULLY INSERTED OUTBOUND MSG");
            var last = last_id.insertId;
            var send_message = { method: 'POST',
                            url: 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/' + shortcode + '/requests',
                            qs: { 'access_token': emp.access_token },
                            headers: 
                            { 'Content-Type': 'application/json' },
                            body: 
                            { 'outboundSMSMessageRequest': 
                                { 'clientCorrelator': last,
                                'senderAddress': shortcode,
                                'outboundSMSTextMessage': { 'message': message },
                                'address': emp.phone_number } },
                            json: true };
            request(send_message, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(body);
                });
        }
    });
}


function getWeatherForecastMsg(employee_id){
    
    //Get assigned farm
    employeeModel.queryEmployee({employee_id: employee_id}, function(err, emp){ //change 24 to employee_id
        if(err)
            throw err;
        else{
            // console.log(emp);
            var farm_name = emp[0].farm_name;
            //get farm plots
            var url = 'http://api.agromonitoring.com/agro/1.0/polygons?appid='+key;
            request(url, {json : true}, function(err, polygon_list){
                if (err)
                    throw err;
                else{
                    var lat;
                    var lon;
                    // console.log(farm_name);
                    // console.log(polygon_list.body);
                    for(var i = 0 ; i < polygon_list.body.length; i++){
                        // console.log(polygon_list.body[i]);
                        if(polygon_list.body[i].name == farm_name){
                            // console.log(polygon_list.body[i]);
                            lat = polygon_list.body[i].center[1];
						    lon = polygon_list.body[i].center[0];
                            break;
                        }
                    }
                    //get weather for farm
                    var forecast_url = 'https://api.agromonitoring.com/agro/1.0/weather/forecast?lat='+lat+'&lon='+lon+'&appid='+key;
                    request(forecast_url, { json: true }, function(err, response, forecast_body){
                        if(err)
                            throw err;
                        else{
                            console.log(forecast_body);
                            forecast_body.dt = dataformatter.unixtoDate(forecast_body.dt);
                            var hour_arr = [];
                            for (var i = 0; i < forecast_body.length; i++) {
                                forecast_body[i].dt = dataformatter.unixtoDate((forecast_body[i].dt));
                                forecast_body[i]["date"] = dataformatter.formatDate(forecast_body[i].dt, 'mm DD, YYYY');
                                hour_arr.push(dataformatter.formatDate(forecast_body[i].dt, 'HH:m'))
                            }

                            var dates = [];
                            for(var i = 0; i < forecast_body.length; i++) {
                                if(dates.includes(forecast_body[i].date)){
                                    //dont add
                                }
                                else{
                                    dates.push(forecast_body[i].date);
                                }
                            }

                            var daily_weather = [];
                            for(var i = 0; i < dates.length; i++){
                                var temp = 0;
                                var ctr = 0;
                                var weather;
                                for(var x = 0; x < forecast_body.length; x++){
                                    if(forecast_body[x].date == dates[i]){
                                        weather = forecast_body[x].weather[0].description;
                                        temp =+ forecast_body[x].main.temp;
                                        ctr++;
                                    }
                                }
                                daily_weather.push({date : dates[i], weather : weather, temp : temp - 273.15});
                            }
                            console.log(daily_weather);
                            //***** Get unique hour timestamps from forecast and filter data
                            hour_arr = [...new Map(hour_arr.map(item => [item, item])).values()];

                            //SET MESSAGE LAYOUT
                            var message = "WEATHER FORECAST\nFarm: " + farm_name;
                            for(var i = 0 ; i < daily_weather.length; i++){
                                message = message + "\n\nDate: " + daily_weather[i].date + "\nWeather: " + daily_weather[i].weather + "\nTemp: " + daily_weather[i].temp.toFixed(2) + " C";
                            }
                            console.log(message);
                            return message;
                        }
                    });
                }
            })
        }
    });

}


exports.getWeatherForecast = function(employee_id){
    
    //Get assigned farm
    employeeModel.queryEmployee({employee_id: 24}, function(err, emp){ //change 24 to employee_id
        if(err)
            throw err;
        else{
            // console.log(emp);
            var farm_name = emp[0].farm_name;
            //get farm plots
            var url = 'http://api.agromonitoring.com/agro/1.0/polygons?appid='+key;
            request(url, {json : true}, function(err, polygon_list){
                if (err)
                    throw err;
                else{
                    var lat;
                    var lon;
                    // console.log(farm_name);
                    // console.log(polygon_list.body);
                    for(var i = 0 ; i < polygon_list.body.length; i++){
                        // console.log(polygon_list.body[i]);
                        if(polygon_list.body[i].name == farm_name){
                            // console.log(polygon_list.body[i]);
                            lat = polygon_list.body[i].center[1];
						    lon = polygon_list.body[i].center[0];
                            break;
                        }
                    }
                    //get weather for farm
                    var forecast_url = 'https://api.agromonitoring.com/agro/1.0/weather/forecast?lat='+lat+'&lon='+lon+'&appid='+key;
                    request(forecast_url, { json: true }, function(err, response, forecast_body){
                        if(err)
                            throw err;
                        else{
                            console.log(forecast_body);
                            forecast_body.dt = dataformatter.unixtoDate(forecast_body.dt);
                            var hour_arr = [];
                            for (var i = 0; i < forecast_body.length; i++) {
                                forecast_body[i].dt = dataformatter.unixtoDate((forecast_body[i].dt));
                                forecast_body[i]["date"] = dataformatter.formatDate(forecast_body[i].dt, 'mm DD, YYYY');
                                hour_arr.push(dataformatter.formatDate(forecast_body[i].dt, 'HH:m'))
                            }

                            var dates = [];
                            for(var i = 0; i < forecast_body.length; i++) {
                                if(dates.includes(forecast_body[i].date)){
                                    //dont add
                                }
                                else{
                                    dates.push(forecast_body[i].date);
                                }
                            }

                            var daily_weather = [];
                            for(var i = 0; i < dates.length; i++){
                                var temp = 0;
                                var ctr = 0;
                                var weather;
                                for(var x = 0; x < forecast_body.length; x++){
                                    if(forecast_body[x].date == dates[i]){
                                        weather = forecast_body[x].weather[0].description;
                                        temp =+ forecast_body[x].main.temp;
                                        ctr++;
                                    }
                                }
                                daily_weather.push({date : dates[i], weather : weather, temp : temp - 273.15});
                            }
                            console.log(daily_weather);
                            //***** Get unique hour timestamps from forecast and filter data
                            hour_arr = [...new Map(hour_arr.map(item => [item, item])).values()];

                            //SET MESSAGE LAYOUT
                            var message = "WEATHER FORECAST\nFarm: " + farm_name;
                            for(var i = 0 ; i < daily_weather.length; i++){
                                message = message + "\n\nDate: " + daily_weather[i].date + "\nWeather: " + daily_weather[i].weather + "\nTemp: " + daily_weather[i].temp.toFixed(2) + " C";
                            }
                            console.log(message);
                            return message;
                        }
                    });
                }
            })
        }
    });
}















//SMS Pages
exports.getSubscriptions = function(req, res) {
	var html_data = {};
    html_data["title"] = "SMS Management > Subscriptions";
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'sms_subscriptions', req.session);
    html_data["notifs"] = req.notifs;

    smsModel.getSubscriptionsList(function(err, list){
        if(err)
            throw err;
        else{
            html_data["list"] = list;
        }
        res.render('sms_subscriptions', html_data);
    });

	
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

    //Gets list of users registered to SMS feature
    smsModel.getSubscriptions(function(err, subscriptions){
        if(err)
            throw err;
        else{
            subscriptions[0].first = true;
            for(var i = 0; i < subscriptions.length; i++){
                subscriptions[i].last_message = dataformatter.formatDate(new Date(subscriptions[i].last_message), 'mm DD, YYYY');
            }
            html_data["subscriptions"] = subscriptions;

            
        }
        res.render('sms_messages', html_data);
    });
}

exports.getUserConversation = function(req,res){
    if(req.query.employee_id != null)
        smsModel.getUserConverstation(req.query.employee_id, function(err, messages){
            if(err)
                throw err;
            else{
                for(var i = 0; i < messages.length; i++){
                    messages[i].date = dataformatter.formatDate(new Date(messages[i].date), 'mm DD, YYYY');
                }
                // console.log(messages);
                res.send(messages);
            }
        }); 
     else
        res.send(true);
}


