const router = require('express').Router();
const multer = require('multer');

const carController = require('../controllers/carController');
const userController = require('../controllers/userController');
const authenticateMiddleware = require('../middleware/authenticate');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({
	storage,
});

//cars
router.route('/cars').get(carController.getAllCars);
router.route('/cars/getCar').get(carController.getCar);
router.route('/cars/upload').post(authenticateMiddleware.authenticate, carController.createPost);
router.route('/cars/mycars').get(authenticateMiddleware.authenticate, carController.getMyCarPosts);

router.route('/cars/search').get((req, res) => {
	res.send('serching for cars');
});

router.route('/cars/delete').delete((req, res) => {
	res.send('deleted car');
});

router.route('/cars/edit').delete((req, res) => {
	res.send('edit car post');
});
// user
router.route('/user/signUp').post(userController.signUp);
router.route('/user/signIn').post(userController.signIn);
router.route('/user/currentUser').get(authenticateMiddleware.authenticate, userController.currentUser);
router.route('/user/logOut').post(authenticateMiddleware.authenticate, userController.logOut);

module.exports = router;
