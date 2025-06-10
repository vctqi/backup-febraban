import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConsultaProvider } from './context/ConsultaContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConsultaProvider>
      <App />
    </ConsultaProvider>
  </React.StrictMode>
);