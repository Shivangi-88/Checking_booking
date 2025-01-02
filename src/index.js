
import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure you're importing from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'animate.css';


// Create a root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Reporting web vitals
reportWebVitals();
