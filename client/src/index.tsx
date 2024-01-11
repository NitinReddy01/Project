import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from '../../../Proj/client/src/Context/UserProvider';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './App/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <UserProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
