require("dotenv").config();
const db = require("../models")
const Nexmo = require("nexmo")
const nexmo = new Nexmo({
    apiKey: process.env.APIKEY,
    apiSecret: process.env.SECRET
}, { debug: true })

console.log(process.env.APIKEY)

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
    app.post("/", (req, res) => {
        res.send(req.body);
        const number = req.body.number;
        const message = req.body.text;

        nexmo.message.sendSms(
            "14256209722", number, message, { type: "unicode" }, (error, responseData) => {
                if (error) {
                    console.log(error)
                } else {
                    console.dir(responseData)
                }
            }
        )
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