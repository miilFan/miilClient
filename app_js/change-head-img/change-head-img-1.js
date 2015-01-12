//// change-head-img-1.js
//// Generated in 2015-01-12 17:57:12.
function changeHeadImage(url) {
  var headerBg = document.querySelector("core-scroll-header-panel").headerBg;
  if(isChromeApp() == true) {
      var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.responseType = 'blob';
          xhr.onload = function(e) {
              var blob_url = window.webkitURL.createObjectURL(this.response);
              url = blob_url;
              headerBg.style.backgroundImage = "url('"+ url +"')";
          }
          xhr.send();
  }else {
      headerBg.style.backgroundImage = "url('"+ url +"')";
  }
}