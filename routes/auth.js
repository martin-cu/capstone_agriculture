const router = require('express').Router();
const userController = require('../controllers/userController');
const materialController = require('../controllers/materialsController');
const farmController = require('../controllers/farmController');
const workOrderController = require('../controllers/workOrderController');
const employeeController = require('../controllers/employeeController');
const cropCalendarController = require('../controllers/cropCalendarController');
const environmentController = require('../controllers/environmentController');
const nutrientController = require('../controllers/nutrientController');
const reportController = require('../controllers/reportController');
const openWeatherController = require('../controllers/openWeatherController');
const notifController = require('../controllers/notificationController.js');
const disasterController = require('../controllers/disasterController.js');
const globe = require('../controllers/smsController.js');

const { isPrivate, isAdmin, isSales, isPurchasing, isLogistics } = require('../middlewares/checkAuth');

router.get('/create_wo_test', (req, res) => {
	var html_data = {};

	res.render('create_wo_test', html_data);
});

// router.get('/due_wo', notifController.checkDueWorkOrders);
/*** Database Ajax Start ***/

router.get('/get_farm_list', farmController.ajaxGetFarmList);
router.post('/create_crop_plan', cropCalendarController.ajaxCreateCropPlan);
router.get('/get_crop_plans', cropCalendarController.ajaxGetCropPlans);
router.get('/get_active_calendar', cropCalendarController.ajaxGetCurrentCropCalendar);

router.get('/ajax_weather_chart', reportController.ajaxWeatherChart);

//Ajax nutrient mgt
router.get('/get_nutrient_plan_details', environmentController.ajaxGetNutrientPlan);
router.get('/get_nutrient_plan_items', environmentController.ajaxGetNutrientPlanItems);
router.get('/get_nutrient_details', environmentController.ajaxGetNutrientDetails);
router.get('/get_recommendations', disasterController.ajaxGetRecommendations);
router.post('/create_nutrient_plan', environmentController.ajaxCreateNutrientPlan);
router.post('/create_nutrient_item', environmentController.ajaxCreateNutrientItem);
router.post('/update_nutrient_plan', environmentController.ajaxUpdateNutrientPlan);
router.post('/prepareFRPlan', environmentController.prepareFRPlan);
router.get('/ajax_active_cnr_plans', nutrientController.ajaxGetActiveCNRPlans);

//Ajax reports
router.get('/update_seed_chart', reportController.ajaxSeedChart);
router.get('/update_nutrient_chart', reportController.ajaxNutrientTimingChart);
router.get('/ajax_filter_dashboard', reportController.ajaxFilterOverview);

router.get('/get_soil_records', environmentController.ajaxGetSoilRecord);
router.post('/update_soil_records', environmentController.ajaxUpdateSoilRecord);
router.post('/update_nutrient_plan', environmentController.ajaxUpdateNutrientPlan);

router.get('/farm_monitoring', isPrivate, notifController.getNotification ,farmController.getMonitorFarms);
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
router.get('/get_low_stocks', materialController.ajaxGetLowStocks);

router.post('/upload_wo', workOrderController.ajaxCreateWorkOrder);
router.post('/create_wo', workOrderController.createWO);

router.post('/readFarmDetails', farmController.checkFarmExists);
router.post('/createFarmRecord', farmController.createFarmRecord);
router.post('/assign_farmers', farmController.assignFarmers);
// router.get('/getPestDiseasePerFarm', environmentController.ajaxGetPossiblePD);

router.get("/ajax_farm_details", farmController.getFarmDetails);
router.get("/ajax_farm_detailsDashboard", farmController.getFarmDetailsDashboard);
router.get("/ajaxGetSoilData", environmentController.getFarmSoilData);
router.get("/ajaxGetWorkOrders", workOrderController.ajaxGetWorkOrders);
/*** Database Ajax End ***/

//Account Management
router.get('/login', (req, res) => {
  res.render('login', { } );
});
router.get('/initialize_account', userController.getInitializePassword);
router.post('/initialize_password', userController.initializePassword);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logout);


/*** Page Navigation Start ***/
router.get('/', isPrivate, notifController.getNotification ,workOrderController.getWorkOrdersDashboard); 
router.get('/home', isPrivate, notifController.getNotification ,workOrderController.getWorkOrdersDashboard); 

