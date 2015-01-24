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

/**
 * アプリに写真を表示する
 */
function miil_twitter(a, dialog) {
  var g = document.querySelector("griddles-ui-card");
  var imageList = []; // ランダム表示するヘッダ画像の候補
  for(var j = 0; j < a.length; j++) {
    var src = a[j];
    var card = g.apis.makeCard(null, 'T', 'photo');
        card = g.apis.makeCard(card, 'S', 0);
        card = g.apis.makeCard(card, 'R', 0);
        card = g.apis.makeCard(card, 'C', src + '.jpg');
        card = g.apis.makeCard(card, 'H', false);
        card = g.apis.makeCard(card, 'D', "webpage:" + src);
    imageList.push(src + '.jpg');
    $("griddles-ui-card").append(card);
  }
  if(imageList.length > 0) {
    var r = Math.floor(Math.random() * (imageList.length));
    headerBgURL = imageList[r];
  }
  changeHeadImage(headerBgURL);
  document.getElementById('dialog_wait').style.display = 'none';
  document.getElementById('dialog_display_tw_q').innerHTML = getMiilPhotos_twitter.query;
  if(dialog == 1) {
    toggleDialog('dialog_display_tw');
  }else {
    display_photos_tw();
  }
}

function display_photos_tw() {
  document.querySelector("griddles-ui-card").query = getMiilPhotos_twitter.query + Math.floor(Math.random()*1000);
}

/**
 * Twitter search API の status から
 * miilの写真のURLリストを生成する
 */
getMiilPhotos_twitter = {
  items: [],
  miilURLs: [],
  query: '',
  dialog: 1,
  callback: function(){},

  /**
   * Twitterの短縮URLから
   * miilの写真のURLを抽出する再帰関数
   */
  getPhotoURL: function(i) {
    var arr = this.items;
    var len = arr.length;
    if(i < len) {
      var item = arr[i];
      if(item.pageURL != void 0) {
        /* twitterの短縮URLを開く */
        var xhr = new XMLHttpRequest();
        xhr.open('GET', item.pageURL, true);
        xhr.responseType = 'document';
        xhr.onload = function(e) {
          /* miil のページURLが得られる */
          var miilurl = xhr.response.title;
          if(miilurl.search(/miil/) != -1) {
            getMiilPhotos_twitter.miilURLs.push(miilurl);
          }
          i++;
          getMiilPhotos_twitter.getPhotoURL(i);
        }
        xhr.send();
      }
    }else {
      this.callback(this.miilURLs, this.dialog);
    }

  },

  /* ページのURLを抽出する */
  getPageURL: function(arr) {
    var len = arr.length;
    var res = [];
    var regURL = new RegExp("https?://.*/[^\.\ ]*", "i");
    for(var i = 0; i < len; i++) {
      var item = arr[i];
      if(item.text.search(/#miil/) != -1) {
        item.pageURL = item.text.match(regURL)[0];
        res.push(item);
      }
    }
    this.items = res;
    this.getPhotoURL(0);
  },

  /* エントリポイント */
  main: function(status, keyword, callback, dialog) {
    this.dialog = dialog;
    this.init(keyword, callback);
    var len = status.length;
    var res = [];
    for(var i = 0; i < len; i++) {
      var tw = status[i];
      var item = {};
      item.text = tw.text;
      res.push(item);
    }
    this.getPageURL(res);
  },

  /* 初期化 */
  init: function(keyword, callback) {
    this.callback = callback;
    this.items = [];
    this.miilURLs = [];
    this.query = keyword;
  }
}

/**
 * アプリに写真を表示する
 */
function miil_user() {
  var items = getMiilPhotos_miiluser.miil_items;
  var query = getMiilPhotos_miiluser.user + getMiilPhotos_miiluser.nextpg;
  var g = document.querySelector("griddles-ui-card");
  g.innerHTML = '';
  var imageList = []; // ランダム表示するヘッダ画像の候補
  for(var j = 0; j < items.length; j++) {
    var item = items[j];
    var card = g.apis.makeCard(null, 'T', 'photo');
        card = g.apis.makeCard(card, 'S', 0);
        card = g.apis.makeCard(card, 'R', 0);
        card = g.apis.makeCard(card, 'C', item.photo);
        card = g.apis.makeCard(card, 'H', false);
        card = g.apis.makeCard(card, 'D', "webpage:" + item.page);
    imageList.push(item.photo);
    $("griddles-ui-card").append(card);
  }
  if(imageList.length > 0) {
    var r = Math.floor(Math.random() * (imageList.length));
    headerBgURL = imageList[r];
  }
  changeHeadImage(headerBgURL);

  if(getMiilPhotos_miiluser.initflag == 1) {
    document.querySelector("griddles-ui-card").query = query + Math.floor(Math.random()*1000);
  }else {
    /* render_continue
     * <griddles-ui-card>.queryChangedの一部焼き直し
     */
    var cards = [];
    if(document.querySelector('griddle-card') != null) {
      cards = document.querySelector('griddle-card').getList;
      document.querySelector('griddle-card').clearList;
    }
    for(i = 0; i < cards.length; i++) {
      g.cards[g.query].push(cards[i]);
    }
    g.apis.render_continue();
  }
}

/**
 * miilのユーザー名から写真を検索
 */
getMiilPhotos_miiluser = {
  callback: function(){},
  given_next_pg: '',
  user: '',
  nextpg: 0,
  page: '?page=',
  miil_items: [],
  initflag: 0,

  baseURL: function() {
    return "http://api.miil.me/api/users/"+ this.user +"/photos/public.json";
  },

  /* 次のページが有効かどうかを判定する */
  isValidNextURL: function(next_url) {
    var flag = 1;
    if(next_url == (void 0) || next_url == null || this.nextpg < 0) flag = 0;
    if(this.given_next_pg != '') {
      //!if(this.given_next_pg == next_url) flag = 0;
    }
    return flag;
  },

  /* 画像リストを取得するための関数 */
  getPhotoURL: function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function(e) {
      var res = this.response;
      var photos = res.photos;
      var items = getMiilPhotos_miiluser.miil_items;
      /* 受け取った写真データを保持する */
      for(var i = 0; i < photos.length; i++) {
        var photo = photos[i];
        var item = {};
        item.photo = photo.url;
        item.page = photo.page_url;
        item.received = photo;
        items.push(item);
      }
      /* 次のページが有効かどうかを判断し、情報を更新する */
      var next_url = res.next_url;
      var f = getMiilPhotos_miiluser.isValidNextURL(next_url);
      if(f == 1) {
        getMiilPhotos_miiluser.nextpg = Number((next_url.split("&")[0]).split("?page=")[1]);
        getMiilPhotos_miiluser.given_next_pg = next_url;
      }else {
        getMiilPhotos_miiluser.nextpg = -1; // 無効にする
      }
      getMiilPhotos_miiluser.callback();
    }
    xhr.send();
  },

  /* エントリポイント */
  main: function(initflag, username, callback) {
    this.initflag = initflag;
    this.callback = callback;
    this.user = username;
    if(this.user == '') this.user = 'daiz';
    if(initflag == 1) {
      this.nextpg = 0;
    }
    this.miil_items = [];
    var url = this.baseURL();
    if(this.nextpg > 0) url += this.page + this.nextpg;
    this.getPhotoURL(url);
  }
}

