// IMPORT DEPENDENCIES
import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import swal from "sweetalert";
// IMPORT CONSTANTS
import STRIPE_PUBLISHABLE from "../../constants/stripe";
import PAYMENT_SERVER_URL from "../../constants/server";

const CURRENCY = "USD";

const fromDollarToCent = amount => amount * 100;

const successPayment = data => {
    swal("GG WP!", "Your donation has been received. Thank you!", "success");
};

const errorPayment = data => {
    swal("Uh oh!", "There's been an error processing your donation.", "error");
};

const onToken = (amount, description) => token =>
    axios
        .post(PAYMENT_SERVER_URL, {
            description,
            source: token.id,
            currency: CURRENCY,
            amount: fromDollarToCent(amount)
        })
        .then(successPayment)
        .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
    <StripeCheckout
        name={name}
        description={description}
        amount={fromDollarToCent(amount)}
        token={onToken(amount, description)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
    />
);

export default Checkout;
