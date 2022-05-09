import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import {BrowserRouter} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import {ThemeProvider} from "@mui/material/styles"
import App from './App';
import theme from './theme'

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <PersistGate persistor={persistor} loading={false}>
                        <App />
                    </PersistGate>
                </BrowserRouter>
            </ThemeProvider>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
