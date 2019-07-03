'use strict';

(function () {
  var ADVERTS_NUMBER = 8;

  window.pin.createAdvert = function (typesArray) {
    var adverts = [];
    for (var i = 0; i < ADVERTS_NUMBER; i++) {
      adverts.push({
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'type': typesArray[window.data.getRandomNumber(0, typesArray.length - 1)]
        },
        'location': {
          'x': window.data.getRandomNumber(0, 1200),
          'y': window.data.getRandomNumber(130, 630)
        }
      });
    }
    return adverts;
  };
})();
