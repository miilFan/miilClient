//// griddles-app-card-clicked-1.js
//// Generated in 2015-01-12 17:53:18.
function griddlesAppCardClicked(card) {
   /* open web page */
   changeHeadImage(card[0].src);
   window.open(card[0].data.webpage);
}