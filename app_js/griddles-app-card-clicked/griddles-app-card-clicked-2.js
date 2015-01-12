//// griddles-app-card-clicked-2.js
//// Generated in 2015-01-12 18:24:11.
function griddlesAppCardClicked(card) {
   /* open web page */
   changeHeadImage(card[0].src);
   window.plugins.webintent.startActivity({
        action: window.plugins.webintent.ACTION_VIEW,
        url: card[0].data.webpage},
        function() {},
        function() {alert('Failed to open URL via Android Intent')}
    );
}