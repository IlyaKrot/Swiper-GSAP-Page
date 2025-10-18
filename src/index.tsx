import React from 'react';
import { createRoot } from 'react-dom/client';
import 'swiper/css';
import App from './App';
import './app/styles/main.scss';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);