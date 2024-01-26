import React from 'react';
import ReactDOM from 'react-dom/client';

// third party
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// project imports
import App from './App';
import store from './store';

// style + assets
import './assets/scss/style.scss';
import config from './config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={config.basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
