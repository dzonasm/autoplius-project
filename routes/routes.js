const router = require('express').Router();
const multer = require('multer');

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
router.route('/cars').get((req, res) => {
	res.send('you hit the cars endpoint');
});

router.route('/cars/mycars').get((req, res) => {
	res.send('these are my cars');
});

router.route('/cars/search').get((req, res) => {
	res.send('serching for cars');
});

router.route('./cars/upload').post((req, res) => {
	res.send('posting car');
});

router.route('.cars/delete').delete((req, res) => {
	res.send('deleted car');
});

// user
router.route('/user/signUp').post(userController.signUp);
router.route('/user/signIn').post(userController.signIn);
router.route('/user/currentUser').get(authenticateMiddleware.authenticate, userController.currentUser);
router.route('/user/logOut').post(authenticateMiddleware.authenticate, userController.logOut);

module.exports = router;
