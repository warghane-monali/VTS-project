import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import requestReducer from './requestReducer'
import authReducer from './authReducer'
import adminReducer from "./adminReducer";
import driverReducer from "./driverReducer";
import trackLocationReducer from "./trackLoactionReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'request', 'admin', 'driver']
};

const reducer = combineReducers({
    auth: authReducer,
    request: requestReducer,
    admin: adminReducer,
    driver: driverReducer,
    trackLocation: trackLocationReducer,
});

export default persistReducer(persistConfig, reducer)
