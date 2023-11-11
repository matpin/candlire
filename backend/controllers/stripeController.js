const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);

const stripePayment = async (req, res) => {
  try {
    let line_items = req.body.map((p) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: p.productName,
          },
          unit_amount: p.productPrice * 100,
        },
        quantity: p.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout_success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    res.send({ url: session.url, success_url: session.success_url, cancel_url: session.cancel_url });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { stripePayment };
