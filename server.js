require('dotenv').config();
const express = require('express')
const helmet = require('helmet')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const db = require('./app/models')

const app = express()

app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT || 8080


app.use(helmet())
app.use(express.urlencoded(
    { extended: true }
))
app.use(express.json())

app.use(express.static("./app/public"))

require("./app/routes/db-routes")(app)
require("./app/routes/html-routes")(app)

passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:8080/google/callback"
},
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile)
    }))

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log('APP LISTENING ON PORT' + PORT)
    })
})
