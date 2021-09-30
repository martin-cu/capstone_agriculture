const router = require('express').Router();
const controller = require('../controllers/controller');

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

//ajax
router.get('/addPesticide', controller.addPesticide);
router.get('/addSeed', controller.addSeed);

module.exports = router;
