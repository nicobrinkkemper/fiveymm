import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { render as reactRender } from 'react-snapshot';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as FullStory from '@fullstory/browser';
setTimeout(()=>{
  FullStory.init({ orgId: 'W54CA', namespace: 'FS' });
},100)
reactRender(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
