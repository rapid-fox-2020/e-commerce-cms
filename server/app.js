require('dotenv').config()
const express = require(`express`)
const routes = require(`./routes`)
const cors = require(`cors`)
const errorHandler = require(`./middlewares/errHandler`)
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`We are open now at ${port}`)
})

module.exports = app