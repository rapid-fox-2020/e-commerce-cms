require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const routes = require("./routes")
const errorHandler = require("./middlewares/errorHandling.js")


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(routes)

app.use(errorHandler)
// app.listen(port,()=>{
//   console.log(`Listening to port ${port}`)
// })

module.exports = app
