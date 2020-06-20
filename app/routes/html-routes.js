const path = require('path')

module.exports = app => {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
    app.get('/google', passport.authenticate('google', { scope: ['profile'] }))
    app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
        (req, res) => {
            res.redirect('/')
        })
}