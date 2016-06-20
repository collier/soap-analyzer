'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('message: ', message);
});

console.log('\'Allo \'Allo! Event Page');