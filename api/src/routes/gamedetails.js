const router = require('express').Router();
const { simplificarDatosJuego, getGames } = require('../../func.js');
const { Platform , Videogame, Genre } = require('../db.js');
const { conn } = require('../db.js');
require('dotenv').config();
const { key } = process.env;

  ///DETALLES
  router.get('/:idVideogame',async function(req, res){

    if(!req.params.idVideogame){return res.status(200).send("Juego no encontrado")}

    if(req.params.idVideogame.includes("-")){
      let result = await Videogame.findOne({
        where: { id: req.params.idVideogame },
        include: [{ model: Platform },{ model: Genre }],
      });
      if(result){
        return res.status(200).send(simplificarDatosJuego(result.dataValues))
      }else{
        return res.status(200).send("Juego no encontrado")
      };
    }else{
      let json = await getGames(`https://api.rawg.io/api/games/${req.params.idVideogame}?key=${key}`);
      if(json){
        return res.status(200).send(simplificarDatosJuego(json))
      }else{
        return res.status(200).send("Juego no encontrado")
      };
    }
  });

  ///AÑADIR


  router.post('/',async function(req, res){
    let game = req.body;
    try {
      const newGame = await Videogame.create({
      name: game.name,
      description: game.description,
      released: game.released.length && game.released,
      rating: game.rating,
    })

    game.genres.forEach(async function(element){
      let genero = await Genre.findOne({
        where: { name: element },
      });
      await newGame.addGenre(genero);
    });

    game.platforms.forEach(async function(element){
      let platf = await Platform.findOne({
        where: { name: element },
      });
      await newGame.addPlatform(platf);
    });
    
    return res.status(200).json(game)
    } catch (error) {
      return res.status(400).json({
        mensajeError: error.message
      })
    }
    
  })

module.exports = router;