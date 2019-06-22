'use strict';

var ADVERTS_NUMBER = 8;
var PIN_COORDINATE_X = 25;
var PIN_COORDINATE_Y = 70;
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var formElements = document.querySelectorAll('form fieldset, form select');
var addressField = document.querySelector('#address');
var mapPinMain = mapPins.querySelector('.map__pin--main');


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
    pinElement.style.left = advertsInfo[i].location.x - PIN_COORDINATE_X + 'px';
    pinElement.style.top = advertsInfo[i].location.y - PIN_COORDINATE_Y + 'px';
    var imgAttribute = pinElement.querySelector('img');
    imgAttribute.src = advertsInfo[i].author.avatar;
    imgAttribute.alt = advertsInfo[i].offer.type;
    fragment.appendChild(pinElement);
  }
  mapPins.appendChild(fragment);
};

// Задание 4 Личный проект: подробности

var setFormElementsDisabled = function (elementsArray) {
  for (var i = 0; i < elementsArray.length; i++) {
    var currentElement = elementsArray[i];
    currentElement.setAttribute('disabled', true);
  }
};
setFormElementsDisabled(formElements);


var removeFormElementsDisabled = function (elementsArray) {
  for (var i = 0; i < elementsArray.length; i++) {
    var currentElement = elementsArray[i];
    currentElement.removeAttribute('disabled');
  }
};

var onMapPinMainClick = function () {
  map.classList.remove('map--faded');
  showPin();
  adForm.classList.remove('ad-form--disabled');
  removeFormElementsDisabled(formElements);
  mapPinMain.removeEventListener('click', onMapPinMainClick);
};

mapPinMain.addEventListener('click', onMapPinMainClick);
mapPinMain.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  var mapCords = map.getBoundingClientRect();
  var pinCoords = {
    x: evt.pageX - mapCords.x - PIN_COORDINATE_X,
    y: evt.pageY - PIN_COORDINATE_Y
  };

  addressField.setAttribute('readonly', true);
  addressField.value = parseInt(pinCoords.x, 10) + ',' + parseInt(pinCoords.y, 10);
});


