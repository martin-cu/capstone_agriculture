const materialModel = require('../models/materialModel');

exports.addMaterials = function(req,res){
    //Check if item already exists

    //if exists, update

    //else add new
    
    res.render("test",{test_data : "SELECT"});
}

exports.getMaterials = function(req,res){
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


exports.addSeed = function(req,res){
    materialModel.registerMaterial("seed", {seed_name:"SEED1",seed_desc:'Used for dinorado32', current_amount: 500, maturity_days:140, average_yield:100}, function(result){
    });
    html_data = {msg : "Added."}
    res.send(html_data);
}

