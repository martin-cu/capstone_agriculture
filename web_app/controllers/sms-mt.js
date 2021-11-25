const js = require('../public/js/session.js');

var request = require("request");

var shortcode = '5119';
var access_token = 'A-2szoYus7mB13l5axDrr_1234AApSz8eu236GRNsoBQ';
var address = '9173028128';
var clientCorrelator = '264801';
var message = 'NodeJS SMS Test';

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

exports.test_globe = function(req,res){
    request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
  res.render("globe_test_api",{test_data : "SELECT"});
  }

exports.test_globe2 = function(req,res){
  console.log(req);
  request("https://developer.globelabs.com.ph/oauth/access_token?app_id=X4kxHEG59nuXkT8ynri5KGuyR4xzHLbr&app_secret=280f39f528dc56db22e5f31a4a87dad0969d5cce23f659e3e3e888a2371fe585&code=21585119", function(err, response){
    console.log(response);
  });
}

//SMS Pages
exports.getSubscriptions = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'sms_subscriptions');
	res.render('sms_subscriptions', html_data);
}

exports.getAddSubscription = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'sms_add_subscription');
	res.render('add_subscription', html_data);
}

exports.getMessages = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'sms_messages');
	res.render('sms_messages', html_data);
}


