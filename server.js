const express = require('express')
const helmet = require('helmet')
const db = require('./app/models')

const app = express()
app.use(helmet())
app.use(express.urlencoded(
    { extended: true }
))
app.use(express.json())

app.use(express.static("./app/public"))

require("./app/routes/db-routes")(app)
require("./app/routes/html-routes")(app)

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log('APP LISTENING ON PORT' + PORT)
    })
})
