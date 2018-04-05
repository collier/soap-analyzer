import 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import defaultSettings from '../options/defaults';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './themes/themes.scss';

chrome.storage.sync.get(defaultSettings, (settings) => {
  ReactDOM.render(
    <App settings={settings} />,
    document.getElementById('root')
  );
});
