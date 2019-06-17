'use strict';

var ADVERTS_NUMBER = 8;
var PIN_COORDINATE_X = 25;
var PIN_COORDINATE_Y = 35;
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

map.classList.remove('map--faded'); //  этот класс переключает карту из неактивного состояния в активное

var getRandomNumber = function (param1, param2) {
  return Math.round(Math.random() * (param2 - param1) + param1);
};

var createAdvert = function (typesArray) {
  var adverts = [];
  for (var i = 0; i < ADVERTS_NUMBER; i++) {
    adverts.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'type': typesArray[getRandomNumber(0, typesArray.length - 1)]
      },
      'location': {
        'x': getRandomNumber(0, 1200),
        'y': getRandomNumber(130, 630)
      }
    });
  }
  return adverts;
};

var showPin = function () {
  var fragment = document.createDocumentFragment();
  var advertsInfo = createAdvert(typeList);
  for (var i = 0; i < advertsInfo.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left:' + (advertsInfo[i].location.x - PIN_COORDINATE_X) + 'px;' + 'top:' + (advertsInfo[i].location.y - PIN_COORDINATE_Y) + 'px';
    var srcAttribute = pinElement.querySelector('img');
    srcAttribute.src = advertsInfo[i].author.avatar;
    var altAttribute = pinElement.querySelector('img');
    altAttribute.alt = advertsInfo[i].offer.type;
    fragment.appendChild(pinElement);
    mapPins.appendChild(fragment);
  }
  mapPins.appendChild(fragment);
};

showPin();


