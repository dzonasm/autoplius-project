const Car = require("../models/carModel");

const getAllCars = async (req, res) => {
	let allCars = await Car.find().populate("userId"); /*if ill leave this end it will show and ALL info bout user too*/
	res.send(allCars);
};

const createPost = async (req, res) => {
	try {
		// const relPath = req.file.path.replace(/\\/g, "/");
		const car = new Car({
			userId: req.user._id,
			carDescription: req.body.carDescription,
			carBrand: req.body.carBrand,
			carModel: req.body.carModel,
			carYear: req.body.carYear,
			carMileage: req.body.carMileage,
			carPrice: req.body.carPrice,
			// carImage: relPath,
		});

		let saveCar = await car.save();
		res.send(saveCar);
		console.log(saveCar);
	} catch (e) {
		console.log(e);
		res.status(400).send(e);
	}
};

const getMyCarPosts = async (req, res) => {
	let carPosts = await Car.find({ userId: req.user._id });
	res.send(carPosts);
};

const deleteCarPost = async (req, res) => {
	try {
		let cars = await Car.findByIdAndDelete({ _id: req.body.id });
		res.send(cars);
	} catch (e) {
		console.log(e);
		res.send(e);
	}
};

const editCarInfo = async (req, res) => {
	try {
		const relPath = req.file.path.replace(/\\/g, "/");
		let users = await Car.findOneAndUpdate(
			{ _id: req.body._id },
			{
				carDescription: req.body.carDescription,
				carBrand: req.body.carBrand,
				carModel: req.body.carModel,
				carYear: req.body.carYear,
				carMileage: req.body.carMileage,
				carPrice: req.body.carPrice,
				carImage: relPath,
			},
		);
		res.send(users);
	} catch (e) {
		console.log(e);
		res.send(e);
	}
};

// gaunu req objekte make, model, year(from-to), price(from-to), mileage
// turiu conditionally apsirasyti query, kuris susidarys tik is tu argumentu, kurie yra passinti
// upper ir lower letters

const searchCars = async (req, res) => {
	try {
		const searchQuery = {};
		req.body.carBrand ? (searchQuery.carBrand = req.body.carBrand) : null;
		req.body.carModel ? (searchQuery.carModel = req.body.carModel) : null;
		if (req.body.priceFrom && req.body.priceTo) {
			searchQuery.carPrice = { $gte: req.body.priceFrom, $lte: req.body.priceTo };
		}
		if (req.body.priceFrom && !req.body.priceTo) {
			searchQuery.carPrice = { $gte: req.body.priceFrom };
		}
		if (!req.body.priceFrom && req.body.priceTo) {
			searchQuery.carPrice = { $lte: req.body.priceTo };
		}

		if (req.body.yearFrom && req.body.yearTo) {
			searchQuery.carYear = { $gte: req.body.yearFrom, $lte: req.body.yearTo };
		}
		if (req.body.yearFrom && !req.body.yearTo) {
			searchQuery.carYear = { $gte: req.body.yearFrom };
		}
		if (!req.body.yearFrom && req.body.yearTo) {
			searchQuery.carYear = { $lte: req.body.yearTo };
		}

		if (req.body.mileageFrom && req.body.mileageTo) {
			searchQuery.carMileage = { $gte: req.body.mileageFrom, $lte: req.body.mileageTo };
		}
		if (req.body.mileageFrom && !req.body.mileageTo) {
			searchQuery.carMileage = { $gte: req.body.mileageFrom };
		}
		if (!req.body.mileageFrom && req.body.mileageTo) {
			searchQuery.carMileage = { $lte: req.body.mileageTo };
		}

		//mileage search

		// db.collection.find({price: {$gte: 501, $lte: 1000}}).sort({price:1})

		const cars = await Car.find(searchQuery);
		res.send(cars);
	} catch (e) {
		res.status(404).send("couldnt find your car", e);
	}
};

module.exports = {
	getAllCars,
	createPost,
	getMyCarPosts,
	deleteCarPost,
	editCarInfo,
	searchCars,
};
