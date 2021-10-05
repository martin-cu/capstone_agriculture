const request = require('request');
const materialModel = require('../models/materialModel');

exports.addMaterials = function(req,res){
    //Check if item already exists

    //if exists, update

    //else add new
    
    res.render("test",{test_data : "SELECT"});
}

exports.getMaterials = function(req,res){ //ajax
    // materialModel.addPesticide(function(err,result){
    // });
    var filter = null;
    var type = "pesticide"
    materialModel.getMaterials(type, filter, function(err, result){
        if (err)
			throw err;
        else{
            for(var i = 0; i < result.length ; i++){
                console.log(result[i]);
            }
        }
    });

    html_data = {msg : "Done."}
    res.send(html_data);
}
 exports.updateMaterial = function(req,res){

    var type = req.query.type;
    console.log(type);
    if(type == "pesticide"){
        var filter = {
            pesticide_id : 1
        };
        var data = {
            pesticide_name : "Pesticide1"
        }
    }
    else if(type == "seed"){
        var filter = {
            seed_id : 1
        };
        var data = {
            seed_name : "Dinarada"
        }
    }
    
     materialModel.updateMaterial(type, filter, data, function(err, result){
     });
     var html_data = {
        msg : "Data updated."
    }
    res.send(html_data);
 }


//Purchase history
exports.addPurchase = function(req,res){ //ajax
    var purchase = {
        item_type : "Pesticide",
        item_desc : "This is a test to add purchase.",
        item_id : 3,
        purchase_price : 100,
        amount : 45,
        units : "Kg"
    }
    materialModel.addPurchase(purchase, function(err, result){
    });

    html_data = {msg : "Added."}
    res.send(html_data);
}

exports.getPurchases = function(req, res){
    materialModel.getPurchases({purchase_id : 1}, function(err, result){
        if (err)
            throw err;
        else{
            var html_data = {
                msg : result[0].item_desc
            }
            res.send(html_data);
        }
    });
}

exports.updatePurchase = function(req, res){

    var status = req.query.status;
    var type = req.query.type;
    var item_id = req.query.item_id;
    var amount = req.query.amount;
    if(status == "Purchased"){
        //should add to Materials
        materialModel.materialAddUpdate(type, {item_id : item_id}, amount, function(err, result){
        });
    }
    var data = {
        item_desc : "New description from website.",
        purchase_status : status
    };
    materialModel.updatePurchase({purchase_id : 1}, data, function(err, result){
    });
    var html_data = {
        msg : "Data updated."
    }
    res.send(html_data);
}



//API Test
exports.testAPI = function(req, res){
    res.render("api");
}

exports.getWeather = function(req, res){
    console.log("Test");
    request("https://api.agromonitoring.com/agro/1.0/weather?lat=13&lon=121&appid=f7ba528791357b8aad084ea3fcb33b03", function(err, result){
        console.log(result.body);
    });
    res.send({msg : "Weather"});
}