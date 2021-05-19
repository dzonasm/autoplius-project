const userSchema = new mongoose.Schema(
	{
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
			unique: true
		},
		Phone: {
			type: String,
			required: true,
			unique: true
		},
	},
)

userSchema.pre('save', function (next) {
	let user = this
	if (user.isModified('password')) {
		let hash = bcrypt.hashSync(user.password, 10)
		user.password = hash
		next()
	} else {
		next()
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User
