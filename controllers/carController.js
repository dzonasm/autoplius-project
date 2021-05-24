const Car = require('../models/carModel');

const getAllCars = async (req, res) => {

    let allCars = await Car.find().populate('userId') /*if ill leave this end it will show and ALL info bout user too*/
    res.send(allCars)
}

const createPost = async (req, res) => {
    try {
        const relPath = req.file.path.replace(/\\/g, '/')
        const car = new Car({
            userId: req.user._id,
            carDescription: req.body.carDescription,
            carBrand: req.body.carBrand,
            carModel: req.body.carModel,
            carYear: req.body.carYear,
            carMileage: req.body.carMileage,
            carPrice: req.body.carPrice,
            carImage: relPath
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

    let carPosts = await Car.find({userId: req.user._id})
    res.send(carPosts)
}

const deleteCarPost = async (req, res) => {
    try {
        let cars = await Car.findByIdAndDelete({_id: req.body.id})
        res.send(cars)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}


const editCarInfo = async (req, res) => {
    try {
        const relPath = req.file.path.replace(/\\/g, '/')
        let users = await Car.findOneAndUpdate({_id: req.body._id}, {
            carDescription: req.body.carDescription,
            carBrand: req.body.carBrand,
            carModel: req.body.carModel,
            carYear: req.body.carYear,
            carMileage: req.body.carMileage,
            carPrice: req.body.carPrice,
            carImage: relPath
        })
        res.send(users)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

module.exports = {
    getAllCars,
    createPost,
    getMyCarPosts,
    deleteCarPost,
    editCarInfo
}

