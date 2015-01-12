//// about-1.js
//// Generated in 2015-01-12 17:25:08.
var appinfo = {
  /** values **/
  "name": "MiilClient",
  "edition": "oss",
  "lang": "日本語",
  "version": "0.1.1 beta",
  "build": new Date().toString(),
  /** methods **/
  print: function(id) {
    var html = '';
    html += this.name + "<br>";
    html += "エディション " + this.edition + "<br>";
    html += "バージョン " + this.version + "<br>";
    html += "ビルド日 " + this.build + "<br>";
    html += "言語 " + this.lang + "<br>";
    document.querySelector("#" + id).innerHTML = html;
  }
};