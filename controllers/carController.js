const Car = require('../models/carModel')

const getMyCar = async (req, res) => {
	let allCars = await Car.find().populate('userId')
	res.send(allCars)
}

const createPost = async (req, res) => {
	console.log(req.body)
	try {
		const car = new Car({
			userId: req.body._id, //pakeisti VELIAU PO AUTENTIFIKACIJOS ... LOL
			carDescription: req.body.carDescription,
			carBrand: req.body.carBrand,
			carModel: req.body.carModel,
			carYear: req.body.carYear,
			carMileage: req.body.carMileage
			// userImg: req.user.profileImage,
		})

		let saveCar = await car.save()
		res.send(saveCar)
		console.log(saveCar)
	} catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
}

const getMyCarPosts = async (req, res) => {
	let carPosts = await Car.find({ userId: req.user._id })
	res.send(carPosts)
}

const deleteCarPost = async (req, res) => {
	try {
		Car.deleteOne({ _id: req.body.id })
	} catch (e) {
		console.log(e)
		res.send(e)
	}
}

module.exports = {
	getMyCar,
	createPost,
	getMyCarPosts,
	deleteCarPost,
}
