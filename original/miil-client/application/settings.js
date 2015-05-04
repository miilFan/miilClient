// 設定操作を行う関数群

// 設定データのメインキー
var APPKEY_SETTINGS = "miilClient2_settings";
var APPKEY_PREV = "griddles_yummy2_a";
var app_settings = {};

// タイトルコメントを表示するか否かのパラメータを保存する
function setVisibleTitle(role) {
  appStorage({"key": APPKEY_SETTINGS}, "get", function(e, keys){
    var key = keys[0];
    var json = e[key] || {};
        json.visibleTitle = (role == 1) ? "y" : "n";
        appStorage({"key": APPKEY_SETTINGS, "value": json}, "set", function(e, keys){
          console.log("設定更新完了");
          app_settings.visibleTitle = json.visibleTitle;
        });
  });
}

// 大きいサイズの写真で表示するか否かのパラメータを保存する
function setShowBigPhoto(role) {
  appStorage({"key": APPKEY_SETTINGS}, "get", function(e, keys){
    var key = keys[0];
    var json = e[key] || {};
        json.showBigPhoto = (role == 1) ? "y" : "n";
        appStorage({"key": APPKEY_SETTINGS, "value": json}, "set", function(e, keys){
          console.log("設定更新完了");
          app_settings.showBigPhoto = json.showBigPhoto;
        });
  });
}

// ミイルのユーザー名を登録する
function setUsername(name) {
  appStorage({"key": APPKEY_SETTINGS}, "get", function(e, keys){
    var key = keys[0];
    var json = e[key] || {};
        json.userName = name;
        appStorage({"key": APPKEY_SETTINGS, "value": json}, "set", function(e, keys){
          console.log("設定更新完了");
          app_settings.userName = json.userName;
        });
  });
}

// v2のお気に入りのデータをインポートする
function importV2FavData(api_code) {
  var api_code = '[' + api_code + ']';
  var arr = JSON.parse(api_code);
  var prefix = 'miilClient_api_v2_favs';
  console.log(arr[0]);
  if(arr[0] == prefix) {
    appStorage({"key": APPKEY_URL}, "get", function(e, keys) {
      var key = keys[0];
      var urls = e[key] || [];
      var imported = 0;
      for(var j=1; j < arr.length; j++) {
        var url = arr[j];
        if(isMiilPg(url) == 1 && urls.indexOf(url) == -1) {
          urls.push(url);
          imported++;
        }
      }
      // 登録更新
      appStorage({"key": APPKEY_URL, "value": urls}, "set", function(e, keys) {
        ms.getElementById("input_import").value = "";
        ms.getElementById("input_import").placeholder = imported+"件をインポート完了";
        console.log("お気に入りデータをインポート完了");
      });
    });
  }
}

// v2のお気に入りのデータをエクスポートする
function exportV2FavData(delflag) {
  var willdelete = delflag || 0;
  var prefix = '"miilClient_api_v2_favs",';
  var export_urls;
  appStorage({"key": APPKEY_URL}, "get", function(e, keys) {
    var key = keys[0];
    var arr = e[key] || [];
    export_urls = JSON.stringify(arr);
    export_urls = prefix + export_urls.substr(1, export_urls.length-2);
    ms.getElementById("input_export").value = export_urls;
    console.log("お気に入りデータをエクスポート完了");
    // delflagが1の場合は削除する
    if(willdelete == 1) {
      delFavs();
    }
  });
}

// ブログにアクセスすることを許可するか否かのパラメータを保存する
function setAccessableBlog() {

}

// 設定内容をすべて消去する
function delSettings() {
  appStorage({"key": APPKEY_SETTINGS}, "remove", function(){
    console.log("設定データを削除完了");
  });
}

// 起動時に設定内容をUIに反映
function initSettingUI() {
  appStorage({"key": APPKEY_SETTINGS}, "get", function(e, keys) {
    var key = keys[0];
    var json = e[key] || {};
    var id = "";

    // visibleTitle
    app_settings.visibleTitle = json.visibleTitle || "y";
    if(app_settings.visibleTitle == "n") {
      id = "settingsTitle";
      ms.getElementById(id).className = "checkbox";
      ms.getElementById(id).icon = "check-box-outline-blank";
    }

    // showBigPhoto
    app_settings.showBigPhoto = json.showBigPhoto || "n";
    if(app_settings.showBigPhoto == "y") {
      id = "settingsBigphoto";
      ms.getElementById(id).className = "check";
      ms.getElementById(id).icon = "check";
    }

    // userName
    app_settings.userName = json.userName || "daiz";
    id = "input_username";
    ms.getElementById(id).value = app_settings.userName;
  });
}

function rescuePrevData() {
  appStorage({"key": APPKEY_PREV}, "get", function(e, keys) {
    var key = keys[0];
    var smpls = e[key];
    if(smpls == undefined || smpls == null) {
      ms.getElementById("input_prevdata").placeholder = "該当データなし";
    }else {
      ms.getElementById("input_prevdata").value = JSON.stringify(smpls);
    }
  });
}
