//// getMiilPhotos-twitter-1.js
//// Generated in 2015-01-12 17:30:02.
/**
 * アプリに写真を表示する
 */
function miil_twitter(a) {
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
  toggleDialog('dialog_display_tw');
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
      this.callback(this.miilURLs);
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
  main: function(status, keyword, callback) {
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