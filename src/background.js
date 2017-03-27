
chrome.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message: ', message);
});