//// about-2.js
//// Generated in 2015-01-12 17:27:02.
var appinfo = {
  /** values **/
  "name": "MiilClient",
  "edition": "oss-ca",
  "lang": "日本語",
  "version": "0.1.5 beta",
  "build": "2015年1月14日 水曜日",
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