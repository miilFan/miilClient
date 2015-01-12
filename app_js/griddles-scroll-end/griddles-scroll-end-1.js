//// griddles-scroll-end-1.js
//// Generated in 2015-01-12 17:47:11.
/*
 * すべてのカード表示終了時に呼ばれる関数
 */
function griddlesScrollEnd() {
  var nowquery = document.querySelector("griddles-ui-card").query;
  var username = document.getElementById('username').value || document.getElementById('username').placeholder;
  var reg = new RegExp(username, 'i');
  if(nowquery.search(reg) >= 0) {
    getMiilPhotos_miiluser.main(0, username, miil_user);
  }
}