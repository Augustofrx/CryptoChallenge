let initialState = {
  favorites1: [],
  favorites2: [],
  favorites3: [],
  priceList1: [],
  priceList2: [],
  priceList3: [],
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
        priceList1: initialState.priceList1
      }
      case "DELETE_FAVORITES2":
      return {
        ...state,
        favorites2: action.payload,
        priceList2: initialState.priceList2
      }
      case "DELETE_FAVORITES3":
        return {
          ...state,
          favorites3: action.payload,
          priceList3: initialState.priceList3
        }
        case "ADD_PRICE_LIST1": 
        return {
          ...state,
          priceList1: [...state.priceList1, action.payload]
        }
        case "ADD_PRICE_LIST2": 
        return {
          ...state,
          priceList2: [...state.priceList2, action.payload]
        }
        case "ADD_PRICE_LIST3": 
        return {
          ...state,
          priceList3: [...state.priceList3, action.payload]
        }
    default:
      return state;
  }
}

export default rootReducer;
