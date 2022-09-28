const request = require('request')


const forecast = (latitude ,longitude, callback) => {
  const weatherstackKey = '0926df064798d183c9b611305b3d6cc6'
  const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${latitude},${longitude}`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      const currentEccess = body.current;
      const weather_descriptions = currentEccess.weather_descriptions[0];
      const temperature = currentEccess.temperature;
      const feelslike = currentEccess.feelslike;
      // const location_name = body.location.name;
      // const location_country = body.location.country;

      callback(undefined,
        `${weather_descriptions}. The temperature is: ${temperature} ℃, but feels like: ${feelslike} ℃`
        // weather_descriptions,
        // temperature,
        // feelslike,
        // location_name,
        // location_country
      )
    }
  })
}

module.exports = forecast
