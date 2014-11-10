// background.js
chrome.app.runtime.onLaunched.addListener(function() {
   chrome.app.window.create('index.html', {
      width: 615,
      height: 666,
      maxWidth: 615,
      maxHeight: 666,
      type: 'shell',
      //id: '__',
      singleton: false
   },function(appWindow) {
      //appWindow.resizeTo(400, 250)
   });
});