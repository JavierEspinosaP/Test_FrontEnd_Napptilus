const initProduct = {
  numberCart: 0,
  Carts: [],
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
        Carts: [],
      };
    case "ADD_CART":
      const { payload } = action;
      const existingItem = state.Carts.find((item) => {
        return (
          item.id === payload.id &&
          item.colorCode === payload.colorCode &&
          item.storageCode === payload.storageCode
        );
      });
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.Carts.push({ ...payload, quantity: 1 });
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    case "INCREASE_QUANTITY":
      state.Carts[action.payload].quantity += 1;
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    case "DECREASE_QUANTITY":
      const qty = state.Carts[action.payload].quantity;
      if (qty > 1) {
        state.Carts[action.payload].quantity -= 1;
        return {
          ...state,
          numberCart: state.numberCart - 1,
        };
      } else {
        return {
          ...state,
          numberCart: state.numberCart - qty,
          carts: state.Carts.filter(
            (item) =>
              item.id !== state.Carts[action.payload].id ||
              item.colorCode !== state.Carts[action.payload].colorCode ||
              item.storageCode !== state.Carts[action.payload].storageCode
          ),
        };
      }
    case "DELETE_CART":
      const quantity_ = state.Carts[action.payload].quantity;
      return {
        ...state,
        numberCart: state.numberCart - quantity_,
        Carts: state.Carts.filter(
          (item) =>
            item.id !== state.Carts[action.payload].id
        ),
      };
    default:
      return state;
  }
}

export default shopping;
