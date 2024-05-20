// Importing React library for creating React elements
import React from 'react';

// Importing ReactDOM for rendering React components into the DOM
import ReactDOM from 'react-dom/client';

// Importing the main App component from the './App' file
import App from './App';

// Using the experimental createRoot API in ReactDOM to render the App component into the root DOM element with the id 'root'
// StrictMode is used to enable additional runtime checks and warnings for potential issues in the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
