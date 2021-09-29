const materialModel = require('../models/materialModel');

exports.addMaterials = function(req,res){
    //Check if item already exists

    //if exists, update

    //else add new
    
    res.render("test",{test_data : "SELECT"});
}

exports.addPesticide = function(req,res){
    console.log("Added one pesticide");
    materialModel.addPesticide(function(err,result){
    });
    
    html_data = {msg : "Done. Pesticide added."}
    res.send(html_data);
}

exports.addSeed = function(req,res){
    seed = "Dinorado2"
    materialModel.addSeed(seed, function(err,result){
    });

    html_data = {msg : "Done. Seed added."}
    res.send(html_data);
}