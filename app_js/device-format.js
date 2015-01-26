/** apricot.R = oss-aa **/
function deviceFmt() {
  var card_design = [];
  var scrollbar_width = 30 - document.querySelector("#sbr").clientWidth;
  var stage_width = window.innerWidth - scrollbar_width;
  console.log("sbr: %dpx", scrollbar_width);

  /* windowのサイズに応じて、アプリ名の表示を切り替える */
  if(window.innerWidth < 424) {
    document.querySelector("#app_name").style.display = "none";
  }else { 
    document.querySelector("#app_name").style.display = "block";
  }
  /* windowのサイズに応じて、アプリアイコンの表示を切り替える */
  if(window.innerWidth < 314) {
    document.querySelector("#icon").style.display = "none";
  }else { 
    document.querySelector("#icon").style.display = "block";
  }

  var guc = document.querySelector("griddles-ui-card");
  card_design = computeFlexibleWidth(3, [2,2], stage_width, 193, 560); // 194px, 4px, 2px, 2px
  guc.cardWidth = card_design[0];
  guc.cardMarginBottom = card_design[1] + card_design[2];
  guc.streamMarginLeft = card_design[1];
  guc.streamMarginRight = card_design[2];
}
window.addEventListener("resize", deviceFmt, false);
/** apricot.R = oss-ca **/
function deviceFmt() {
  var card_design = [];
  var scrollbar_width = 30 - document.querySelector("#sbr").clientWidth;
  var stage_width = window.innerWidth - scrollbar_width; //document.body.clientWidth
  console.log("sbr: %dpx", scrollbar_width);
  var guc = document.querySelector("griddles-ui-card");
  card_design = computeFlexibleWidth(2, [2,2], stage_width, 193, 560); // 230px, 4px, 2px, 2px
  guc.cardWidth = card_design[0];
  guc.cardMarginBottom = card_design[1] + card_design[2];
  guc.streamMarginLeft = card_design[1];
  guc.streamMarginRight = card_design[2];
}
window.addEventListener("resize", deviceFmt, false);