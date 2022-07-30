import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import theme from './theme';
import store from './store';
import { Provider } from 'react-redux';
import UserContext from './components/AccountContext';
import './style.css';
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';

// let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <Provider store={store}>
          {/* <PersistGate persistor={persistor}> */}
            <UserContext>
            <App />
            </UserContext>
          {/* </PersistGate> */}
        </Provider>
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>
);

