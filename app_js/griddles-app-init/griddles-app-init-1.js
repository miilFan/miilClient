//// griddles-app-init-1.js
//// Generated in 2015-01-12 17:46:05.
/*
 * griddles-ui-card の main関数
 */
function griddlesAppInit() {
  console.log("appInit..");
  /* ツールバーの配色をランダムに決める */
  randomStyle();
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