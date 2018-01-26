const stripe = require("../constants/stripe");

const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).send({ error: stripeErr });
    } else {
        res.status(200).send({ success: stripeRes });
    }
};

const paymentApi = app => {
    app.get("/api/donate", (req, res) => {
        console.log("donating");
        res.send({
            message: "Hello Stripe checkout server!",
            timestamp: new Date().toISOString()
        });
    });

    app.post("/api/donate", (req, res) => {
        stripe.charges.create(req.body, postStripeCharge(res));
    });

    return app;
};

module.exports = paymentApi;
