const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Session = require('../models/sessionModel')

const signUp = async (req, res) => {
	try {
		// bcrypt pries saugojant i duomenu baze uzhashinam passworda, ir jau saugom hasha vietoj tikrojo passwordo

		const user = new User({
			email: req.body.email,
			password: req.body.password,
		})

		let newUser = await user.save()
		res.send(newUser)
	} catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
}

const getAllUsers = async (req, res) => {
	const allUsers = await User.find()
	res.send(allUsers)
}

// req (request - uzklausa)
// req = {
//  body: {}
//  ip: 92.213.123.12
//  browser: "chrome v12.2.3.5.5"
//  header: {}
// }

// res (response - atsakymas)
// res.send() siunciam informacija atgal uzsakovui (front-end)

const signIn = async (req, res) => {
	try {
		// paemam useri is database pagal email, nes emailas yra unikalus
		let user = await User.findOne({
			email: req.body.email,
		})
		// siunciam error jeigu buvo nerastas useris su tokiu emailu
		if (!user)
			throw {
				message: 'Wrong email',
			}
		// patikrinam ar siustas userio passwordas kai jis yra uzhashintas sutampa su duombazej hashintu passwordu
		let passwordMatch = bcrypt.compareSync(req.body.password, user.password)

		console.log(passwordMatch, req.body.password, user.password)
		// jei ne siunciam error
		if (!passwordMatch)
			throw {
				message: 'Wrong password',
			}
		//kuriam sessijos tokena

		let token = jwt.sign(
			{
				id: user._id,
				role: 'user',
			},
			process.env.JWT_PASSWORD,
		)

		let session = new Session({
			sessionToken: token,
			expires: new Date().setMonth(new Date().getMonth() + 1),
		})

		await session.save()

		// jei viskas ok siunciam userioobjekta
		res.header('twitterauth', token).send(user)
	} catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
}

const currentUser = (req, res) => {
	res.send(req.user)
}

const logOut = async (req, res) => {
	try {
		let token = req.sessionToken
		await token.remove()
		res.send({
			message: 'Success',
		})
	} catch (e) {
		res.status(400).send({
			message: 'Something went wrong',
		})
	}
}

const updateUserInfo = async (req, res) => {
	console.log(req.file)
	let user = req.user
	if (req.profileImage) {
		user.profileImage = req.file.path
		await user.save()
	}

	res.send(user)
}

module.exports = {
	signUp,
	signIn,
	currentUser,
	logOut,
	getAllUsers,
	updateUserInfo,
}
