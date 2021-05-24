const mongoose = require('mongoose')


const carPost = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    carBrand: {
        type: String,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    carYear: {
        type: Number,
        required: true,
    },
    carMileage: {
        type: Number,
        required: true,
    },
    carPrice: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    carDescription: {
        type: String,
    },
    carImage: {
        type: String
    }
}, {
    toJSON: {
        transform(doc, ret) {
            if (ret.carImage)
          ret.carImage= 'http://localhost:3000/' + ret.carImage
        }
    }
})


const Car = mongoose.model('Cars', carPost)

module.exports = Car
