const request = require('request');


forecast = (lat, long, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=6b41bba60fd56e1d44cef1c047713e78&query=${lat},${long}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect to weather service.');
    }
    else if (body.error) {
      cb('Unable to find location.');
    }
    else {
      const { current } = body;
      const { temperature, precip, weather_descriptions } = current;
      cb(undefined, `Right now, it's ${weather_descriptions[0].toLowerCase()}. It is ${temperature} degrees out. There is a ${precip} percent chance of rain.`);
    }
  });
}

module.exports = forecast;