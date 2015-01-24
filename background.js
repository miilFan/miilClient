//
// background.js for chrome apps
//

chrome.app.runtime.onLaunched.addListener(function() {
   chrome.app.window.create('index.html', {
      width: 416,
      height: 668,
      type: 'shell',
      singleton: false
   },function(appWindow) {
   });
});