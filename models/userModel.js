const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    profileImage: {
        type: String
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password
            if (ret.profileImage) ret.profileImage = 'http://localhost:3000/' + ret.profileImage
        }
    }
})

userSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        let hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        next();
    } else {
        next();
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
