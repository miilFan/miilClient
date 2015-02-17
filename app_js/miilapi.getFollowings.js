/** apricot.R = 0 **/
// [keep: getMiilFollowings_miiluser.js]

/** apricot.R = 1 **/
/* Event */
document.getElementById('btn_following_user').addEventListener('click', function(e) {
  var username = document.getElementById('username').value || 'daiz';
  getMiilFollowings_miiluser.main(username);
}, false);

/**
 * miilのユーザー名からフォロー中のユーザーを取得
 * ユーザーID, ユーザー名, アイコン画像のURL を取得する
 * [!] ログインしてOathを貰わないとアクセスできない。実装見送り。
 */
getMiilFollowings_miiluser = {
  user: '',
  user_id: '',

  urls: function(n) {
    var url  = '';
    switch(n) {
      case 0:
        url = "http://api.miil.me/api/users/"+ this.user +"/public.json";
        break;
      case 1:
        url = "http://api.miil.me/api/users/"+ this.user_id +"/followings.json";
        break;
    }
    return url;
  },

  main: function(user) {
    this.user = user || 'daiz';
    var publicURL = this.urls(0);
    /* 解析開始 */
    this.parseUserPublic(publicURL);
  },

  /* public.json を解析する */
  parseUserPublic: function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function(e) {
      var res = this.response;
      getMiilFollowings_miiluser.user_id = res.user.user_id;
      var followingsURL = getMiilFollowings_miiluser.urls(1);
      /* 次の解析に移る */
      getMiilFollowings_miiluser.parseFollowings(followingsURL);
    };
    xhr.send();
  },

  /* followings.json を解析する */
  parseFollowings: function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function(e) {
      var res = this.response;
      if(res.error != undefined) {
        console.error(res.error);
        return;
      }
      var users = res.users;
      var followings = [];
      var f, u;
      for(var i=0; i < users.length; i++) {
        f = {};
        u = users[i];
        f.user_id = u.user_id;
        f.user_name = u.username;
        f.user_icon = u.user_icon_url;
        followings.push(f);
      }
      /* 表示処理を行う関数に渡す */
      getMiilFollowings_miiluser.showFollowings(followings);
    };
    xhr.send();
  },

  /* フォロー中のユーザーリストを表示する */
  showFollowings: function(a) {
    console.dir(a);
  }
};
