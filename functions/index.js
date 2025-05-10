const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { Client } = require("@googlemaps/google-maps-services-js");
const stripeInit = require("stripe");

// Define secrets
const GOOGLE_KEY = defineSecret("GOOGLE_KEY");
const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");

// Import request handlers
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");
const { payRequest } = require("./pay");

// Initialize clients
const googleClient = new Client({});

// Function: Geocode
exports.geocode = onRequest({ secrets: [GOOGLE_KEY] }, (req, res) => {
  const googleApiKey = process.env.GOOGLE_KEY;
  geocodeRequest(req, res, googleClient, googleApiKey);
});

// Function: Places Nearby
exports.placesNearby = onRequest({ secrets: [GOOGLE_KEY] }, (req, res) => {
  const googleApiKey = process.env.GOOGLE_KEY;
  placesRequest(req, res, googleClient, googleApiKey);
});

// Function: Stripe Payment
exports.pay = onRequest({ secrets: [STRIPE_SECRET_KEY] }, (req, res) => {
  const stripeClient = stripeInit(process.env.STRIPE_SECRET_KEY);
  payRequest(req, res, stripeClient);
});
