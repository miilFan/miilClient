//// about-3.js
//// Generated in 2015-01-12 18:15:38.
var appinfo = {
  /** values **/
  "name": "MiilClient",
  "edition": "oss-aa",
  "lang": "日本語",
  "version": "0.1.1 beta",
  "build": "2015年1月6日 火曜日",
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