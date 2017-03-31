import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

chrome.storage.sync.get(null, settings => {
  ReactDOM.render(
    <App settings={settings} />,
    document.getElementById('root')
  );
});
