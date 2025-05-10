import camelize from "camelize";

export const restaurantsRequest = (location) => {
  return fetch(
    `https://placesnearby-jgnc7743uq-uc.a.run.app?location=${location}`
  ).then((res) => {
    console.log("API response:", res); // Log the raw response to inspect it
    if (!res.ok) {
      throw new Error("Failed to fetch restaurants. Server returned an error.");
    }
    return res.json();
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResults);
};
