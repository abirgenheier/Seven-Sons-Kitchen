const path = require('path')
const passport = require('passport')

module.exports = app => {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
    app.get("/dashboard.html", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/dashboard.html"))
    })
    app.get('/google', passport.authenticate('google', { scope: ['profile'] }))
    app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
        (req, res) => {
            res.redirect('/dashboard.html')
        })
}