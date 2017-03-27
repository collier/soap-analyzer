
// Event listeners
$(document).on('DOMContentLoaded', function() { restoreOptions() });
$('.save').click(function() { saveSettings() });

// Restores state from chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    useDarkTheme: false
  }, function(settings) {
    $('.dark-mode').prop('checked', settings.useDarkTheme);
  });
}

// Saves options to chrome.storage
function saveSettings() {
  chrome.storage.sync.set({
    useDarkTheme: $('.dark-mode').is(':checked')
  }, function() {
    alert('Settings Saved!')
  });
}
