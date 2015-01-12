//// main-event-listeners-1.js
//// Generated in 2015-01-12 17:42:02.
/*　
 * Event Listeners
 */
document.getElementById("dialog_btn_import").addEventListener("click", function() {
   ImportingData();
}, false);

document.getElementById("btn_search").addEventListener("click", function() {
   toggleDialog('dialog_search_twitter');
}, false);

document.getElementById("dialog_btn_search").addEventListener("click", function() {
   var keyword = document.getElementById("dialog_input_search").value;
   if(keyword != '') {
     var query = keyword + ' ' + '#miil';
     toggleDialog('dialog_wait');
     getTweets(keyword, query);
   }
}, false);

document.getElementById("btn_user").addEventListener("click", function() {
   var username = document.getElementById('username').value || '';
   getMiilPhotos_miiluser.main(1, username, miil_user);
}, false);


document.getElementById("dialog_btn_display_tw").addEventListener("click", function() {
   display_photos_tw();
}, false);

document.getElementById("about").addEventListener("click", function() {
   appinfo.print("appinfo");
   toggleDialog('dialog_about');
}, false);

window.addEventListener("click", function(e) {
   var id = e.target.id;
   var dataset = e.target.dataset;
   if(dataset.label != undefined && dataset.label != TAGMANAGE) {
       var now = document.querySelector("griddles-ui-card").query;
       if(now != dataset.label) {
         yummy2.query = dataset.label;
         miils();
       }else {
         console.log("同一のクエリ.");
       }
   }
   if(id == 'miiluser_set') {
     toggleDialog('dialog_user');
   }
},false);