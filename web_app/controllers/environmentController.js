const dataformatter = require('../public/js/dataformatter.js');
const analyzer = require('../public/js/analyzer.js');
const js = require('../public/js/session.js');
const pestdiseaseModel = require('../models/pestdiseaseModel.js');
var request = require('request');

exports.getPestDiseaseManagement = function(req, res) {
	var html_data = {};
	pestdiseaseModel.getAllPests(function(err,pests){
		if(err){
			throw err;
		}
		else{
			pestdiseaseModel.getAllDiseases(function(err,diseases){
				if(err){
					throw err;
				}
				else{
					html_data["pests"] = pests;
					html_data["diseases"] = diseases;
					html_data = js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease');
					res.render('pest_disease', html_data);
				}
			});
		}
	});
}

exports.getPestFactors = function(req,res){
	var html_data = {};

	var type = req.params.type;
	var id = req.params.name;

	if(type == "Pest"){
		pestdiseaseModel.getPestFactors(id, function(err, factors){
			if(err){
				throw err;
			}
			else{
				pestdiseaseModel.getPestDetails({pest_id : id}, function(err, details){
					if(err){
						throw err;
					}
					else{
						if(details.length == 0){
	
						}
						else{
							console.log(details[0].pest_name);
							console.log(factors);
							html_data['pest_name'] =  details[0].pest_name;
							html_data["factors"] = factors;
							js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease');
							res.render('pest_disease2', html_data);
						}
					}
				});
			}
		});
	}
	else{
		pestdiseaseModel.getDiseaseFactors(id, function(err, factors){
			if(err){
				throw err;
			}
			else{
				pestdiseaseModel.getDiseaseDetails({disease_id : id}, function(err, details){
					if(err){
						throw err;
					}
					else{
						if(details.length == 0){
	
						}
						else{
							console.log(details[0].disease_name);
							console.log(factors);
							html_data['pest_name'] =  details[0].disease_name;
							html_data["factors"] = factors;
							js.init_session(html_data, 'role', 'name', 'username', 'pest_and_disease');
							res.render('pest_disease2', html_data);
						}
					}
				});
			}
		});
	}
	
}



exports.getNurientManagement = function(req, res) {
	var html_data = {};
	html_data = js.init_session(html_data, 'role', 'name', 'username', 'nutrient_mgt');
	res.render('/nutrient_mgt', html_data);
}




exports.addPest = function(req,res){
	var pest_data = req.query.pest_data;
	pestdiseaseModel.addPest(pest_data, function(err, result){
	});
}




