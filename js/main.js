'use strict';

var ADVERTS_NUMBER = 8;
var PIN_COORDINATE_X = 35;
var PIN_COORDINATE_Y = 70;
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var formElements = adForm.querySelectorAll('form fieldset, form select');
var addressField = adForm.querySelector('#address');
var mapPinMain = mapPins.querySelector('.map__pin--main');
var selectType = adForm.querySelector('#type');
var priceField = adForm.querySelector('#price');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var capacity = adForm.querySelector('#capacity');


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

mapPinMain.addEventListener('mouseup', function (evt) {
  evt.preventDefault();
  var mapCords = map.getBoundingClientRect();
  var pinCoords = {
    x: evt.pageX - mapCords.x - PIN_COORDINATE_X,
    y: evt.pageY - PIN_COORDINATE_Y,
  };

  addressField.setAttribute('readonly', true);
  addressField.value = parseInt(pinCoords.x, 10) + ',' + parseInt(pinCoords.y, 10);
});


// Задание 4 Личный проект: доверяй, но проверяй

var setMinPrice = function () {
  var PriceSuitability = {
    'BUNGALO': 0,
    'FLAT': 1000,
    'HOUSE': 5000,
    'PALACE': 10000
  };
  selectType.addEventListener('change', function (evt) {
    priceField.placeholder = PriceSuitability[evt.currentTarget.value.toUpperCase()];
    priceField.min = PriceSuitability[evt.currentTarget.value.toUpperCase()];
  });
};
setMinPrice();

var setTimeInOut = function () {
  timeIn.addEventListener('change', function (evt) {
    timeOut[evt.currentTarget.selectedIndex].selected = true;
  });
};
setTimeInOut();

// Задание 5.Личный проект: максимум подвижности

var moveMapPin = function (elem) {
  var isShowPin = true;

  elem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (isShowPin) {
      showPin();
      isShowPin = false;
    }

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeFormElementsDisabled(formElements);
    capacity[2].selected = true;
    var mapCanvasX = map.getBoundingClientRect().x;
    var mapCanvasY = map.getBoundingClientRect().y;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var left = moveEvt.clientX - mapCanvasX - PIN_COORDINATE_X;
      var top = moveEvt.clientY - mapCanvasY - PIN_COORDINATE_Y;

      if (top >= 630) {
        top = 630;
      } else if (top <= 130) {
        top = 130;
      }

      elem.style.top = top + 'px';
      elem.style.left = left + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
};
moveMapPin(mapPinMain);
