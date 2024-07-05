import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/scss/bootstrap.scss';
import { HashRouter } from 'react-router-dom'; // 导入 HashRouter
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
