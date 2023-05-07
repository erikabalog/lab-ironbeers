const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromPunkApi => { // PunkAPI returns an array with the beers in the data files
    res.render('beers', { beers: beersFromPunkApi }); // then we render the beers page and pass it the array, so the page can render the list of beers contained in the array
  })
  .catch((error) => {
    console.log(error);
  });
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(randomBeerArray => {
    res.render('random-beer', {beer: randomBeerArray[0]});
  })
  .catch((error) => {
    console.log(error);
  });
}) 

app.get('/beers/:id', function(req, res) {
  const beerId = req.params.id;
  // find the beer with the given id from your array or database
  const myBeer = punkAPI.getBeer(beerId);
  // and render the beer detail page with the beer object
  res.render('beer-detail', { beer: myBeer[0]});
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));

