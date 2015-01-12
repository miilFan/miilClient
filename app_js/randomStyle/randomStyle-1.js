//// randomStyle-1.js
//// Generated in 2015-01-12 17:43:44.
function randomStyle() {
  var colors = ["#f1f1f1", "#EADFC6"];
  var len = colors.length;
  var idx = Math.floor(Math.random() * len);
  document.querySelector("core-toolbar").style.color = colors[idx];
}