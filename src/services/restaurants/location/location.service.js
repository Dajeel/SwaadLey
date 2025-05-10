import camelize from "camelize";

export const locationRequest = (searchTerm) => {
  return fetch(
    `https://geocode-jgnc7743uq-uc.a.run.app?city=${searchTerm}`
  ).then((res) => {
    console.log(res);
    return res.json();
  });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
