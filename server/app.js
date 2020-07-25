require(`dotenv`).config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routers = require(`./routers`)
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routers)

app.listen(3000, () => {
    console.log(`app listening on ${PORT}`)
})

module.exports = app