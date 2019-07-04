'use strict';

(function () {

  var PIN_COORDINATE_X = 35;
  var PIN_COORDINATE_Y = 70;
  var typeList = ['palace', 'flat', 'house', 'bungalo'];
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  var showPin = function () {
    var fragment = document.createDocumentFragment();
    var advertsInfo = window.pin.createAdvert(typeList);
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

  var moveMapPin = function (elem) {
    var isShowPin = true;

    elem.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      if (isShowPin) {
        window.mapControl.showPin();
        isShowPin = false;
      }

      map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.form.removeFormElementsDisabled(window.form.formElements);
      window.form.capacity[2].selected = true;
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

  window.mapControl = {
    showPin: showPin,
    moveMapPin: moveMapPin
  };

  mapPinMain.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    var mapCords = map.getBoundingClientRect();
    var pinCoords = {
      x: evt.pageX - mapCords.x - PIN_COORDINATE_X,
      y: evt.pageY - PIN_COORDINATE_Y,
    };

    window.form.addressField.setAttribute('readonly', true);
    window.form.addressField.value = parseInt(pinCoords.x, 10) + ',' + parseInt(pinCoords.y, 10);
  });

  window.mapControl.moveMapPin(mapPinMain);

})();
