import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App'; // Import your main App component
//import reportWebVitals from './reportWebVitals'; // You can choose to remove this

// Create a root for ReactDOM to render into
const root = ReactDOM.createRoot(document.getElementById('root'));


// Render the App component inside the root element
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(); // Optionally enable web vitals reports