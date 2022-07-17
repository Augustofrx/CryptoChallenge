let initialState = {
  favorites1: [],
  favorites2: [],
  favorites3: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_FAVORITES1":
        return {
          ...state,
          favorites1: [...state.favorites1, action.payload],
        };
      case "ADD_FAVORITES2":
        return {
          ...state,
          favorites2: [...state.favorites2, action.payload],
        };
        case "ADD_FAVORITES3":
          return {
            ...state,
            favorites3: [...state.favorites3, action.payload],
          };
    case "DELETE_FAVORITES1":
      return {
        ...state,
        favorites1: action.payload,
      }
      case "DELETE_FAVORITES2":
      return {
        ...state,
        favorites2: action.payload,
      }
      case "DELETE_FAVORITES3":
        return {
          ...state,
          favorites3: action.payload,
        }
    default:
      return state;
  }
}

export default rootReducer;
