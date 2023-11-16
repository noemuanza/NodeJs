const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const {success,getUniqueId} = require('./helper.js');
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
    .use(morgan('dev'))
    .use(bodyParser.json());



//endpoint for the root
app.get('/', (req, res) => res.send('Hello Express 2!'));



//endpoint to display the total number of pokemons
app.get('/api/pokemons', (req, res) => {
    const message = "Here we got all the pokemons";
    res.json(success(message,pokemons));
});


//endpoint for a pokemon name from the url
app.get('/api/pokemons/:id', (req, res) => {
    const urlId = parseInt(req.params.id,10);
    const pokemon = pokemons.find(pokemon => pokemon.id === urlId);
    const message = "We find the pokemon you are looking for";
    res.json(success(message,pokemon));
});

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);
    const createdPokemon = {
        //we put the body of the request in the json format
        ...req.body,
        ...{
            id: id,
            created: new Date()
        }
    }
    pokemons.push(createdPokemon);
    const message = `The pokemon ${createdPokemon.name} has been created with success`;
    res.json(success(message, createdPokemon));
});

//endpoint to update a pokemon
app.put('/api/pokemons/:id', (req, res) => {
    const urlId = parseInt(req.params.id);
    const updatedPokemon = {...req.body,id : urlId};
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === urlId ? updatedPokemon : pokemon;
    });
    const message = `The pokemon ${updatedPokemon.name} has been updated with success`;
    res.json(success(message, updatedPokemon));
});


//endpoint to delete a pokemon
app.delete('/api/pokemons/:id', (req, res) => {
    const urlId = parseInt(req.params.id);
    pokemons = pokemons.filter(pokemon => pokemon.id !== urlId);
    const message = `The pokemon with the id ${urlId} has been deleted with success`;
    res.json(success(message, pokemons));
});




app.listen(port, () => console.log(`App runnin on : http://localhost:${port}!`));


