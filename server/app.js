const { Router } = require('express')

require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

if (process.env.NODE_ENV !== "test"){
    app.listen(port, () => {
        console.log(`Running on PORT: ${port}`)
    })
}

module.exports = app