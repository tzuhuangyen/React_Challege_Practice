import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './index.c ss'
import 'bootstrap/scss/bootstrap.scss';
import { BrowserRouter } from 'react-router-dom'; // 导入 HashRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
