import { loadState, saveState } from './localStorage';

//Estado inicial del carrito
const initialState = loadState() || {
  numberCart: 0,
  Carts: [],
  _products: [],
};

//Funcion con los reducers para gestionar la adición al carrito y a las claves de local storage
function shopping(state = initialState, action) {
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
      const newStateAdd = {
        ...state,
        numberCart: state.numberCart + 1,
      };
      saveState(newStateAdd);
      return newStateAdd;
      case "INCREASE_QUANTITY":
        const newCarts = state.Carts.map((item, index) => {
          if (index === action.payload) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          } else {
            return item;
          }
        });
      
        const newStateIncrease = {
          ...state,
          numberCart: state.numberCart + 1,
          Carts: newCarts
        };
        saveState(newStateIncrease);
        return newStateIncrease;
      
        case "DECREASE_QUANTITY":
          const qty = state.Carts[action.payload].quantity;
          if (qty > 1) {
            const newCarts = state.Carts.map((item, index) => {
              if (index === action.payload) {
                return {
                  ...item,
                  quantity: item.quantity - 1
                };
              } else {
                return item;
              }
            });
            const newStateDecrease = {
              ...state,
              numberCart: state.numberCart - 1,
              Carts: newCarts
            };
            saveState(newStateDecrease);
            return newStateDecrease;
          } else {
            const newStateDelete = {
              ...state,
              numberCart: state.numberCart - qty,
              Carts: state.Carts.filter(
                (item) =>
                  item.id !== state.Carts[action.payload].id
              ),
            };
            saveState(newStateDelete);
            return newStateDelete;
          }
        
    case "DELETE_CART":
      const quantity_ = state.Carts[action.payload].quantity;
      const newStateDeleteCart = {
        ...state,
        numberCart: state.numberCart - quantity_,
        Carts: state.Carts.filter(
          (item) =>
            item.id !== state.Carts[action.payload].id
        ),
      };
      saveState(newStateDeleteCart);
      return newStateDeleteCart;

    case "SAVE_CARTS_FROM_LOCALSTORAGE":
      return {
        ...state,
        Carts: action.payload.Carts,
        numberCart: action.payload.numberCart,
      };
    default:
      return state;
  }
}

export default shopping;
