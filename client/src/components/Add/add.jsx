import './add.css';
import { connect } from "react-redux";
import { getGenres , getPlatforms } from "../../actions/index";
import axios from 'axios';
import React ,{ useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

export function Add(props) {
  const [finish, setFinish] = useState(false);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    description: '',
    released: '',
    rating: '',
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    props.getGenres();
    props.getPlatforms();
  }, []);

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Nombre Requerido!';
    }

    if (!input.description) {
      errors.description = 'Descripcion vacia!';
    }

    if (!input.released) {
      errors.released = 'Fecha de lanzamiento requerido!';
    }

    if (!input.genres.length) {
      errors.genres = 'Genero requerido!';
    }

    if (!input.platforms.length) {
      errors.platforms = 'Plataforma requerida!';
    }

    if (!input.rating) {
      errors.rating = 'Clasificacion requerida!';
    } else if(input.rating > 5 || input.rating < 0){
        errors.rating = 'La clasificacion tiene que ser un numero entre el 1 y el 5';
    }
    return errors;
  };

    const handleInputChange = function(e) {
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }));
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
    }

    const handleInputChangePlatforms = function(e) {
      
      if(e.target.checked){
        input.platforms = [...input.platforms,e.target.name];
      }else{
        input.platforms = input.platforms.filter((platform) => platform !== e.target.name)
      }
      setErrors(validate(input));
    }

    const handleInputChangeGenres = function(e) {
      if(e.target.checked){
        input.genres = [...input.genres,e.target.name];
      }else{
        input.genres = input.genres.filter((genre) => genre !== e.target.name)
      }
      setErrors(validate(input));
    }

    const inputSubmit = function(e){
      e.preventDefault();
      setErrors(validate(input));
      if(errors.name || errors.description || errors.rating || errors.released || errors.platforms || errors.genres || !input.name.length){
        console.log("Form Incomplete!!")
      }else{
        axios.post("http://localhost:3001/videogame",input);
        setFinish(true);
      }
    }

    return (
      <div className='add'>{
        !finish ? (<div>{
          (!props.genres || !props.platforms) || (!props.genres[0] || !props.platforms[0]) ? (<div id="loadContainer"><div className="preloader"></div></div>) :(
          <form onSubmit={inputSubmit}>
            <h1>Agregar juego</h1>
            <div className="inputDiv">{errors.name && (<p className="danger">{errors.name}</p>)}
              <label>Nombre: </label>
              <input className={errors.name && 'dangera'} onChange={handleInputChange} name="name" value={input.name}></input>
              
            </div>
            <div className="inputDiv" >{errors.description && (<p className="danger">{errors.description}</p>)}
            <label>Descripcion: </label>
              <input className={errors.description && 'dangera'} onChange={handleInputChange} name="description" value={input.description} type="text" id="descr"></input>
              
            </div>
            <div className='data'>
              <div className="inputDiv">{errors.released && (<p className="danger">{errors.released}</p>)}
            <label>Fecha de lanzamiento: </label>
              <input className={errors.released && 'dangera'} onChange={handleInputChange} name="released" value={input.released} id="reldate" type="date"></input>
              
            </div>
            <div className="inputDiv">
              <label>Clasificacion: </label>
              <input className={errors.rating && 'dangera'} onChange={handleInputChange} placeholder="1-5" name="rating" value={input.rating} type='number' min="0" max="5"></input>
              {errors.rating && (<p className="danger">{errors.rating}</p>)}
            </div></div>
            <hr hidden/>
            <div id="checkboxs">
              <div>
               
                <h4>Elige el genero del juego: </h4>  {errors.genres && (<p className="danger">{errors.genres}</p>)} <br />
                {
                  props.genres.map( genre => (
                    
                    <div key={genre} className="checks shadow" >
                      <label className='labelCheck'>
                      <input type="checkbox"  name={genre} onChange={handleInputChangeGenres}/>
                      <span class="checkboxa"></span></label>
                      <label>{genre}</label>
                    </div>

                        
                        
                    


                  ))
                }
              </div>
           
            </div>   <div>
                   
                <h4>Elige la plataforma del juego: </h4> {errors.platforms && (<p className="danger">{errors.platforms}</p>)} 
                {
                  props.platforms.map( platform => (
                    <div key={platform} className="checks shadow" >
                      <label className='labelCheck'>
                      <input type="checkbox" name={platform} onChange={handleInputChangePlatforms}/>
                      <span class="checkboxa"></span></label>
                      <label>{platform}</label>
                    </div>
                  ))
                }
              </div>
              <input type="submit" id="submit" value="Agregar juego"/>

          </form>)
      } </div>):(<h1 style={{ color:"greenyellow"}}>Juego agregado!</h1>
      )
      
    }<Link to="/games" >  <button className='prev'>Atras</button></Link>
      </div>
    );
  }

  function mapStateToProps(state) {
    return {
      genres: state.genres,
      platforms: state.platforms,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getGenres: () => dispatch(getGenres()),
      getPlatforms: () => dispatch(getPlatforms()),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Add);