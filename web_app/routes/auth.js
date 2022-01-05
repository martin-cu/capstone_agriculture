const router = require('express').Router();
const materialController = require('../controllers/materialsController');
const farmController = require('../controllers/farmController');
const workOrderController = require('../controllers/workOrderController');
const employeeController = require('../controllers/employeeController');
const cropCalendarController = require('../controllers/cropCalendarController');
const environmentController = require('../controllers/environmentController');
const reportController = require('../controllers/reportController');
const globe = require('../controllers/sms-mt');

router.get('/login', (req, res) => {
	res.render('home', {});
});


router.get('/create_wo_test', (req, res) => {
	var html_data = {};

	res.render('create_wo_test', html_data);
});


/*** Database Ajax Start ***/

router.get('/get_farm_list', farmController.ajaxGetFarmList);
router.post('/create_crop_plan', cropCalendarController.ajaxCreateCropPlan);
router.get('/get_crop_plans', cropCalendarController.ajaxGetCropPlans);
router.get('/get_active_calendar', cropCalendarController.ajaxGetCurrentCropCalendar);

//Ajax nutrient mgt
router.get('/get_nutrient_plan_details', environmentController.ajaxGetNutrientPlan);
router.get('/get_nutrient_plan_items', environmentController.ajaxGetNutrientPlanItems);
router.get('/get_nutrient_details', environmentController.ajaxGetNutrientDetails);
router.post('/create_nutrient_plan', environmentController.ajaxCreateNutrientPlan);
router.post('/create_nutrient_item', environmentController.ajaxCreateNutrientItem);
router.post('/update_nutrient_plan', environmentController.ajaxUpdateNutrientPlan);
router.post('/prepareFRPlan', environmentController.prepareFRPlan);

router.get('/get_soil_records', environmentController.ajaxGetSoilRecord);
router.post('/update_soil_records', environmentController.ajaxUpdateSoilRecord);
router.post('/update_nutrient_plan', environmentController.ajaxUpdateNutrientPlan);

router.get('/farm_monitor_test', farmController.getMonitorFarms);
router.get('/filter_farm_details', farmController.getFarmDetails);
router.get('/filter_farmers', employeeController.ajaxFilterFarmers);

router.post('/upload_weather_forecast', environmentController.uploadForecastResult);
router.get('/get_weather_forecast', environmentController.getWeatherForecast);
router.get('/clear_weather_forecast', environmentController.clearWeatherForecastRecords);

router.get('/get_work_orders', workOrderController.ajaxGetWorkOrders);
router.get('/ajax_edit_wo', workOrderController.ajaxEditStatus);
router.get('/get_wo_resources', workOrderController.ajaxGetWOResources);
router.get('/get_materials', materialController.ajaxGetMaterials);
router.get('/getAll_materials', materialController.ajaxGetAllMaterials);
router.get('/getResourcesPerFarm', environmentController.ajaxGetResources);
router.get('/filter_nutrient_mgt', environmentController.ajaxGetDetailedNutrientMgt);
router.get('/get_cycle_resources_used', materialController.ajaxGetResourcesUsed);

router.post('/upload_wo', workOrderController.ajaxCreateWorkOrder);
router.post('/create_wo', workOrderController.createWO);

// router.get('/getPestDiseasePerFarm', environmentController.ajaxGetPossiblePD);


/*** Database Ajax End ***/

/*** Page Navigation Start ***/

//login page
// router.get('/', function(req, res) {
//     res.render('login', {
//         layout: 'login-main',
//       })
// });

//router.get('/', farmController.getDashboard);
//router.get('/home', farmController.getDashboard);

router.get('/', workOrderController.getWorkOrdersDashboard); 

router.get('/farms', workOrderController.getWorkOrdersPage); 
router.get('/farms/add', farmController.getAddFarm);

router.get('/materials', materialController.getMaterials);

