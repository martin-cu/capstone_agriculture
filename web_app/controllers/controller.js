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

