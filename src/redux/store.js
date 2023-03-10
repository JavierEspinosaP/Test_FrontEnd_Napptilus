import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from "./reducers";

const reduxProducts = createStore(reducers);

export default reduxProducts;
