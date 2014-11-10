
    result = document.createElement('div');
    result.id = 'result';

    function pass() {
      document.body.appendChild(result);
      result.className = 'pass';
    }
    function fail() {
      result.className = 'fail';
    }

    pgae = PolymerGestures.addEventListener.bind(PolymerGestures);
    var fg = document.getElementById('box');

    pgae(document.body, 'click', function() {
      console.error('ghostclick');
      fail();
    });

    pgae(box, 'tap', function(ev) {
      document.body.removeChild(box);
      pass();
    });
  