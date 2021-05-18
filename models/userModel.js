const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			// unique validacija kad nebutu issaugotas objektas duomenu bazej su tokiu paciu email value
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		profileImage: {
			type: String,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret.password
				ret.profileImage = 'http://localhost:3000/' + ret.profileImage
			},
		},
	},
)

// schema pre leidzia paleisti funckija prie konkretu ivyki, siuo atveju pries saugant objekata DB
userSchema.pre('save', function (next) {
	//naudojam paprasta funckoja. This yra useris kuris bus saugomas DB
	let user = this
	// isModified grazina true arba false jeigu nustatyas parametras yra keiciamas (turi nauja reiksme)
	if (user.isModified('password')) {
		// hashinam nauja slaptazodi
		let hash = bcrypt.hashSync(user.password, 10)
		// priskiriam hashinta slaptazodi vartotojui
		user.password = hash
		// leidziam toliau saugoti useri DB
		next()
	} else {
		// leidziam toliau saugoti useri DB
		next()
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User
