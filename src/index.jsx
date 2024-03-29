import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './App';
import { store } from './store/store';
import { reportWebVitals } from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { OAUTH_CLIENT_ID, theme } from './helpers';
import { ThemeProvider } from '@emotion/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={OAUTH_CLIENT_ID}>
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);

reportWebVitals();
