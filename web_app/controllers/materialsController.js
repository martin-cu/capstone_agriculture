const request = require('request');
const materialModel = require('../models/materialModel');
const dataformatter = require('../public/js/dataformatter.js');

exports.test = function(req,res){
    //Check if item already exists

    //if exists, update

    //else add new
    
    res.render("test",{test_data : "ADDED NEW ITEM"});
}

exports.addMaterials = function(req,res){
    var type = req.query.type;
    var farm_id = req.query.farm_id;
    if(type == "Seed"){
        var data = {
            seed_name : req.query.seed_name,
            seed_desc : req.query.seed_desc,
            maturity_days : req.query.maturity_days
        }
    }
    else if(type == "Pesticide"){
        var data = {
            pesticide_name : req.query.pesticide_name,
            pesticide_desc : req.query.pesticide_desc,
        }
    }
    else if(type == "Fertilizer"){
        var data = {
            fertilizer_name : req.query.fertilizer_name,
            fertilizer_desc : req.query.fertilizer_desc,
        }
    }
    materialModel.registerMaterial(type, data, function(err, result){
            
    });
    res.send({msg : "ITEMA DDED."});
};
exports.getMaterials = function(req,res){ //ajax
    // materialModel.addPesticide(function(err,result){
    // });
    var filter = req.query.filter == undefined ? null : req.query.filter;
    var type = req.query.type;

    materialModel.getMaterials(type, filter, function(err, result){
        if (err)
			throw err;
        else{
            for(var i = 0; i < result.length ; i++){
                console.log(result[i]);
            }

            res.send(result);
        }
    });
}
 exports.updateMaterial = function(req,res){

    var type = req.query.type;
    console.log(type);
    if(type == "Pesticide"){
        var filter = {
            pesticide_id : 1
        };
        var data = {
            pesticide_name : "Pesticide11"
        }
    }
    else if(type == "Seed"){
        var filter = {
            seed_id : 1
        };
        var data = {
            seed_name : "Dinarada"
        }
    }
    else if(type == "Fertilizer"){
        var filter = {
            fertilizer_id : 1
        };
        var data = {
            fertilizer_name : "Dinarada1"
        }
    }
    
     materialModel.updateMaterial(type, filter, data, function(err, result){
     });
     var html_data = {
        msg : "Data updated."
    }
    res.send(html_data);
 }

 exports.addFarmMaterial = function(req,res){
    var filter = [req.query.farm_id,req.query.item_type,req.query.item_id];
    materialModel.getFarmMaterialsMultiple(filter, function(err, result){
        //Checks if already exists
        if(result.length > 0){
            //add current ammount
            var id = {farm_mat_id : result[0].farm_mat_id};
            var cur_amount = result[0].current_amount + parseInt(req.query.current_amount);
            console.log(typeof req.query.current_amount);
            var data = {current_amount : cur_amount}
            materialModel.updateFarmMaterials(data, id, function(err, succ){
                
            });
        }
        else{
            materialModel.registerFarmMaterial(req.query, function(err, result2){
            });
        }
    });

    res.send({msg : "oks na"});
}

//Purchase history
exports.addPurchase = function(req,res){ //ajax
    var purchase = {
        item_type : "Pesticide",
        item_desc : "This is a test to add purchase.",
        item_id : 3,
        purchase_price : 100,
        amount : 45,
        units : "Kg",
        requested_by : 1,
        request_date : dataformatter.formatDate(new Date(), 'YYYY-MM-DD')
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
    var purchase_id = req.query.purchase_id;
    var farm_mat_id = req.query.farm_mat_id;
    if(status == "Purchased"){
        //should add to Materials
        console.log("Add farm materials");
        materialModel.addFarmMaterials(amount, farm_mat_id, function(err, result){
        });
    }
    var data = {
        item_desc : "New description from website.",
        purchase_status : status
    };
    materialModel.updatePurchase(purchase_id, data, function(err, result){
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
    console.log(req)
    res.send({msg : "Weather"});
}