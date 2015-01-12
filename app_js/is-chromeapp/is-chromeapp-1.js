//// is-chromeapp-1.js
//// Generated in 2015-01-12 17:55:22.
function isChromeApp() {
    var res = false;
    if(window.chrome != undefined) {
        if(chrome.app.window != undefined) {
        // 「chrome アプリ」である
        res = true;
        }
    }
  return res;
}