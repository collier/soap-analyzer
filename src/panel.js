import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

let getSettings = new Promise((resolve, reject) => {
  chrome.storage.sync.get(null, function(settings) {
    resolve(settings);
  });
});

getSettings.then((settings) => {
  ReactDOM.render(
    <App settings={settings} />,
    document.getElementById('root')
  );
});