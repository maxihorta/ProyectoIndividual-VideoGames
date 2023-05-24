import React , { useState , useEffect} from 'react';
import { connect } from "react-redux";
import { getGames , getGenres} from "../../actions/index";
import Game from '../game/game';
import { Link } from 'react-router-dom';
import './games.css';

export function Games(props) {
  const [games, setGames] = useState({
    games: [],
    page: [],
  });
  const [input, setInput] = useState({
    search: '',
    filter: '0',
    order: 'asc',
    param: 'name',
    genderfilter: "false",
    page: 1,
  });

  useEffect(() => {
   
    props.getGames();
    props.getGenres();
  
  }, []);

  useEffect(() => {
    if(props.games){
      setGames({
        ...games,
        games: ordenarArreglo(props.games,input.param,input.order),
      })
    }
 
  }, [props.games]);

  useEffect(() => {
    if(props.games){
      setGames({
        ...games,
        page: games.games.slice((input.page * 15) - 15,(input.page * 15))
      })
    }
  
  }, [input.page,games.games]);

  const ordenarArreglo = function(arr,propiedad,orden = "asc"){
    if(!arr.length){return arr}
    let rta = arr;
    switch(orden){
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
      default:
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
    }
    return rta;
}

  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const aplicarFiltros = function(){

    let juegosfiltrados;
    juegosfiltrados = ordenarArreglo(props.games,input.param,input.order);

    if(input.filter !== '0'){
      if(input.filter === '1'){
        juegosfiltrados = juegosfiltrados.filter((game) => (typeof game.id === "number"))
      }else{
        juegosfiltrados = juegosfiltrados.filter((game) => (typeof game.id === "string"))
      }
    }

    if(input.search.length){
      juegosfiltrados = [...juegosfiltrados.filter(el => el.name.toLowerCase().includes(input.search.toLowerCase()))]
    }

    if(input.genderfilter !== "false"){
      juegosfiltrados = [...juegosfiltrados.filter(el => el.genres.includes(input.genderfilter))]
    }

    games.games = juegosfiltrados;
    
    setInput({
      ...input,
      page: 1,
    })

    setGames({
      ...games,
      page: games.games.slice((input.page * 15) - 15,(input.page * 15))
    })
  }

  function handlePrev(event) {
    event.preventDefault();
    if (input.page > 1) {
      setInput({
        ...input,
        page: input.page - 1,
      })
    }
  }

  function handleNext(event) {
    event.preventDefault();
    setInput({
      ...input,
      page: input.page + 1,
    })
  }

  return (
    <div className="container" >
      <div className="filtros">
        <label >Nombre: </label>
        <div id="buscador">
          <input name="search" value={input.search} onChange={handleInputChange} type="text" placeholder="Buscar..."/>
        </div>

        <label >Orden: </label>
          <select name="order" id="order" onChange={handleInputChange}>
              <option value="asc"> A-Zㅤㅤㅤ🡅</option>
              <option value="desc">Z-Aㅤㅤㅤ🡇</option>
          </select>

        <label >  Filtrar Por: </label>
          <select name="filter" id="filter" onChange={handleInputChange}>
              <option value="0">Todos</option>
              <option value="1">Originales</option>
              <option value="2">Agregados</option>
          </select>
         
        <label >  Genero: </label>
          <select name="genderfilter" id="genderfilter" onChange={handleInputChange}>
              <option value="false">--Genero--</option>
              {
                props.genres && props.genres.map(genre =>(
                  <option key={genre} value={genre}>{genre}</option>
                ))
              }
          </select>

        <label >  Ordenar Por: </label>
          <select name="param" id="param" onChange={handleInputChange}>
              <option value="name">Nombre</option>
              <option value="rating">Rango</option>
          </select>
          <br/>
        {!props.games ? (<button className="applyB" hidden>Aplicar</button>) : (<button className="applyB" onClick={aplicarFiltros}>Aplicar</button>)}
        
      </div>
      <div className="gameList">

        <div className="paginado">
          {games.page && input.page > 1 &&<button className="apply" onClick={handlePrev}> Anterior</button>}
          <button className='pagina'>  {"Pagina   "+ input.page  }  </button>
          {games.page && (games.games.slice(((input.page + 1 ) * 15) - 15,((input.page + 1) * 15)).length > 1) && <button className="apply" onClick={handleNext}>Siguiente</button>}
        </div>

        <div className='cards'>
        {
          !props.games ? ( 
              <div id="loadContainer">
                
                <div className="loader">
    <svg viewBox="0 0 80 80">
        <circle id="test" cx="40" cy="40" r="32"></circle>
    </svg>
</div>

<div className="loader triangle">
    <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72"></polygon>
    </svg>
</div>

<div className="loader">
    <svg viewBox="0 0 80 80">
        <rect x="8" y="8" width="64" height="64"></rect>
    </svg>
</div>
                </div>
            ) : (
              games.page.length ? <div className='containCards'> {(
                games.page.map(game =>
                  <Link className="link" key={game.id} to={`/games/${game.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <Game game={game} />
                  </Link >
                )
              )}</div> : (
                <h2>Juego no encontrado.</h2>
              )
            )
        }
        </div>

      </div>
    </div>
  )
};

function mapStateToProps(state) {
  return {
    games: state.games,
    genres: state.genres,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //getGames: (el) => dispatch(getGames(...el)),
    getGames: () => dispatch(getGames()),
    getGenres: () => dispatch(getGenres()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Games);