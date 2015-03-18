/**
 * miilのユーザー名から写真を取得
 */
getMiilPhotos_miiluser = {
  callback: function(){},
  given_next_pg: '',
  user: 'daiz',
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
        item.title = photo.title;
        //item.received = photo;
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
    if(this.user == '') this.user = app_settings.userName;
    if(initflag == 1) this.nextpg = 0;
    this.miil_items = [];
    var url = this.baseURL(category);
    if(this.nextpg > 0) url = this.given_next_pg;
    this.getPhotoURL(url);
  }
}
