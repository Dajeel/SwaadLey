const url = require("url");

module.exports.geocodeRequest = (request, response, client, googleApiKey) => {
  const { city, mock } = url.parse(request.url, true).query;
  if (mock === "true") {
    const { locations: locationsMock } = require("./geocode.mock");
    const locationMock = locationsMock[city.toLowerCase()];
    return response.json(locationMock);
  }

  client
    .geocode({
      params: {
        address: city,
        key: googleApiKey,
      },
      timeout: 1000,
    })
    .then((res) => {
      return response.json(res.data);
    })
    .catch((e) => {
      response.status(400);
      return response.send(e.response?.data?.error_message || "Unknown error");
    });
};
