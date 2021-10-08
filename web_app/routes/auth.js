const router = require('express').Router();
const controller = require('../controllers/controller');
const farmController = require('../controllers/farmController');
const environmentController = require('../controllers/environmentController');

router.get('/login', (req, res) => {
	res.render('home', {});
});
router.get('/home', (req, res) => {
	res.render('home', {});
});

router.get('/', (req, res) => {
	res.render('home', {});
});

router.get('/addMaterials', controller.addMaterials);
router.get('/testAPI', controller.testAPI);
router.get('/getWeather', controller.getWeather);

/*** Page Navigation Start ***/
router.get('/', farmController.getDashboard);
router.get('/home', farmController.getDashboard);

router.get('/farms', farmController.getFarms);

router.get('/crop_calendar', farmController.getCropCalendar);

router.get('/harvest_cycle', farmController.getHarvestCycle);

router.get('/pest_and_disease_management', environmentController.getPestDiseaseManagement);

router.get('/nutrient_management', environmentController.getNurientManagement);
/*** Page Navigation End ***/

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
router.get('/agroapi/polygon/create', farmController.createPolygon);
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
router.get('/addPesticide', controller.getMaterials);
router.get('/updatePesticide', controller.updateMaterial);

router.get('/addPurchase', controller.addPurchase);
router.get('/getPurchases', controller.getPurchases);
router.get('/updatePurchase', controller.updatePurchase);



module.exports = router;
