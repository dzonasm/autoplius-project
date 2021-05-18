const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Session = require('../models/sessionModel')

const authenticate = async (req, res, next) => {
  try {
    // pasiemam session token per requesto headeri
    let token = req.headers['twitterauth']
    // patikrinam ar tokenas yra validus
    let decoded = jwt.verify(token, process.env.JWT_PASSWORD)
    // patikrinam ar sesija yra dar aktyvi
    let session = await Session.findOne({
      sessionToken: token
    })
    if (!session) throw 'Error'
    // patikrinam ar egzistuoja toks useris
    let user = await User.findOne({
      _id: decoded.id
    })
    if (!user) throw 'Error'
    //siunciam userio objekta i kita funkcija
    req.user = user
    req.sessionToken = session
    next()
  } catch (e) {
    res.status(401).send({
      message: 'You are not authorized'
    })
  }
}

module.exports = {
  authenticate
}