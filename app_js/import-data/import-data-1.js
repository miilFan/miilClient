//// import-data-1.js
//// Generated in 2015-01-12 17:59:32.
function ImportingData() {
  var import_code = document.getElementById("dialog_input_import").value;
  if(import_code != "") {
      var import_code = JSON.parse(import_code);
      appStorage({"key": YUMMY2, "value": import_code}, "set", griddlesAppInit);
  }
}