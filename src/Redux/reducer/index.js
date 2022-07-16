let initialState = {
  favorites: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_FAVORITES":
      if (state.favorites.length < 3) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      } else {
        return state
      }
    default:
      return state;
  }
}

export default rootReducer;
