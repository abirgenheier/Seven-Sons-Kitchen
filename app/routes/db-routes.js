require("dotenv").config();
const db = require("../models")

const Nexmo = require("nexmo")
const nexmo = new Nexmo({
    apiKey: process.env.APIKEY,
    apiSecret: process.env.SECRET
}, { debug: true })

module.exports = app => {
    // Sends Txt
    app.post("/", (req, res) => {
        res.send(req.body);
        const number = req.body.number;
        const message = `Hi ${req.body.name}, thank you for choosing Seven Son's Kitchen today! If there are any questions, please call (253)-555-5555`;

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
    // Returns only current orders
    app.get('/all_current_orders', (req, res) => {
        db.Orders.findAll({ where: { complete: 0 } }).then(response => {
            res.json(response)
            res.send(response)
            console.log(response)
        })
    })
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
    app.put("/api/order_update/:id", (req, res) => {
        var _id = req.params.id
        var _complete = req.body.complete
        console.log(_complete)
        db.Orders.update(req.body, {
            where: {
                id: _id
            }
        }).then(results => {
            console.log(results)
            res.json(results)
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