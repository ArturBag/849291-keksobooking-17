'use strict';

var ADVERTS_NUMBER = 8;
var PIN_COORDINATE = 20;
var adverts = [];
var fragment = document.createDocumentFragment();
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

map.classList.remove('map--faded'); //  этот класс переключает карту из неактивного состояния в активное

var getRandomNumber = function (param1, param2) {
  return Math.round(Math.random() * (param2 - param1) + param1);
};

//  функция добавляет в массив генерируемый объект объявление и клонирует его
var createAdvert = function (types, quantity, advertsArr) {

  for (var i = 0; i < quantity; i++) {
    adverts.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'type': types[getRandomNumber(0, types.length - 1)]
      },
      'location': {
        'x': getRandomNumber(0, 1200),
        'y': getRandomNumber(130, 630)
      }
    });

    //  клонирование и добавление в DOM
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left:' + (advertsArr[i].location.x + PIN_COORDINATE) + 'px;' + 'top:' + (advertsArr[i].location.y + PIN_COORDINATE) + 'px';
    var srcAttribute = pinElement.getElementsByTagName('img')[0];
    srcAttribute.src = advertsArr[i].author.avatar;
    var altAttribute = pinElement.getElementsByTagName('img')[0];
    altAttribute.alt = advertsArr[i].offer.type;
    fragment.appendChild(pinElement);
    mapPins.appendChild(fragment);
  }

};

createAdvert(typeList, ADVERTS_NUMBER, adverts);
