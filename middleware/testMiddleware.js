// Middleware - tarpine funckija, tarp uzklausos ir galutinio respone (atsakymo)

// req - lygiai toks pat kaip ir anose funkcijose (request), res irgi (response)
// next() - paleidzia sekancia funkcija
// galima modifikuoti req.body
// galima sukurti naujus field'us req objekte
// galima nutraukti funkciju seka, parasant return ir norima atsakyma front endui (req.status(400).send('error'))

const testMiddleware = (req, res, next) => {
  console.log('Logging from middleware')
  req.middlewareTest = "Custom field from middleware"
  next()
}

module.exports = {
  testMiddleware
}