import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './../reducer/index'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default store
