const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Douglass Boshkoff'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Douglass Boshkoff'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Douglass Boshkoff',
    help_message: 'You should see some help text here.'
  });
})

app.get('/weather', (req, res) => {
  const { query } = req;

  if (!query.address) {
    return res.send({
      errors: [
        'You must provide an address in the query string.'
      ]
    });
  }


  geocode(query.address, (err, { lat, long, location } = {}) => {
    if (err) {
      return res.send({
        errors: [err]
      })
    }

    forecast(lat, long, (err, forecast) => {
      if (err) {
        return res.send({
          errors: [err]
        })
      }

      res.send({
        forecast,
        location,
        address: query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  const { query } = req;
  if (!query.search) {
    return res.send({
      error: 'You must provide a search term.'
    });
  }
  res.send({
    products: []
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Help article not found.',
    name: 'Douglass Boshkoff'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'Page not found.',
    name: 'Douglass Boshkoff'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});