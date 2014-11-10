function forward() {
  document.querySelector("miil-user-photos").getPhotos();
}

function reset() {
  document.querySelector("miil-user-photos").photos = [];
  document.querySelector("miil-user-photos").next = 0;
  document.getElementById("demo_photos").innerHTML = "";
}

function set_imgs(now_number, n) {
    var new_photos = (document.querySelector("miil-user-photos").photos)[n];
    if(now_number < new_photos.length) {
        var web_url = new_photos[now_number].photo;
        var page_url = new_photos[now_number].page;
        var xhr = new XMLHttpRequest();
            xhr.open('GET', web_url, true);
            xhr.responseType = 'blob';
            xhr.onload = function(e) {
                var blob_url = window.webkitURL.createObjectURL(this.response);
                var img = "<img data-role='photo' data-page='"+ page_url +"' src='"+ blob_url +"' style='width: 194px; margin: 2px; cursor: pointer'>";
                document.getElementById("demo_photos").innerHTML = document.getElementById("demo_photos").innerHTML + img;
                now_number = now_number + 1;
                set_imgs(now_number, n);
            }
            xhr.send();
    }else {
        now_number++;
        document.getElementById("demo_next").icon = 'arrow-forward';
        document.getElementById("demo_next").removeAttribute("disabled");
    }
}

function toggleDialog(id) {
    var dialog = document.querySelector('#' + id);
    dialog.toggle();
}


//
// Event Listeners
//
document.getElementById("demo_next").addEventListener("click", function(e) {
    forward();
}, false);

document.getElementById("demo_clear").addEventListener("click", function(e) {
    reset();
    toggleDialog('dialog_settings');
}, false);

document.getElementById("username").addEventListener("change", function(e) {
  var username = document.getElementById("username").value || "daiz";
  document.querySelector("miil-user-photos").user = username;
}, false);

document.addEventListener("click", function(e) {
    var t = e.target;
    if(t.dataset && t.dataset.role && t.dataset.role == "photo") {
        window.open(t.dataset.page);
    }
}, false);


document.querySelector("miil-user-photos").callback = function(n) {
    console.info("[callback]");
    document.getElementById("demo_next").icon = 'block';
    document.getElementById("demo_next").setAttribute("disabled", true);
    set_imgs(0, n);
}

document.getElementById('demo_username').addEventListener('click', function() {
  toggleDialog('dialog_settings');
}, false);

document.getElementById('dialog_btn_done').addEventListener('click', function() {
  reset();
  forward();
}, false);
/*
window.addEventListener('load', function() {
  toggleDialog('dialog_settings');
}, false);
*/
/*
Polymer("paper-dialog", {
  ready: function() {
     window.addEventListener('load', function() {
       toggleDialog('dialog_settings');
     }, false);
  }
});
*/
document.querySelector('paper-dialog').ready = function() {
    toggleDialog('dialog_settings');
}
