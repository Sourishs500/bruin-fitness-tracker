import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import './index.css';
import App from './App';

// if npm start doesnt work and complains about "react-dom/client", run this command:
// npm install --save-dev @babel/plugin-proposal-private-property-in-object

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


