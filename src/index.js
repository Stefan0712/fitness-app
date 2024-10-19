import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; // Make sure this path points to your Redux store
import Navigation from './components/pages/common/Navigation';
import AppRoutes from './Routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
    </BrowserRouter>
  </Provider>
);
