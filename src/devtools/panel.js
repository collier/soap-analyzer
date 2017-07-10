import 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './themes/themes.scss';

chrome.storage.sync.get(null, (settings) => {
  ReactDOM.render(
    <App settings={settings} />,
    document.getElementById('root')
  );
});
