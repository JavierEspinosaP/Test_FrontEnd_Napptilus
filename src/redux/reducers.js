const initProduct = {
  numberCart: 0,
  carts: [],
  _products: [],
};

function shopping(state = initProduct, action) {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        _products: action.payload,
      };
    case "REMOVE_ALL_PRODUCTS":
      return {
        ...state,
        numberCart: 0,
        carts: [],
      };
    case "ADD_CART":
      const { payload } = action;
      const existingItem = state.carts.find((item) => {
        return (
          item.id === payload.id &&
          item.colorCode === payload.colorCode &&
          item.storageCode === payload.storageCode
        );
      });
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.carts.push({ ...payload, quantity: 1 });
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    case "INCREASE_QUANTITY":
      state.carts[action.payload].quantity += 1;
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    case "DECREASE_QUANTITY":
      const qty = state.carts[action.payload].quantity;
      if (qty > 1) {
        state.carts[action.payload].quantity -= 1;
        return {
          ...state,
          numberCart: state.numberCart - 1,
        };
      } else {
        return {
          ...state,
          numberCart: state.numberCart - qty,
          carts: state.carts.filter(
            (item) =>
              item.id !== state.carts[action.payload].id ||
              item.colorCode !== state.carts[action.payload].colorCode ||
              item.storageCode !== state.carts[action.payload].storageCode
          ),
        };
      }
    case "DELETE_CART":
      const quantity_ = state.carts[action.payload].quantity;
      return {
        ...state,
        numberCart: state.numberCart - quantity_,
        carts: state.carts.filter(
          (item) =>
            item.id !== state.carts[action.payload].id ||
            item.colorCode !== state.carts[action.payload].colorCode ||
            item.storageCode !== state.carts[action.payload].storageCode
        ),
      };
    default:
      return state;
  }
}

export default shopping;
