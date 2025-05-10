import createStripe from "stripe-client";

const stripe = createStripe(
  "pk_test_51RJX83PZJfcjY8UsvRRYBBLLwrDM1Pez5rIXdreSQBjNTXgEJWk6LyV1PhuWJOc8B3shVu7XKH6PzGc1mqIPFswW00NcZgYodJ"
);

const host = "https://pay-jgnc7743uq-uc.a.run.app";

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
  return fetch(`${host}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("Something went wrong processing your payment");
    }
    return res.json();
  });
};
