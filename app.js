const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const {success} = require('./helper.js');
let pokemons = require('./mock-pokemon.js');

const app = express();
const port = 3000;


//creating a middleware to log the url
/*$app.use((req, res, next) => {
    console.log(`URL: ${req.url}`);
    next();
});*/

//using already made middleware morgan to log the url
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'));
    

//endpoint for the root
app.get('/', (req, res) => res.send('Hello Express 2!'));

//endpoint for a pokemon name from the url
app.get('/api/pokemons/:id', (req, res) => {
    const urlId = parseInt(req.params.id,10);
    const pokemon = pokemons.find(pokemon => pokemon.id === urlId);
    const message = "We find the pokemon you are looking for";
    res.json(success(message,pokemon));
});

//endpoint to display the total number of pokemons
app.get('/api/pokemons', (req, res) => {
    const message = "Here we got all the pokemons";
    res.json(success(message,pokemons));
});



app.listen(port, () => console.log(`App runnin on : http://localhost:${port}!`));


