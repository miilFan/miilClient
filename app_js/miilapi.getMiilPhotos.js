/** apricot.R = 1 **/
document.getElementById("btn_user").addEventListener("click", function() {
   var username = document.getElementById('username').value || '';
   getMiilPhotos_miiluser.main(-1, 1, username, miil_user);
}, false);

document.getElementById("icon").addEventListener("click", function() {
   var username = 'miilme';
   getMiilPhotos_miiluser.main(-1, 1, username, miil_user);
}, false);

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
 * miilのユーザー名から写真を取得
 */
getMiilPhotos_miiluser = {
  callback: function(){},
  given_next_pg: '',
  user: '',
  nextpg: 0,
  page: '?page=',
  miil_items: [],
  initflag: 0,

  baseURL: function(a) {
    if(a < 0) return "http://api.miil.me/api/users/"+ this.user +"/photos/public.json";
    else      return "http://miil.me/api/photos/recent/categories/"+ a +".json";
  },

  /* 次のページが有効かどうかを判定する */
  isValidNextURL: function(next_url) {
    var flag = 1;
    if(next_url == (void 0) || next_url == null || this.nextpg < 0) flag = 0;
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
      /* 次ページの情報を更新する */
      var next_url = res.next_url;
      getMiilPhotos_miiluser.nextpg += 1;
      getMiilPhotos_miiluser.given_next_pg = next_url;

      getMiilPhotos_miiluser.callback();
    }
    xhr.send();
  },

  /* エントリポイント */
  main: function(category, initflag, username, callback) {
    this.initflag = initflag;
    this.callback = callback;
    this.user = username;
    if(this.user == '') this.user = 'daiz';
    if(initflag == 1) {
      this.nextpg = 0;
    }
    this.miil_items = [];
    var url = this.baseURL(category);
    if(this.nextpg > 0) url = this.given_next_pg;
    this.getPhotoURL(url);
  }
}

/* categoryを解析する */
function showCategories() {
  var cs = miil_normal;
  var h = window.innerHeight - 210;
  var s = document.querySelector("#stage_category");
  var g = document.querySelector("griddles-ui-card");
  s.style.height = h + "px";
  for(var i = 0; i < cs.length; i++) {
    var n = cs[i].name;
    var c = cs[i].category_id;
    s.innerHTML += "<h2>" + n  +"</h2>";
    for(var j = 0; j < cs[i].categories.length; j++) {
      n = cs[i].categories[j].name;
      c = cs[i].categories[j].category_id;
      n = qn(n); /* 個別対応 */
      var pb = "<paper-button id='category_{c}' label='{n}' style='{s}'></paper-button> ";
      s.innerHTML += g.apis.make(pb, {c: c, n: n, s: "color: #4285F4;"});
    }
  }
}

function qn(q) {
  if(q.search(/手料理：/) != -1) {
    q = q.replace("手料理：", "");
  }
  return q;
}
