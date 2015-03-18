// custom transformation: scale header's title
var titleStyle = ms.querySelector('.title').style;
addEventListener('core-header-transform', function(e) {
  var d = e.detail;
  var ma = d.height - d.condensedHeight;
  var scale = Math.max(0.75, (ma - d.y) / (ma / 0.25)  + 0.75);
  titleStyle.transform = titleStyle.webkitTransform = 'scale(' + scale + ') translateZ(0)';
});
