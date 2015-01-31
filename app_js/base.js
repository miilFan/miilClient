/**
miilClient
Copyright 2015 daiz, FoodAppProject. All Rights Reserved.
*/
// code version: /** apricot.set V_codeversion **/

// custom transformation: scale header's title
var titleStyle = document.querySelector('.title').style;
addEventListener('core-header-transform', function(e) {
  var d = e.detail;
  var m = d.height - d.condensedHeight;
  var scale = Math.max(0.75, (m - d.y) / (m / 0.25)  + 0.75);
  titleStyle.transform = titleStyle.webkitTransform =
      'scale(' + scale + ') translateZ(0)';
});

var appinfo = {
//! methods
  print: function(id) {
    var html = '';
    html += "/** apricot.set V_app **/ <br>";
    html += "エディション /** apricot.set V_edition **/ <br>";
    html += "バージョン /** apricot.set V_version **/ <br>";
    html += "ビルド日 /** apricot.set V_build **/ <br>";
    html += "言語 日本語 <br>";
    document.querySelector("#" + id).innerHTML = html;
  }
};

/** apricot.import twitter.getMiilPhotos.js/R_tw **/
/** apricot.import miilapi.getMiilPhotos.js/R_ma **/

function encodeQuery(query) {
  return window.encodeURIComponent(query);
}


var YUMMY2 = "griddles_yummy2_a";
var MAINKEY = "ごちそう";
var TAGMANAGE = "タグを管理";
var griddles_apis = {};
var yummy2 = {};

//
// クエリリストをつくる
//
function creatingKeyList(data, id) {
  document.getElementById(id).innerHTML = '<paper-item label="すべてのごちそう" class="menu_item" id="btn_all_gochiso" data-label="ごちそう"></paper-item>';
  var tags = [];
  var str_tags = "," + tags.toString() + ",";
    if(data != undefined) {
        for(var j = 0; j < data.length; j++) {
          if(j > 0) {
                var yss = data[j].tags.ys;
                for(var i = 0; i < yss.length; i++) {
                    var rg = new RegExp("," + yss[i] + ",", "gi");
                    var res = str_tags.search(rg);
                    if(res == -1 && yss[i] != MAINKEY) {
                      tags.push(yss[i]);
                      str_tags = str_tags + yss[i] + ",";
                    }
                }
          }
        }
        var template = '<paper-item label="{L}" class="menu_item" data-label="{DL}"></paper-item>';
        var html = "";
        var max = tags.length;
        if(tags.length > 13) max = 13;
        for(var j = 0; j < max; j++) {
            var html = html + griddles_apis.make(template, {L: tags[j], DL: tags[j]});
        }
        html += '<hr><paper-item label="データをインポート" class="menu_item" id="btn_import"></paper-item>';
        html += '<paper-item label="インポートしたデータを削除" class="menu_item" id="btn_remove"></paper-item>';
        $($("#"+id)).append(html);

        /* add event listeners */
        document.getElementById("btn_import").addEventListener("click", function() {
          toggleDialog('dialog_import');
        }, false);
        document.getElementById("btn_remove").addEventListener("click", function() {
          removingData();
        }, false);

        return tags;
    }
}

//
// クエリに対応するカードを表示する
//
function miils() {
  var g = document.querySelector("griddles-ui-card");
  appStorage({"key": YUMMY2}, "get", function(e, keys) {
    var imageList = []; // ランダム表示するヘッダ画像の候補
    var query = yummy2.query;
    var rg = new RegExp("," + query + ",", "gi");
    var key = keys[0];
    var smpls = e[key];
    for(var i = 0; i < smpls.length; i++) {
       if(i > 0) {
          var obj = smpls[i];
          var tags = smpls[i].tags.ys;
          var str_tags = "," + tags.toString() + ",";
          var res = str_tags.search(rg);
          var src = smpls[i].web;

          var card = g.apis.makeCard(null, 'T', 'photo');
              card = g.apis.makeCard(card, 'S', 0);
              card = g.apis.makeCard(card, 'R', 0);
              card = g.apis.makeCard(card, 'C', src);
              card = g.apis.makeCard(card, 'H', false);
              card = g.apis.makeCard(card, 'D', "webpage:" + smpls[i].page);

          if(res != -1 || query == MAINKEY) {
            imageList.push(src);
            $("griddles-ui-card").append(card);
          }
       }
    }
    var headerBgURL = "";
    if(imageList.length > 0) {
      var r = Math.floor(Math.random() * (imageList.length));
      headerBgURL = imageList[r];
    }else {
      headerBgURL = "src/1frgq.jpg";
    }
    changeHeadImage(headerBgURL);
    document.querySelector("griddles-ui-card").query = query;
  });
};

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

/** apricot.import griddles-app-card-clicked.js/R_griddles-app-card-clicked **/
/** apricot.import compute-flexible-width.js/R_compute-flexible-width **/
/** apricot.import device-format.js/R_device-format **/

/*
 * griddles-ui-card の main関数
 */
function griddlesAppInit() {
  console.log("appInit..");
  randomStyle(); /* ツールバーの配色をランダムに決める */
  deviceFmt();
  griddles_apis = document.querySelector("griddles-ui-card").apis;
  var smpls = sample_data;
  appStorage({"key": YUMMY2}, "get", function(e, keys) {
    var key = keys[0];
    var json = e[key];
    if(json != undefined && json != null) {
       smpls = json;
       var queries = creatingKeyList(smpls, "menus");
    }else if(json == undefined) {
       appStorage({"key": YUMMY2, "value": smpls}, "set", function() {
           var queries = creatingKeyList(smpls, "menus");
       })
    }
  });
}

/*
 * すべてのカード表示終了時に呼ばれる関数
 */
function griddlesScrollEnd() {
  var nowquery = document.querySelector("griddles-ui-card").query;
  var username = document.getElementById('username').value || document.getElementById('username').placeholder;
  var reg = new RegExp(username, 'i');
  if(nowquery.search(reg) >= 0) {
    getMiilPhotos_miiluser.main(-1, 0, username, miil_user);
  }
}

function ImportingData() {
  var import_code = document.getElementById("dialog_input_import").value;
  if(import_code != "") {
      var import_code = JSON.parse(import_code);
      appStorage({"key": YUMMY2, "value": import_code}, "set", griddlesAppInit);
  }
}

function removingData() {
  appStorage({"key": YUMMY2}, "remove", griddlesAppInit);
}

function randomStyle() {
  var colors = ["#f1f1f1", "#EADFC6"];
  var len = colors.length;
  var idx = Math.floor(Math.random() * len);
  document.querySelector("core-toolbar").style.color = colors[idx];
}

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

function toggleDialog(id) {
  var dialog = document.querySelector('#' + id);
  dialog.toggle();
}

/*　
 * Event Listeners
 */
document.getElementById("dialog_btn_import").addEventListener("click", function() {
   ImportingData();
}, false);

document.getElementById("about").addEventListener("click", function() {
   appinfo.print("appinfo");
   toggleDialog('dialog_about');
}, false);

window.addEventListener("click", function(e) {
   var id = e.target.id;
   var dataset = e.target.dataset;
   if(dataset.label != undefined && dataset.label != TAGMANAGE) {
       var now = document.querySelector("griddles-ui-card").query;
       if(now != dataset.label) {
         yummy2.query = dataset.label;
         miils();
       }else {
         console.log("同一のクエリ.");
       }
   }
   if(id == 'miiluser_set') {
     toggleDialog('dialog_user');
   }
},false);
