const request = require('request')

const geocode = (address, callback) => {
  const mapBoxKey = 'pk.eyJ1Ijoib2Zla3R1cGUiLCJhIjoiY2t6NzA0d3V2MHl0dDJvdXNjd3dpNnZxciJ9.DlAJJaT1Yidcuo3WphvrXw'
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapBoxKey}&limit=1`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location! Try a different search', undefined)
    } else {
      const currentEccess = body.features[0];
      const longitude = currentEccess.center[0];
      const latitude = currentEccess.center[1];
      const location = currentEccess.place_name
      callback(undefined, {
        location,
        longitude,
        latitude
      })
    }
  })
}

module.exports = geocode
