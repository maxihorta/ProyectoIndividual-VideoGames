const { default: axios } = require("axios");

 const simplificarDatosJuego = function(result){
    let obj = {
        name: result.name,
        released: result.released,
        genres: [],
        background_image: result.background_image,
        rating: result.rating,
        description: result.description,
        platforms:  [],
        id: result.id,
      }
      if(result.platforms){
        obj.platforms = result.platforms;
      }
      if(result.genres){
        obj.genres = result.genres.map(genero => genero.name)
      }
      if(obj.platforms[0] && obj.platforms[0].platform){
        obj.platforms = result.platforms.map(p => p.platform.name)
      }else{
        if(result.platforms){obj.platforms = result.platforms.map(p => p.name)}
      }

    return obj;
 }

 const ordenarArreglo = function(arr,propiedad,orden = "asc"){
     if(!arr.length){return arr}
     let rta = arr;
     switch(orden){
         case "asc":
            rta.sort(function (a, b) {
                if (a[propiedad] > b[propiedad]) {
                return 1;
                }
                if (a[propiedad] < b[propiedad]) {
                return -1;
                }
                return 0;
            });
            break;
         case "desc":
            rta.sort(function (a, b) {
                if (a[propiedad] < b[propiedad]) {
                return 1;
                }
                if (a[propiedad] > b[propiedad]) {
                return -1;
                }
                return 0;
            });
            break;
     }
     return rta;
 }

  const getGames = async function(url){
    const rta = await axios.get(url);
    return rta.data;
 }

 module.exports = {
     simplificarDatosJuego,
     ordenarArreglo,
     getGames,
 }