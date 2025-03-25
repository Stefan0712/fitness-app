import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/index.ts'; // Make sure this path points to your Redux store
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './components/common/Navigation/Navigation.js';
import AppRoutes from './Routes';


// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`)
      
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}

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

