module.exports.payRequest = (request, response, stripeClient) => {
  const { token, amount } = request.body;
  console.log("Received token:", token);
  console.log("Received amount:", amount);

  stripeClient.paymentIntents
    .create({
      amount,
      currency: "USD",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token,
        },
      },
      confirm: true,
    })
    .then((paymentIntent) => {
      console.log("Payment Intent:", paymentIntent);
      response.json(paymentIntent);
    })
    .catch((e) => {
      console.error("Stripe error:", e);
      response.status(400).send({ error: e.message });
    });
};
