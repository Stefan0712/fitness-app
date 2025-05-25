import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store, persistor } from './store/index.ts'; // Make sure this path points to your Redux store
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './components/common/Navigation/Navigation.js';
import AppRoutes from './Routes';
import { UIProvider } from './context/UIContext.jsx';


// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`)
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}
function ThemeWrapper({ children }) {
  const theme = useSelector((state) => state.user.preferences.theme);
  React.useEffect(() => {
    document.body.className = theme; // Apply theme to body class
  }, [theme]);

  return children;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <UIProvider>
            <ThemeWrapper>
            <Navigation />
            <AppRoutes />
          </ThemeWrapper>
        </UIProvider>
      </HashRouter>
    </PersistGate>
  </Provider>
);

