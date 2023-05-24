require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { platform } = require('os');
const { getGames } = require('../func.js');
const {
  DB_USER, DB_PASSWORD, DB_HOST,key,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame , Genre , Platform } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Videogame.belongsToMany(Genre, { through: 'VideoGame_Genre' });
Genre.belongsToMany(Videogame, { through: 'VideoGame_Genre' });

Platform.belongsToMany(Videogame, { through: 'VideoGame_Platform' });
Videogame.belongsToMany(Platform, { through: 'VideoGame_Platform' });




const cargar_db = async function(){
  let json = await getGames(`https://api.rawg.io/api/genres?key=${key}`);
  let pr1 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}`))
  let pr2 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=2`)) 
  let pr3 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=3`)) 
  let pr4 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=4`)) 
  let pr5 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=5`)) 
  let pr6 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=6`)) 
  let pr7 = Promise.resolve(getGames(`https://api.rawg.io/api/games?key=${key}&page=7`)) 
  

  let prom = await Promise.all([pr1,pr2,pr3,pr4,pr5,pr6,pr7])

  let json2 = [];
        
  prom.forEach((j) => {
    json2 = [ ...json2, ...j.results]
  })

  let generos = [];
  let plataformas = [];


  json.results.forEach(element => {
    if(!generos.includes(element.name)){generos.push(element.name)}
  });
  json2.forEach(element => {
    element.platforms.forEach(p => {
      if(!plataformas.includes(p.platform.name)){plataformas.push(p.platform.name)}
    })
  });

  generos.forEach(async function(el){ await Genre.create({ name: el}) });
  plataformas.forEach(async function(el){ await Platform.create({ name: el}) });
}();


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
