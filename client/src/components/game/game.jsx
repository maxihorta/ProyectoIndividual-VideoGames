import React from 'react';
import './game.css';

export default function Game({game}) {
    return (
        <div className="game">
            
           
            
            <div id="inf">
               <div className='tittle'><h2 className="datos">{game.name}</h2> <h3 className="datos">{game.rating}⭐</h3></div> 
                {
                game.background_image ? (
                    <img className="imagen" src={game.background_image} width="300" height="200" alt="❌" />
                ) : (<img className="imagen" src="https://wallpapercave.com/wp/wp9036271.jpg" width="200" height="200" alt="❌" />)
            }
                
                
                <div id="genres">
                    
                    
                    {
                        game.genres.map(element => (
                            <button className='genresButton' key={element}> {element} </button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
