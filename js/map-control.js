'use strict';

(function () {

  var PIN_COORDINATE_X = 35;
  var PIN_COORDINATE_Y = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var adverts = [];
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var showPin = function (data) {
    mapPins.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = data[i].location.x - PIN_COORDINATE_X + 'px';
      pinElement.style.top = data[i].location.y - PIN_COORDINATE_Y + 'px';
      var imgAttribute = pinElement.querySelector('img');
      imgAttribute.src = data[i].author.avatar;
      imgAttribute.alt = data[i].offer.type;
      fragment.appendChild(pinElement);
    }
    mapPins.appendChild(fragment);
  };

  var moveMapPin = function (elem) {
    var isShowPin = true;

    elem.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      if (isShowPin) {
        window.mapControl.showPin(adverts);
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
    moveMapPin: moveMapPin,
    errorTemplate: errorTemplate
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

  var onSuccess = function (responseData) {
    adverts = responseData;
  };

  var onError = function (errorMessage) {
    var node = errorTemplate.cloneNode(true);
    var reloadButton = node.querySelector('.error__button');
    var onButtonClickReloader = function () {
      window.location.reload();
    };
    document.body.insertAdjacentElement('afterbegin', node);

    if (errorMessage) {
      reloadButton.addEventListener('click', onButtonClickReloader);
    }
  };

  window.mapControl.moveMapPin(mapPinMain);

  window.backend.load(onSuccess, onError);

})();
