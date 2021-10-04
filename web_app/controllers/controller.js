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


exports.addSeed = function(req,res){ //ajax
    materialModel.registerMaterial("seed", {seed_name:"SEED1",seed_desc:'Used for dinorado32', current_amount: 500, maturity_days:140, average_yield:100}, function(result){
    });
    html_data = {msg : "Added."}
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
    var data = {
        item_desc : "New description from website."
    };
    materialModel.updatePurchase({purchase_id : 1}, data, function(err, result){
    });
    var html_data = {
        msg : "Data updated."
    }
    res.send(html_data);
}