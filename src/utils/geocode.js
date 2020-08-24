const request = require('request');

const geocode = (address, callback) => {
  const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiZGJvc2hrb2ZmIiwiYSI6ImNrY3l5YmJ0OTBlaHgyeW15enhodWJ4cGsifQ.1Y5Mab4aGBUrlQofDQZ1wA`
  request({ url: mapBoxUrl, json: true }, (error, { body }) => {
    if (error) {
      console.log(error);
      callback('Unable to connect to location services.');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search');
    } else {
      const { features } = body;
      const [long, lat] = features[0].center
      callback(undefined, {
        lat,
        long,
        location: features[0].place_name
      });
    }
  })
};

module.exports = geocode;