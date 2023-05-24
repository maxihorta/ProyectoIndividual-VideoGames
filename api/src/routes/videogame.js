const router = require('express').Router();
const { simplificarDatosJuego , ordenarArreglo , getGames } = require('../../func.js');
const { Platform , Videogame, Genre } = require('../db.js');
const { conn } = require('../db.js');
require('dotenv').config();
const { key } = process.env;

router.get('/', async function(req, res){

    let rta = []

        let pr1 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}`))
        let pr2 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=2`)) 
        let pr3 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=3`)) 
        let pr4 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=4`)) 
        let pr5 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=5`)) 
        let pr6 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=6`)) 
        let pr7 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=7`)) 

        let prom = await Promise.all([pr1,pr2,pr3,pr4,pr5,pr6,pr7])

        let json = [];
        
        prom.forEach((j) => {
             json = [ ...json, ...j.results]
        })
        
        rta = [ ...rta, ...json.map(game => simplificarDatosJuego(game))]
        let db = await Videogame.findAll({
             include: [{ model: Platform },{ model: Genre }],
         });
        db.forEach(element => {
             rta.push(simplificarDatosJuego(element))
         });
         
    res.send(rta);
});

module.exports = router;