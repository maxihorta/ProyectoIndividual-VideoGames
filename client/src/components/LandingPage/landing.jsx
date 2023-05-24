import React from 'react';
import './landing.css';

export default function Landing(props) {
    return (
        <div>
            <div>
            </div>
            <div id="imgandtext">
                <div class="card">
                    <h1>Video Juegos</h1>
                    <p>
                        Proyecto individual de Maximiliano Horta
                        <br /> Tema: VideoGames
                    </p>
                </div>
            </div>
            <div>
                <h5 id="gotogames">
                    <a href="http://localhost:3000/games"> 
                     <button class="btn" > Inicio
                     </button></a>
                </h5>
            </div>
        </div>
    );
};
