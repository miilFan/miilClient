//// show-miils-1.js
//// Generated in 2015-01-12 18:05:08.
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