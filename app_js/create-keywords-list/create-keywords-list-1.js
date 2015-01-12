//// create-keywords-list-1.js
//// Generated in 2015-01-12 17:51:08.
//
// クエリリストをつくる
//
function creatingKeyList(data, id) {
  document.getElementById(id).innerHTML = '<paper-item label="すべてのごちそう" class="menu_item" id="btn_all_gochiso" data-label="ごちそう"></paper-item>';
  var tags = [];
  var str_tags = "," + tags.toString() + ",";
    if(data != undefined) {
        for(var j = 0; j < data.length; j++) {
          if(j > 0) {
                var yss = data[j].tags.ys;
                for(var i = 0; i < yss.length; i++) {
                    var rg = new RegExp("," + yss[i] + ",", "gi");
                    var res = str_tags.search(rg);
                    if(res == -1 && yss[i] != MAINKEY) {
                      tags.push(yss[i]);
                      str_tags = str_tags + yss[i] + ",";
                    }
                }
          }
        }
        var template = '<paper-item label="{L}" class="menu_item" data-label="{DL}"></paper-item>';
        var html = "";
        var max = tags.length;
        if(tags.length > 13) max = 13;
        for(var j = 0; j < max; j++) {
            var html = html + griddles_apis.make(template, {L: tags[j], DL: tags[j]});
        }
        html += '<hr><paper-item label="データをインポート" class="menu_item" id="btn_import"></paper-item>';
        html += '<paper-item label="インポートしたデータを削除" class="menu_item" id="btn_remove"></paper-item>';
        $($("#"+id)).append(html);

        /* add event listeners */
        document.getElementById("btn_import").addEventListener("click", function() {
          toggleDialog('dialog_import');
        }, false);
        document.getElementById("btn_remove").addEventListener("click", function() {
          removingData();
        }, false);

        return tags;
    }
}