function encodeQuery(query) {
  return window.encodeURIComponent(query);
}

function getTweets(keyword, query, dialog) {
  var secretKeys = {
    consumerSecret: "/** apricot.set V_twitter_ConsumerSecret **/",
    tokenSecret:    "/** apricot.set V_twitter_AccessTokenSecret **/"
  };

  var parameters = {
    oauth_signature_method: "HMAC-SHA1",
    oauth_consumer_key: "/** apricot.set V_twitter_oauthConsumerKey **/",
    oauth_token:        "/** apricot.set V_twitter_oauthAccessToken **/",
    count: 42,
    q: query,
  };

  var api_url = "https://api.twitter.com/1.1/search/tweets.json";
  var message = {
    method: "GET",
    action: api_url,
    parameters: parameters
  };

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, secretKeys);
  var result = OAuth.addToURL(api_url, parameters);

  /* CSP対応 */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', result, true);
  xhr.responseType = 'json';
  xhr.onload = function(e) {
    if(dialog == undefined) dialog = 1;
    getMiilPhotos_twitter.main(e.target.response.statuses, keyword, miil_twitter, dialog);
  }
  xhr.send();
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

/*
 * griddles-ui-card の main関数
 */
function griddlesAppInit() {
  console.log("appInit..");
  randomStyle(); /* ツールバーの配色をランダムに決める */
  /** apricot.import griddles-app-init.js/R_griddles-app-init **/
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
    getMiilPhotos_miiluser.main(0, username, miil_user);
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

document.getElementById("btn_search").addEventListener("click", function() {
   toggleDialog('dialog_search_twitter');
}, false);

document.getElementById("dialog_btn_search").addEventListener("click", function() {
   var keyword = document.getElementById("dialog_input_search").value;
   if(keyword != '') {
     var query = keyword + ' ' + '#miil';
     toggleDialog('dialog_wait');
     getTweets(keyword, query, 1);
   }else {
     toggleDialog('dialog_wait');
     getTweets("なう飯", "#miil", 1);
   }
}, false);

document.getElementById("btn_user").addEventListener("click", function() {
   var username = document.getElementById('username').value || '';
   getMiilPhotos_miiluser.main(1, username, miil_user);
}, false);


document.getElementById("dialog_btn_display_tw").addEventListener("click", function() {
   display_photos_tw();
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