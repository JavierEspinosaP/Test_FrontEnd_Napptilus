import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import cartsReducer from './redux/reducers';
import { persistReducer } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage: storage,
    timeout: 3600000,
    whitelist: ['Carts']
};

const reducers = combineReducers({
    Carts: cartsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;


