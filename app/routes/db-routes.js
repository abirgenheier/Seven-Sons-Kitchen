var db = require("../models")

module.exports = app => {
    app.post("/api/user", (req, res) => {
        db.User.create(req.body).then(results => {
            res.json(results)
        })
    })
    app.post("/api/user/order", (req, res) => {
        db.Orders.create(req.body).then(results => {
            res.json(results)
            console.log(req.body)
        })
    })
    app.post("/api/user/review", (req, res) => {
        db.Reviews.create(req.body).then(results => {
            res.json(results)
        })
    })
    app.get("/api/user/review/:user", (req, res) => {
        db.Reviews.findOne({
            where: {
                user: req.params.user
            }
        }).then(response => {
            res.json(response)
        })
    })
    app.delete("/api/user/review/delete/:id", (req, res) => {
        db.Reviews.findOne({
            where: {
                id: req.params.id
            }
        }).then(results => {
            res.json(results)
        })
    })
} 