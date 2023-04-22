import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// if(process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>   {/* It is a development only tool that highlights potential error in a program. */}
    <App />
  </React.StrictMode>
);
