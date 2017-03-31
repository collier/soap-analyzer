
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import './css/options.css';

const defaultSettings = { 
  useDarkTheme: false 
};

$(document).on('DOMContentLoaded', () => { 
  chrome.storage.sync.get(defaultSettings, (settings) => {
    $('.dark-mode').prop('checked', settings.useDarkTheme);
  }); 
});

$('.save').click(() => { 
  const formData = {
    useDarkTheme: $('.dark-mode').is(':checked')
  };
  chrome.storage.sync.set(formData, () => alert('Settings Saved!')); 
});
