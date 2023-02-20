const initialState = {
    _products: [],
  };
  
  function productsReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_ALL_PRODUCTS':
        return {
          ...state,
          _products: action.payload,
        };
      default:
        return state;
    }
  }

  export default productsReducer;