const materialModel = require('../models/materialModel');

exports.addMaterial = function(req,res){
    //Check if item already exists

    //if exists, update

    //else add new
    materialModel.addPesticide(function(err,result){
        res.render("test",{test_data : "ADDED"});
    });
    
}