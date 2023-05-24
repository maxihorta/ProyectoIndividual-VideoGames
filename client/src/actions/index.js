import fetch from "node-fetch";
export function getGames() {
    return function (dispatch) {
        dispatch({ type: "GET_GAMES", payload: false });// return fetch(`http://localhost:3001/videogames?name=${name}&f=${f}&order=${order}&param=${param}&page=${page}&genre=${genre}`)
        return fetch(`http://localhost:3001/videogames`)
          .then((response) => response.json())
          .then((json) => {
            dispatch({ type: "GET_GAMES", payload: json });
          })
    }
  }
  
  export function getGame(id) {
    return function (dispatch) {
      dispatch({ type: "GET_GAME", payload: false });
      return fetch("http://localhost:3001/videogame/" + id)
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: "GET_GAME", payload: json });
        })
        .catch(err => {
          dispatch({ type: "GET_GAME", payload: "error" });
        })
    };
  }

  export function getPlatforms(id) {
    return function (dispatch) {
      dispatch({ type: "GET_PLATFORMS", payload: false });
      return fetch("http://localhost:3001/platforms")
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: "GET_PLATFORMS", payload: json });
        })
    };
  }

  export function getGenres(id) {
    return function (dispatch) {
      dispatch({ type: "GET_GENRES", payload: false });
      return fetch("http://localhost:3001/genres")
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: "GET_GENRES", payload: json });
        })
    };
  }