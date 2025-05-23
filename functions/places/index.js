const url = require("url");
const { mocks, addMockImage } = require("./mock");

const addGoogleImage = (restaurant, googleApiKey) => {
  const ref = restaurant.photos?.[0]?.photo_reference;

  restaurant.photos = [
    ref
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${googleApiKey}`
      : "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
  ];

  return restaurant;
};

module.exports.placesRequest = (request, response, client, googleApiKey) => {
  const { location, mock } = url.parse(request.url, true).query;

  if (mock === "true") {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImage);
    }
    return response.json(data);
  }

  client
    .placesNearby({
      params: {
        location,
        radius: 1500,
        type: "restaurant",
        key: googleApiKey,
      },
      timeout: 1000,
    })
    .then((res) => {
      res.data.results = (res.data.results || []).map((r) =>
        addGoogleImage(r, googleApiKey)
      );
      return response.json(res.data);
    })
    .catch((e) => {
      console.error("Google Places API error:", e.response?.data || e.message);
      response.status(400);
      return response.send(e.response?.data?.error_message || "Unknown error");
    });
};
