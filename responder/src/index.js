import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

let indexValue = localStorage.getItem('index');
let readyState = localStorage.getItem('state');
if (indexValue === null) {
  indexValue = -1;
} else {
    if (readyState === null || readyState !== "1"){
      indexValue = parseInt(indexValue) + 1;
    }
    localStorage.setItem('index', indexValue);
  }
    
  
root.render(
  <React.StrictMode>
    <App indexValue={indexValue}/>
  </React.StrictMode>
);


