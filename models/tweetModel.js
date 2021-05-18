// isiimportuojame mongoose
const mongoose = require('mongoose')

// Schema tai galima prilygint sablonui. Pasakome duombazei, koki objekta noresime saugoti ir kokie yra objekto fieldu (content) tipai (String)
const tweetSchema = new mongoose.Schema({
	content: {
		// nustatome tipa (string, number, arrau etc..)
		type: String,
		// pasakome kad fieldas yra privalomas norint issaugoti objekta duombazeje
		required: true,
	},
	likesCount: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		// jeigu saugome objekta ir nenustatome reiksmes, i duombaze isiraso default reiksme
		default: Date.now,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	userImg: {
		type: String,
	},
})

// nustatome kokiam collection priklauso schema
const Tweet = mongoose.model('Tweets', tweetSchema)

module.exports = Tweet