router.get('/farms', isPrivate, notifController.getNotification ,workOrderController.getWorkOrdersPage); 
router.get('/farms/add', isPrivate, notifController.getNotification ,farmController.getAddFarm);

router.get('/materials', isPrivate, notifController.getNotification ,materialController.getMaterials);

//Disaster Tab
router.get('/disaster_management', isPrivate, notifController.getNotification ,disasterController.getDisasterManagement);
router.get('/farm_monitoring_summarized', isPrivate, notifController.getNotification, cropCalendarController.getSummarizedFarmMonitoring);

//Farms Tab
router.get("/farm_resources",notifController.getNotification , environmentController.getFarmResources);
router.get("/farm_pestdisease", isPrivate, notifController.getNotification ,environmentController.getFarmPestDiseases);

//Crop Calendar
router.get('/crop_calendar', isPrivate, notifController.getNotification ,cropCalendarController.getCropCalendarTab);
router.get('/crop_calendar/add', isPrivate, notifController.getNotification ,cropCalendarController.getAddCropCalendar);
router.get('/crop_calendar/details', isPrivate, notifController.getNotification ,cropCalendarController.getDetailedCropCalendar); //fix path later

router.get('/load_cnr_plans', cropCalendarController.ajaxLoadCNRPlan);
//router.get('/crop_calendar_test/add', farmController.getAddCropCalendar2); //delete later

router.get('/harvest_cycle', farmController.getHarvestCycle);


//Material Management
router.get('/inventory',notifController.getNotification , materialController.getInventory);
router.get('/ajaxGetInventory/:type', materialController.ajaxGetInventory);
router.get('/orders', isPrivate, notifController.getNotification ,notifController.getNotification ,materialController.getOrders);
router.get('/orders/details',notifController.getNotification , materialController.getPurchaseDetails);
router.post('/addMaterial', materialController.newMaterial);
router.get('/ajaxGetMaterials', materialController.getMaterialsAjax);
router.post('/addPurchase', materialController.addPurchase);
router.post('/updatePurchase', materialController.updatePurchase)


//Pest and Disease
router.get('/pest_and_disease_management', isPrivate, notifController.getNotification ,environmentController.getPestDiseaseManagement);
router.get('/pest_and_disease_management/:type/:name',notifController.getNotification , environmentController.getPestFactors);
router.get('/pest_and_disease_details', isPrivate, notifController.getNotification ,environmentController.getPestDiseaseDetails);
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
router.get('/pest_and_disease/discover', isPrivate, notifController.getNotification ,environmentController.getPestandDiseaseDiscover);
router.post('/pest_and_disease/discover', environmentController.addNewPD);
router.get('/pest_and_disease/diagnose', isPrivate, notifController.getNotification , environmentController.getDiagnoses);
router.post('/pest_and_disease/diagnose', environmentController.addDiagnosis);
router.get('/pest_and_disease/frequency', isPrivate, notifController.getNotification , environmentController.getPDFrequency);
router.post('/pest_and_disease/frequency', environmentController.createPreventionWo);
// router.get('/pest_and_disease/diagnose_add_diagnosis', environmentController.getAddDiagnosis);
router.get('/pest_and_disease/diagnose_add_pest',notifController.getNotification , environmentController.getAddPest);
router.get('/pest_and_disease/diagnose_add_disease', environmentController.getAddDisease);
router.get('/pest_and_disease/diagnose_details', isPrivate, notifController.getNotification ,environmentController.getDiagnosisDetails);
router.post('/pest_and_disease/diagnose_details', environmentController.updateDiagnosis);

router.get('/pest_and_disease/diagnose_detailed_diagnosis', environmentController.getDetailedDiagnosis);
router.get('/pest_and_disease/diagnose_detailed_pest', environmentController.getDetailedPest);
router.get('/pest_and_disease/diagnose_detailed_disease', environmentController.getDetailedDisease);
	//ajax
router.get('/ajaxGetPestandDisease', environmentController.ajaxGetPD);
router.get('/ajaxGetDiagnosisList', environmentController.ajaxDiagnosisListPerPD);
router.get('/ajaxGetDiagnosisPDFrequency', environmentController.ajaxDiagnosisPDFrequency);
router.get('/ajaxUpdateChart', environmentController.ajaxUpdateChart);
router.get('/ajaxSymptomPossibilities', environmentController.ajaxGetPossibilitiesBasedOnSymptoms);
router.get('/ajaxGetSingleProbability', environmentController.getSinglePDProbabilitity);
router.get('/checkExistingPreventionWo', environmentController.checkExistingPreventionWo);


