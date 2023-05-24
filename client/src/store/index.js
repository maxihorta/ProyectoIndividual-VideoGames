import { createStore, applyMiddleware } from "redux";
//import {rootReducer} from "../reducers/index.js";
import thunk from "redux-thunk";


const initialState = {
  games: [],
  game: {},
  genres: [],
  platforms: [],
};

function rootReducer(state = initialState, action) {
if (action.type === 'GET_GAMES') {
    return {
      ...state,
      games: action.payload
    };
} else if (action.type === 'GET_GAME') {
    return {
        ...state,
        game: action.payload
    }
} else if (action.type === 'GET_GENRES') {
  return {
      ...state,
      genres: action.payload
  }
} else if (action.type === 'GET_PLATFORMS') {
  return {
      ...state,
      platforms: action.payload
  }
} else {
return state;
}
}

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
  
export default store;