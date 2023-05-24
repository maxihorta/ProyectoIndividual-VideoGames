const router = require('express').Router();
const { conn } = require('../db.js');
const { Genre } = require('../db.js');
const { ordenarArreglo } = require('../../func.js');

router.get('/',async function(req, res){
    let generos = await Genre.findAll();
    generos = generos.map(el => el.name)
    generos = ordenarArreglo(generos,"name");
    res.send(generos)
});

module.exports = router;