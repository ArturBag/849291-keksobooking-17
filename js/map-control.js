'use strict';

(function () {

  var PIN_COORDINATE_X = 35;
  var PIN_COORDINATE_Y = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapOverlay = mapPins.querySelector('.map__overlay');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var showPin = function (data) {
    console.log(data)
    mapPins.innerHTML = '';
    mapPins.appendChild(mapOverlay);
    mapPins.appendChild(mapPinMain);
    var fragment = document.createDocumentFragment();
    // for (var i = 0; i < data.length; i++) {
    //   var pinElement = pinTemplate.cloneNode(true);
    //   pinElement.style.left = data[i].location.x - PIN_COORDINATE_X + 'px';
    //   pinElement.style.top = data[i].location.y - PIN_COORDINATE_Y + 'px';
    //   var imgAttribute = pinElement.querySelector('img');
    //   imgAttribute.src = data[i].author.avatar;
    //   imgAttribute.alt = data[i].offer.type;

    //   pinElement.setAttribute('data-id', i);

    //   (function (currentPinData, currentElement) {

    //     currentElement.addEventListener('click', function (evt) {
    //       var activePin = mapPins.querySelector('.map__pin--active');
    //       if (activePin) {
    //         activePin.classList.remove('map__pin--active');
    //       }
    //       window.card.renderAdvertCard(evt, currentPinData);
    //       currentElement.classList.add('map__pin--active');

    //     });

    //   })(data[i], pinElement);

    //   fragment.appendChild(pinElement);
    // }

    data.forEach(function (it) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = it.location.x - PIN_COORDINATE_X + 'px';
      pinElement.style.top = it.location.y - PIN_COORDINATE_Y + 'px';
      var imgAttribute = pinElement.querySelector('img');
      imgAttribute.src = it.author.avatar;
      imgAttribute.alt = it.offer.type;

      pinElement.setAttribute('data-id', data.indexOf(it));

      (function (currentPinData, currentElement) {
        currentElement.addEventListener('click', function (evt) {
          var activePin = mapPins.querySelector('.map__pin--active');
          if (activePin) {
            activePin.classList.remove('map__pin--active');
          }
          window.card.renderAdvertCard(evt, currentPinData);
          currentElement.classList.add('map__pin--active');

        });

      })(it, pinElement);

      fragment.appendChild(pinElement);
    });

    mapPins.appendChild(fragment);
  };

  var moveMapPin = function (elem) {

    elem.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      window.filters.pinsOutput();

      map.classList.remove('map--faded');
      window.form.newAdvert.classList.remove('ad-form--disabled');
      window.form.removeAdvertElementsDisabled(window.form.advertElements);
      window.form.removeAdvertElementsDisabled(window.filters.formElements);
      window.form.capacity[2].selected = true;
      window.form.addressField.setAttribute('readonly', 'true');
      var mapCanvasX = map.getBoundingClientRect().x;
      var mapCanvasY = map.getBoundingClientRect().y;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var left = moveEvt.clientX - mapCanvasX - PIN_COORDINATE_X;
        var top = moveEvt.clientY - mapCanvasY - PIN_COORDINATE_Y;

        if (top >= 630) {
          top = 630;
        }
        if (top <= 130) {
          top = 130;
        }

        elem.style.top = Math.round(top) + 'px';
        elem.style.left = Math.round(left) + 'px';

        window.form.addressField.value = parseInt(elem.style.left, 10) + ',' + parseInt(elem.style.top, 10);
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
    errorTemplate: errorTemplate,
    mapPins: mapPins,
    map: map,
    mapPinMain: mapPinMain
  };

  window.mapControl.moveMapPin(mapPinMain);

})();
