const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWJyYWZha3MiLCJhIjoiY2twejlyMHVpMGY4ajJvanNuc2hzb3lreiJ9.TlLCScROoH8v4eyLqYCpQA&limit=1";

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to connect to location service.", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
