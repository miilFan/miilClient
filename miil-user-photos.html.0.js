(function() {

    Polymer("miil-user-photos", {
        next: 0,
        user: "",
        photos: [],
        baseURL: function() {
            return "http://api.miil.me/api/users/"+ this.user +"/photos/public.json"
        },
        ready: function() {
        },
        callback: function() {
            console.log("[Hint!] 'document.querySelector(\"miil-user-photos\").callback = function(n){ ... }'");
            console.log("[Hint!] 'document.querySelector(\"miil-user-photos\").photos'");
        },
        getPhotos: function() {
            var url = this.baseURL();
            if(this.next != 0) {
                url = url + "?page=" + this.next;
            }
            var tag = this;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'json';
            xhr.onload = function(e) {
               var res = this.response;
               var photos = res.photos;
               var items = [];
               for(var i = 0; i < photos.length; i++) {
                    var photo = photos[i];
                    var item = {
                        "photo"   : photo.url, 
                        "page"    : photo.page_url,
                        "received": photo
                    };
                    items.push(item);
               }
               tag.photos.push(items);

               if(res.next_url != undefined) {
                  var next_number = Number((res.next_url.split("&")[0]).split("?page=")[1]);
                  tag.next = next_number;
               }

               console.log("[getPhotos] completed!");
               tag.callback(tag.photos.length - 1);
            }
            xhr.send(); 
        }
    });
})();
    