const initialState = {
    games: [],
    game: {},
};

export function rootReducer(state = initialState, action) {
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
  } else {
  return state;
  }
}

module.exports ={rootReducer};
