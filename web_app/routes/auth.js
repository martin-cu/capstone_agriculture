const router = require('express').Router();
const controller = require('../controllers/controller');
const farmController = require('../controllers/farmController');

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

/*** Agro API ***/
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
/*** Agro API End ***/

//ajax
router.get('/addPesticide', controller.getMaterials);
router.get('/updatePesticide', controller.updateMaterial);

router.get('/addPurchase', controller.addPurchase);
router.get('/getPurchases', controller.getPurchases);
router.get('/updatePurchase', controller.updatePurchase);



module.exports = router;
