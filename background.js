//
// background.js for chrome apps
//

chrome.app.runtime.onLaunched.addListener(function() {
   chrome.app.window.create('index.html', {
      width: 615,
      height: 690,
      type: 'shell',
      singleton: false
   },function(appWindow) {
   });
});