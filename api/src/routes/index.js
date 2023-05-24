const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require ('./videogame.js');
const videogame = require ('./gamedetails.js');
const genres = require ('./genres.js');
const platforms= require ('./platforms');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogames)
router.use('/genres', genres)
router.use('/platforms', platforms)
router.use('/videogame', videogame)


module.exports = router;
