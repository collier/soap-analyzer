'use strict';

chrome.devtools.panels.create(
  Config.DEV_TOOLS_TAB_LABEL, 
  'chrome_components/images/soap-16.png', 
  'chrome_components/panel/panel.html'
);