const router = require('express').Router();
const { conn } = require('../db.js');
const { Platform } = require('../db.js');
const { ordenarArreglo } = require('../../func.js');

router.get('/',async function(req, res){
    let p = await Platform.findAll();
    p = p.map(el => el.name)
    p = ordenarArreglo(p,"name");
    res.send(p)
});

module.exports = router;