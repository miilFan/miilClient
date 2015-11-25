/**
 * Listens for the app launching then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('index.html', {
      width: 606, // 488,
      height: 526, // 668,
      type: 'shell',
      singleton: false
   },function(appWindow) {
   });
});
