require('dotenv').config()

const express = require('express')
// body parser leidzia duomenis gauti ir siusti json formatu
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/routes')


const corsOptions = {
	allowedHeaders: ['userauth', 'Content-Type'],
	exposedHeaders: ['userauth'],
}

mongoose.connect('mongodb://localhost/autoPlius', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => console.log('Logged into database'))

const app = express()
// cors leidzia visiems kreiptis i serveri, bei nustatyti custom headers
app.use(cors(corsOptions))
// app.use suveikia pries visas kitas zemiau aprasytas funkcijas
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
)

app.use(
	bodyParser.json({
		limit: '50mb',
	}),
)

app.use('/uploads', express.static('uploads'))
// norint pasiekti router turim kreiptis i localhost:3000/api/v1
app.use('/api/v1', router)


// requestas - kreipimasis i serveri, norint gaut ar issiust data
// get - requesto metodas
// '/' - requesto url
// (req, res) - req (request), res (response)
// res.send('') siunciam atgal i browseri stringa

// app.get('/', (req, res) => {
//   res.send('Hello from api!')
// })

// gali buti tas pats request url, bet skirtingos funkcijos
// app.post('/', (req, res) => {
//   let {
//     body
//   } = req
//   console.log(body)
//   res.send(`My name is ${body.name}`)
// })

// listen - pakurti serveri
// 3000 - portas

//https://twitter.lt:3000

app.listen(3000)
