//// griddles-app-card-clicked-2.js
//// Generated in 2015-01-12 18:24:11.
function griddlesAppCardClicked(card) {
   changeHeadImage(card[0].src);
   /** 
   miil側の仕様により、http://miil.me/g/ で始まるurlではうまく
   webintentが機能しない（ミイルアプリと連携されない）ことがあるため、
   /g/ を /p/ に置換して、http://miil.me/p/ にする必要がある。
   */
   var url = card[0].data.webpage;
   url = url.replace(/\/g\//, '/p/');
   window.plugins.webintent.startActivity({
     action: window.plugins.webintent.ACTION_VIEW,
     url: url},
     function() {},
     function() {alert('Failed to open URL via Android Intent')}
   );
}