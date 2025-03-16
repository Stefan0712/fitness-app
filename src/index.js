import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store'; // Make sure this path points to your Redux store
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './components/common/Navigation/Navigation.js';
import AppRoutes from './Routes';

// Import service worker registration
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Navigation />
        <AppRoutes />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// Register the service worker
serviceWorkerRegistration.register();
