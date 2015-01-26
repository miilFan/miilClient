/** apricot.R = oss-aa **/
document.querySelector("griddles-ui-card").cardWidth = 194;
/** apricot.R = oss-ca **/
card_design = [];
var stage_width = document.body.clientWidth - 17;
card_design = computeFlexibleWidth(2, [2,2], stage_width, 193, 560); // 230, 4, 2, 2
document.querySelector("griddles-ui-card").cardWidth = card_design[0];
document.querySelector("griddles-ui-card").cardMarginBottom = card_design[1] + card_design[2];
document.querySelector("griddles-ui-card").streamMarginLeft = card_design[1];
document.querySelector("griddles-ui-card").streamMarginRight = card_design[2];
window.addEventListener("resize", function() {
  var stage_width = document.body.clientWidth - 17;
  card_design = computeFlexibleWidth(2, [2,2], stage_width, 193, 560); // 230, 4, 2, 2
  document.querySelector("griddles-ui-card").cardWidth = card_design[0];
  document.querySelector("griddles-ui-card").cardMarginBottom = card_design[1] + card_design[2];
  document.querySelector("griddles-ui-card").streamMarginLeft = card_design[1];
  document.querySelector("griddles-ui-card").streamMarginRight = card_design[2];
}, false);
