import React from 'react';
import { useEffect } from 'react';
import { connect } from "react-redux";
import { getGame } from "../../actions/index";
import './details.css';
import { Link } from 'react-router-dom';

export function Details(props) {

  useEffect(() => {
    props.getGame(props.match.params.id);

  }, []);
  return (
    <div className="detailsGame">

      


      {
        !props.game ? (<div>
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

        </div>) : (
          <div>

            <div id="up">
            <Link to="/games" >  <button className='prev'>Atras</button></Link>
              {

                props.game.background_image ? (
                  <img className="detailsImagen" src={props.game.background_image} width="400" height="400" alt="Not Found" />
                ) : (<img className="detailsImagen" src="https://www.publicdomainpictures.net/pictures/40000/velka/question-mark.jpg" alt="❌" />)
              }
              <div id="details">
                <h1>{props.game.name}</h1>
                <div className="undertitle">
                  <h3>{props.game.released}</h3>
                  <h3>{props.game.rating}⭐</h3>
                </div>
                <div className="undertitle">
                  <h2 >Generos:</h2>
                  {

                    props.game && props.game.genres && props.game.genres.map((genre) => (<button className='buttonD' key={genre}>{genre}</button>))

                  }
                </div>
                <div className="undertitle">
                  <h2 >Plataformas:</h2>
                  {
                    props.game && props.game.platforms && props.game.platforms.map((platforms) => (<button className='buttonD' key={platforms}>{platforms}</button>))
                  }
                </div>
              </div>
            </div>
            <div id="desc">
              <div dangerouslySetInnerHTML={{ __html: props.game.description }} />
            </div>
          </div>
        )
      }
      
    </div>
  );
};

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGame: (el) => dispatch(getGame(el)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);