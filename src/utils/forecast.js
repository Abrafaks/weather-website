const request = require("postman-request");

const forecast = (latitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=980d03d2dcc454ccb38446495da3464d&query=" +
    latitude +
    "," +
    longtitude +
    "&units=f";

  // console.log(url);

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find location." + error, undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        location: body.location,
      });
    }
  });
};
module.exports = forecast;
