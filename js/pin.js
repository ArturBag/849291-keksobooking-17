'use strict';

(function () {
  var ADVERTS_NUMBER = 8;
  // var createAdvert = function (typesArray) {
  //   var adverts = [];
  //   for (var i = 0; i < ADVERTS_NUMBER; i++) {
  //     adverts.push({
  //       'author': {
  //         'avatar': 'img/avatars/user0' + (i + 1) + '.png'
  //       },
  //       'offer': {
  //         'type': typesArray[window.data.getRandomNumber(0, typesArray.length - 1)]
  //       },
  //       'location': {
  //         'x': window.data.getRandomNumber(0, 1200),
  //         'y': window.data.getRandomNumber(130, 630)
  //       }
  //     });
  //   }
  //   return adverts;
  // };

  var createAdvert = function (responseData) {
    var adverts = [];
    for (var i = 0; i < ADVERTS_NUMBER; i++) {
      adverts.push({
        'author': {
          avatar: responseData[i].author.avatar
        },
        'offer': {
          type: responseData[i].offer.type
        },
        'location': {
          x: responseData[i].location.x,
          y: responseData[i].location.y
        }
      });
    }
    return adverts;

  };

  var onSuccess = function (responseData) {
    createAdvert(responseData);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.pin = {
    createAdvert: createAdvert
  };

  window.backend.load(onSuccess, onError);

})();
