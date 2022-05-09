import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux'
import reducer from './../reducer/index'

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);

export default store
