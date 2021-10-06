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

//Geotagging test
router.get('/geotagging', farmController.getSatelliteImageryData);
router.get('/deletepolygon', farmController.removePolygon);


//ajax
router.get('/addPesticide', controller.getMaterials);
router.get('/updatePesticide', controller.updateMaterial);

router.get('/addPurchase', controller.addPurchase);
router.get('/getPurchases', controller.getPurchases);
router.get('/updatePurchase', controller.updatePurchase);



module.exports = router;