//Nutrient Management
router.get('/nutrient_management', isPrivate, notifController.getNotification ,nutrientController.getNurientManagement);
router.get('/nutrient_management/:farm_name/:calendar_id', isPrivate, notifController.getNotification ,environmentController.detailedNutrientManagement);
router.post('/nutrient_management/add_record', environmentController.addSoilRecord);

router.get('/nutrient_mgt/discover', isPrivate, notifController.getNotification ,nutrientController.getNutrientMgtDiscover);
router.get('/nutrient_mgt/nutrient_plan', isPrivate, notifController.getNotification ,nutrientController.getNutrientMgtPlan);
router.get('/nutrient_mgt/fertilizer_plan/ajax' ,nutrientController.ajaxGetNutrientPlanView);
router.get('/nutrient_mgt/recommendation_system', isPrivate, notifController.getNotification ,nutrientController.getRecommendationSystem);
router.get('/nutrient_mgt/get_cnr_plans/ajax',nutrientController.ajaxCheckCNRPlans);
router.get('/nutrient_mgt/create_cnr_plans/ajax',nutrientController.createCNRPlan);
router.get('/nutrient_mgt/update_cnr_plan',nutrientController.updateCNRPlan);


//SMS Management (Update later)
router.get('/sms/subscriptions', isPrivate, notifController.getNotification , globe.getSubscriptions);
router.get('/sms/subscriptions_add', isPrivate, notifController.getNotification , globe.getAddSubscription);
router.get('/sms/messages', isPrivate, notifController.getNotification , globe.getMessages);


//Work Order
router.get('/farms/work_order&id=:work_order_id', isPrivate, notifController.getNotification ,workOrderController.getDetailedWO);
router.post('/create_work_order', workOrderController.createWorkOrder);
router.post('/edit_work_order', workOrderController.editWorkOrder);

//User Management
router.get('/user_management', isPrivate, notifController.getNotification , userController.loadRegistration);
router.get('/registration', userController.loadRegistration);
router.post('/account_registration', userController.registerUser);
router.get('/reset_password', (req, res) => {
  res.render('forgot_pass', { } );
});
router.post('/reset_password', userController.resetPassword);
router.get('/deactivateAccount', userController.deactivateAccount);

//Report
router.get('/farm_productivity_report', isPrivate, notifController.getNotification ,reportController.getFarmProductivityReport);
router.get('/farm_productivity/detailed', isPrivate, notifController.getNotification ,reportController.getDetailedReport);
router.get('/harvest_report/:crop_plan/summary', isPrivate, notifController.getNotification ,reportController.getSummaryHarvestReport);
router.get('/harvest_report/:crop_plan/detailed', isPrivate, notifController.getNotification ,reportController.getDetailedHarvestReport);


/*** Agro API Start ***/
//Combined Environment Variable Query
router.get('/create_forecast_record', farmController.ajaxCreateForecastedYieldRecord);
router.get('/create_complete_yield_forecast/:farm_name/:start/:end/:redirect/:calendar_id', farmController.completeYieldForecast);
router.get('/get_forecast_records', farmController.ajaxGetForecastRecord);
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
/*** Agro API End ***/

/*** OpenWeather API Start ***/
router.get('/forecast_weather14d', openWeatherController.get14DWeatherForecast);
router.get('/get_national_alert', openWeatherController.getNationalAlerts);
router.get('/get_climate_forecast', openWeatherController.climateForecast);
/*** Agro API End ***/



//Martin Testing
router.get('/forecast_yield', farmController.forecastYield);
router.get('/test_chart', reportController.testDisasterChart);


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

router.get("/updateNotif", notifController.updateNotif);//Ajax
router.get("/notifications",  notifController.getNotification ,notifController.getNotificationTab);




router.get('/test', materialController.test);
router.get('/testAPI', materialController.testAPI);
router.get('/getWeather', materialController.getWeather);


//Globe
// router.get('/globe_api', globe.test_globe);
// router.post('/globe_api2', globe.test_globe2);
router.post('/globe_inbound', globe.globe_inbound_msg);
router.get('/globe_inbound', globe.registerUser); //WHEN REGISTERING THROUGH SMS

module.exports = router;