//Farms Tab
router.get("/farm_resources", environmentController.getFarmResources);
router.get("/farm_pestdisease", environmentController.getFarmPestDiseases);
//ajax
router.get("/ajax_farm_details", farmController.getFarmDetails);
router.get("/ajax_farm_detailsDashboard", farmController.getFarmDetailsDashboard);
router.get("/ajaxGetSoilData", environmentController.getFarmSoilData);

router.get("/ajaxGetWorkOrders", workOrderController.ajaxGetWorkOrders);

//Crop Calendar
router.get('/crop_calendar', cropCalendarController.getCropCalendarTab);
router.get('/crop_calendar/add', cropCalendarController.getAddCropCalendar);
router.get('/crop_calendar/details', cropCalendarController.getDetailedCropCalendar); //fix path later

router.get('/farm_productivity_report', (req, res) => {
	res.render('farm_productivity_report', {});
});

//router.get('/crop_calendar_test/add', farmController.getAddCropCalendar2); //delete later

router.get('/harvest_cycle', farmController.getHarvestCycle);


//Material Management
router.get('/inventory', materialController.getInventory);
router.get('/ajaxGetInventory/:type', materialController.ajaxGetInventory);
router.get('/orders', materialController.getOrders);
router.get('/orders/details', materialController.getPurchaseDetails);
router.post('/addMaterial', materialController.newMaterial);
router.get('/ajaxGetMaterials', materialController.getMaterialsAjax);
router.post('/addPurchase', materialController.addPurchase);
router.post('/updatePurchase', materialController.updatePurchase)


//Pest and Disease
router.get('/pest_and_disease_management', environmentController.getPestDiseaseManagement);
router.get('/pest_and_disease_management/:type/:name', environmentController.getPestFactors);
router.get('/pest_and_disease_details', environmentController.getPestDiseaseDetails);
router.get('/update_pd_details/:type/:id/:detail_type', environmentController.updatePDDetails);
router.get('/PDProbability', environmentController.ajaxGetFarmPestDiseaseProbability); //ajax 
router.post('/addPest', environmentController.addPest);
router.post('/addDisease', environmentController.addDisease);
router.get('/generateRecommendationDiagnosis', environmentController.getRecommendationDiagnosis);
router.get('/getPossiblePD', environmentController.getPDProbability); //Used in storing recommendation
router.get('/storePDRecommendation', environmentController.storePDRecommendation);
router.get('/ajaxGetDiagnoses', environmentController.getDiagnosisList);
router.get('/ajaxGetPastProbabilities', environmentController.getProbabilities);
router.get('/ajaxGetDiagnosisStageFrequency', environmentController.ajaxGetDiagnosisStageFrequency);
router.get('/getPDPreventions', environmentController.getPreventions);

//Temporary Pest and Disease (Update later)


//diagnose tab
router.get('/pest_and_disease/discover', environmentController.getPestandDiseaseDiscover);
router.post('/pest_and_disease/discover', environmentController.addNewPD);
router.get('/pest_and_disease/diagnose', environmentController.getDiagnoses);
router.post('/pest_and_disease/diagnose', environmentController.addDiagnosis);
router.get('/pest_and_disease/diagnose_add_diagnosis', environmentController.getAddDiagnosis);
router.get('/pest_and_disease/diagnose_add_pest', environmentController.getAddPest);
router.get('/pest_and_disease/diagnose_add_disease', environmentController.getAddDisease);
router.get('/pest_and_disease/diagnose_details', environmentController.getDiagnosisDetails);
router.post('/pest_and_disease/diagnose_details', environmentController.updateDiagnosis);

router.get('/pest_and_disease/diagnose_detailed_diagnosis', environmentController.getDetailedDiagnosis);
router.get('/pest_and_disease/diagnose_detailed_pest', environmentController.getDetailedPest);
router.get('/pest_and_disease/diagnose_detailed_disease', environmentController.getDetailedDisease);
	//ajax
router.get('/ajaxGetPestandDisease', environmentController.ajaxGetPD);


