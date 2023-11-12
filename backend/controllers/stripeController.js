const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
const {createOrder} = require("./orderController")

const stripePayment = async (req, res) => {
  try {
    let customer = await stripe.customers.create({
      metadata: {
        userId: req.user.id,
        cart: JSON.stringify(req.body)
      }
    })
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
      shipping_address_collection: {
        allowed_countries: ['GR', 'CY'],
      },
      customer: customer.id,
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

const endpointSecret = process.env.ENDPOINT_SECRET;

const stripeWebHook = (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    stripe.customers.retrieve(req.body.data.object.customer).then((customer) => {
      console.log(customer, "dddd");
      console.log(req.body.data.object, "aaaa");
      createOrder(customer, req.body.data.object);
    }). catch(error => console.log(error))
  }
  
  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

module.exports = { stripePayment, stripeWebHook };
