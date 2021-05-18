// isiimportuojame modeli kuri sukureme
const Tweet = require('../models/tweetModel')

let tweets = []

const getTweets = async (req, res) => {
	// paemam modeli. Modelis turi savyje funckijas. Viena ju yra find(). Gauti visus irasus (dokumentus) is Tweets collection
	let allTweets = await Tweet.find().populate('userId')
	res.send(allTweets)
}

const createTweet = async (req, res) => {
	console.log(req.body.content)
	// su try/catch turim galimybe isgaudyti klaidas ir nepergyvent del serverio uzluzimo
	try {
		// pagal modeli kuri apsiraseme kuriame nauja dokumenta
		const tweet = new Tweet({
			content: req.body.content,
			userId: req.user._id,
			userImg: req.user.profileImage,
		})

		//sukurta dokumenta saugome duombazeje
		let savedTweet = await tweet.save()
		// vartotojui siunciame atgal sukurta dokumenta, jau su id
		res.send(savedTweet)
		console.log(savedTweet)
	} catch (e) {
		console.log(e)
		// siunciam vartotojui atsakyma apie kazkokia klaida
		res.status(400).send(e)
	}
}

const likeTweet = async (req, res) => {
	try {
		if (!req.body.tweetId)
			throw {
				message: 'Provide tweet id',
			}
		let tweet = await Tweet.findOneAndUpdate(
			{
				_id: req.body.tweetId,
			},
			{
				$inc: {
					likesCount: 1,
				},
			},
			{
				new: true,
			},
		)

		res.send(tweet)
	} catch (e) {
		res.status(400).send(e)
	}
}

const getMyTweets = async (req, res) => {
	let tweets = await Tweet.find({ userId: req.user._id })
	res.send(tweets)
}

const deleteTweet = async (req, res) => {
	try {
		Tweet.deleteOne({ _id: req.body.id })
	} catch (e) {
		console.log(e)
		res.send(e)
	}
}

module.exports = {
	getTweets,
	createTweet,
	likeTweet,
	getMyTweets,
	deleteTweet,
}
