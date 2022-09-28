const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ofek Shitrit'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Ofek Shitrit'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    example: 'From a hbs file named help ',
    title: 'Help',
    name: 'Ofek Shitrit'
  })
})

app.get('/weather', (req, res) => {
  address = req.query.address

  if (!address) {
    return res.send({
      error: 'Please provide an Adress'
    })
  }

  geocode(address , (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        location,
        forcast: forcastData,
        address
      })
    })
  })
})



app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Please provide a search term'
    })
  }

  console.log(req.query);
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found.',
    name: 'Ofek Shitrit',
    title: '404'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found.',
    name: 'Ofek Shitrit',
    title: '404'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
})
