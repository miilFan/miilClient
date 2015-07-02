// お気に入り操作を行う関数群

var APPKEY_URL = "miilClient2_url"

// お気に入りにURLを登録する
function addFav(url) {
  appStorage({"key": APPKEY_URL}, "get", function(e, keys){
    var mainkey = keys[0];
    var arr = e[mainkey] || [];
    var urls = [];
    if(arr) urls = arr;
    if(urls.indexOf(url) == -1) {
      urls.push(url);
    }
    appStorage({"key": APPKEY_URL, "value": urls}, "set", function(e, keys) {
      console.log("お気に入りデータ「%s」を登録完了", url);
      ms.querySelector("#fav_input").value = "";
      slideUp("stage_favs");
    });
  });
}

// お気に入りをすべて消去する
function delFavs() {
  appStorage({"key": APPKEY_URL}, "remove", function(){
    console.log("お気に入りデータを削除完了");
  });
}

// お気に入りをすべて表示する
function listupFavs() {
  appStorage({"key": APPKEY_URL}, "get", function(e, keys) {
    var mainkey = keys[0];
    var urls = e[mainkey] || [];
    var pages = [];
    for(var i=0; i < urls.length; i++) {
      var pg = {};
      var url = urls[i];
      pg.photo = url + ".jpg";
      pg.title = "";
      pg.page = url;
      pages.push(pg);
    }
    clear_flag = 1;
    showMillPhotos(pages);
  })
}
