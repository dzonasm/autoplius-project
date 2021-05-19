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
    carDescription: {
        type: String,
        // },
        // toJSON: {
        //     transform(doc, ret) {
        //         delete ret.password
        //         if (ret.profileImage) ret.profileImage = 'http://localhost:3000/' + ret.profileImage
        //     }
        // }
    }
})


const Car = mongoose.model('Tweets', carPost)

module.exports = Car
