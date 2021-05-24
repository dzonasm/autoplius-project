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
router.route('/cars/mycars').get(authenticateMiddleware.authenticate, carController.getMyCarPosts);
router.route('/cars/mycars').post(authenticateMiddleware.authenticate, upload.single('carImage') ,carController.createPost);
router.route('/cars/editCarInfo').post(authenticateMiddleware.authenticate, upload.single('updateCarImg'), carController.editCarInfo)
router.route('/cars/delete').delete(authenticateMiddleware.authenticate, carController.deleteCarPost);


router.route('/cars/search').get((req, res) => {
	res.send('serching for cars');
});

router.route('/user/editUserInfo').post(authenticateMiddleware.authenticate, userController.editUserInfo)
router.route('/user/updateUserInfo').post(authenticateMiddleware.authenticate, upload.single('avatar'),userController.updateUserInfo);

router.route('/user/signUp').post(userController.signUp);
router.route('/user/signIn').post(userController.signIn);
router.route('/user/currentUser').get(authenticateMiddleware.authenticate, userController.currentUser);
router.route('/user/logOut').post(authenticateMiddleware.authenticate, userController.logOut);

module.exports = router;
