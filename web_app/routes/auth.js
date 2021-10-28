const router = require('express').Router();
const controller = require('../controllers/materialsController');
const farmController = require('../controllers/farmController');
const employeeController = require('../controllers/employeeController');
const cropCalendarController = require('../controllers/cropCalendarController');
const environmentController = require('../controllers/environmentController');
const globe = require('../controllers/sms-mt');

router.get('/login', (req, res) => {
	res.render('home', {});
});

router.get('/test', controller.test);
router.get('/testAPI', controller.testAPI);
router.get('/getWeather', controller.getWeather);

/*** Database Ajax Start ***/

router.get('/get_farm_list', farmController.ajaxGetFarmList);
router.post('/create_crop_plan', cropCalendarController.ajaxCreateCropPlan);
router.get('/get_crop_plans', cropCalendarController.ajaxGetCropPlans);

/*** Database Ajax End ***/

/*** Page Navigation Start ***/
router.get('/', farmController.getDashboard);
router.get('/home', farmController.getDashboard);

router.get('/farms', farmController.getFarms);

router.get('/crop_calendar', farmController.getCropCalendar);
router.get('/crop_calendar/add', farmController.getAddCropCalendar);

router.get('/harvest_cycle', farmController.getHarvestCycle);

router.get('/pest_and_disease_management', environmentController.getPestDiseaseManagement);
router.get('/pest_and_disease_management/:type/:name', environmentController.getPestFactors);
router.post('/addPest', environmentController.addPest);
router.post('/addDisease', environmentController.addDisease);

router.get('/nutrient_management', environmentController.getNurientManagement);
/*** Page Navigation End ***/


router.post('/readFarmDetails', farmController.singleFarmDetails);
router.post('/createFarmRecord', farmController.createFarmRecord);
router.get('/deleteFarmRecord/:id', farmController.retireFarm);

/*** Agro API Start ***/
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




/*** Agro API End ***/




//ajax
router.get('/addNewItem', controller.addMaterials);
router.get('/getMaterials', controller.getMaterials);
router.get('/updateMaterial', controller.updateMaterial);
router.get('/addFarmMaterial', controller.addFarmMaterial);
router.get('/addPurchase', controller.addPurchase);
router.get('/getPurchases', controller.getPurchases);
router.get('/updatePurchase', controller.updatePurchase);

router.get('/get_employees', employeeController.ajaxEmployees);
router.post('/assign_farmers', farmController.assignFarmers);



//Globe
router.get('/globe_api', globe.test_globe);
router.post('/globe_api2', globe.test_globe2);

module.exports = router;