//Nutrient Management
router.get('/nutrient_management', environmentController.getNurientManagement);
router.get('/nutrient_management/:farm_name/:calendar_id', environmentController.detailedNutrientManagement);
router.post('/nutrient_management/add_record', environmentController.addSoilRecord);

//SMS Management (Update later)
router.get('/sms/subscriptions', globe.getSubscriptions);
router.get('/sms/subscriptions_add', globe.getAddSubscription);
router.get('/sms/messages', globe.getMessages);


//Work Order
router.get('/farms/work_order&id=:work_order_id', workOrderController.getDetailedWO);
router.post('/create_work_order', workOrderController.createWorkOrder);
router.post('/edit_work_order', workOrderController.editWorkOrder);

//Report
router.get('/test_report', reportController.getDetailedReport);

/*** Page Navigation End ***/


router.post('/readFarmDetails', farmController.singleFarmDetails);
router.post('/createFarmRecord', farmController.createFarmRecord);
router.get('/deleteFarmRecord/:id', farmController.retireFarm);

/*** Agro API Start ***/
//Combined Environment Variable Query
router.get('/get_calendar_variables', farmController.getIncludedCalendars);
router.get('/forecast_yield_farm', farmController.getYieldVariables);
router.get('/forecast_yield', farmController.forecastYield);
router.get('/historical_variables', farmController.queryYieldVariables);
router.get('/create_yield_forecast', farmController.createYieldForecast);
//NDVI
router.get('/agroapi/ndvi/history', farmController.getHistoricalNDVI);
router.get('/agroapi/ndvi/imagery', farmController.getSatelliteImageryData);
//Soil
router.get('/agroapi/soil/current', farmController.getCurrentSoilData);
router.get('/agroapi/soil/history', farmController.getHistoricalSoilData);
//Temperature and Precipitation
router.get('/agroapi/temp/history', farmController.getAccumulatedTemperature);
router.get('/agroapi/precipitation/history', farmController.getAccumulatedPrecipitation);
//UVI
router.get('/agroapi/uvi/current', farmController.getCurrentUVI);
router.get('/agroapi/uvi/history', farmController.getHistoricalUVI);
//Polygons
router.post('/agroapi/polygon/create', farmController.createPolygon);
router.get('/agroapi/polygon/readSingle', farmController.getPolygonInfo);
router.get('/agroapi/polygon/readAll', farmController.getAllPolygons);
router.get('/agroapi/polygon/update', farmController.updatePolygonName);
router.get('/agroapi/polygon/delete', farmController.removePolygon);
//Weather
router.get('/agroapi/weather/current', farmController.getCurrentWeather);
router.get('/agroapi/weather/history', farmController.getHistoricalWeather);
router.get('/agroapi/weather/forecast', farmController.getForecastWeather);

router.get('/get_employees', employeeController.ajaxEmployees);
router.post('/assign_farmers', farmController.assignFarmers);
/*** Agro API End ***/




//Martin Testing
router.get('/forecast_yield', farmController.forecastYield);



//Y2 TESTING
router.post('/addPest', environmentController.addPest);
router.post('/addDisease', environmentController.addDisease);

router.get('/addNewItem', materialController.addMaterials);
router.get('/getMaterials', materialController.getMaterials); 
router.get('/updateMaterial', materialController.updateMaterial);
router.get('/addFarmMaterial', materialController.addFarmMaterial);
// router.get('/addPurchase', materialController.addPurchase);
router.get('/getPurchases', materialController.getPurchases);
router.get('/updatePurchase', materialController.updatePurchase);

router.get('/getMaterialsAjax/:type', materialController.getMaterialsAjax);






router.get('/test', materialController.test);
router.get('/testAPI', materialController.testAPI);
router.get('/getWeather', materialController.getWeather);


//Globe
router.get('/globe_api', globe.test_globe);
router.post('/globe_api2', globe.test_globe2);

module.exports = router;
