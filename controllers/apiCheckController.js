 const checkApi = (req, res) => {
   res.send({
     message: 'Api is working'
   })
 }

 const checkPostApi = (req, res) => {
   res.send({
     message: `Sent test field with value - ${req.body.test}. ${req.middlewareTest}`
   })
 }

 module.exports = {
   checkApi,
   checkPostApi
 }