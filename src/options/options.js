import 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import defaultSettings from './defaults';
import OptionsForm from './components/OptionsForm';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

chrome.storage.sync.get(defaultSettings, (settings) => {
  ReactDOM.render(
    <OptionsForm settings={settings} />,
    document.getElementById('root')
  );
}); 
