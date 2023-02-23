export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
      saveServerCart(state.Carts);
    } catch (err) {
      console.log(err);
    }
  };
  

  export const saveServerCart = (serverCart) => {
    try {
      const serializedServerCart = JSON.stringify(serverCart);
      localStorage.setItem('serverCart', serializedServerCart);
    } catch (err) {
      console.log(err);
    }
  };
  