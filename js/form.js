'use strict';

(function () {

  var MAX_ROOMS_QTY = 100;
  var MIN_GUESTS_QTY = 0;
  var DefaultCoordinate = {
    LEFT: '570px',
    TOP: '375px'
  };
  var newAdvert = document.querySelector('.ad-form');
  var allInputs = newAdvert.querySelectorAll('input, select');
  var advertElements = newAdvert.querySelectorAll('form fieldset, form select');
  var addressField = newAdvert.querySelector('#address');
  var selectType = newAdvert.querySelector('#type');
  var titleField = newAdvert.querySelector('#title');
  var priceField = newAdvert.querySelector('#price');
  var timeIn = newAdvert.querySelector('#timein');
  var timeOut = newAdvert.querySelector('#timeout');
  var rooms = newAdvert.querySelector('#room_number');
  var roomsList = newAdvert.querySelectorAll('#room_number option');
  var capacity = newAdvert.querySelector('#capacity');
  var btnSubmit = newAdvert.querySelector('.ad-form__submit');
  var resetBtn = newAdvert.querySelector('.ad-form__reset');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successResult = false;

  addressField.value = parseInt(DefaultCoordinate.LEFT, 10) + ',' + parseInt(DefaultCoordinate.TOP, 10);

  var setSuccessMessage = function () {
    var node = successTemplate.cloneNode(true);

    var onEscapePress = function (evt) {

      if (evt.keyCode === window.util.ESC_KEYCODE) {
        evt.preventDefault();
        window.card.closePopup(node);
        document.removeEventListener('keydown', onEscapePress);

      }
    };

    document.addEventListener('keydown', onEscapePress);

    var onPopupCloseClick = function () {
      window.card.closePopup(node);
      node.removeEventListener('click', onPopupCloseClick);
    };

    node.addEventListener('click', onPopupCloseClick);
    document.body.insertAdjacentElement('afterbegin', node);

  };

  var setErrorMessage = function (errorMessage) {
    var node = errorTemplate.cloneNode(true);
    var reloadButton = node.querySelector('.error__button');
    var onButtonClose = function () {
      window.card.closePopup(node);
      reloadButton.removeEventListener('click', onButtonClose);

    };

    var onErrorPopupClick = function () {
      window.card.closePopup(node);
      document.removeEventListener('click', onErrorPopupClick);
    };

    var onEscapePress = function (evt) {

      if (evt.keyCode === window.util.ESC_KEYCODE) {
        evt.preventDefault();
        window.card.closePopup(node);
        document.removeEventListener('keydown', onEscapePress);
      }
    };
    document.body.insertAdjacentElement('afterbegin', node);

    if (errorMessage) {
      reloadButton.addEventListener('click', onButtonClose);
      document.addEventListener('keydown', onEscapePress);
      document.addEventListener('click', onErrorPopupClick);
    }
  };

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

  var setTimeInOut = function () {
    timeIn.addEventListener('change', function (evt) {
      timeOut[evt.currentTarget.selectedIndex].selected = true;
    });
  };

  // var removeAdvertElementsDisabled = function (elementsArray) {
  //   for (var i = 0; i < elementsArray.length; i++) {
  //     var currentElement = elementsArray[i];
  //     currentElement.removeAttribute('disabled');
  //   }
  // };

  var removeAdvertElementsDisabled = function (elementsArray) {
    console.log('reomve', elementsArray)
    elementsArray.forEach(function (it) {
      it.removeAttribute('disabled');
    });
  };

  // var setAdvertElementsDisabled = function (elementsArray) {
  //   for (var i = 0; i < elementsArray.length; i++) {
  //     var currentElement = elementsArray[i];
  //     currentElement.setAttribute('disabled', true);
  //   }
  // };

  var setAdvertElementsDisabled = function (elementsArray) {
    elementsArray.forEach(function (it) {
      it.setAttribute('disabled', true);
    });
  };

  capacity.addEventListener('change', function (evt) {
    var selectedOption = parseInt(evt.currentTarget.value, 10);
    if (selectedOption === 0) {
      selectedOption = roomsList.length;
    }
    roomsList[selectedOption - 1].selected = true;
  });

  btnSubmit.addEventListener('click', function () {
    var capcityQty = parseInt(capacity.value, 10);
    var roomsQty = parseInt(rooms.value, 10);
    if (roomsQty < capcityQty || (capcityQty === MIN_GUESTS_QTY && roomsQty !== MAX_ROOMS_QTY) || (capcityQty > MIN_GUESTS_QTY && roomsQty === MAX_ROOMS_QTY)) {
      rooms.setCustomValidity('Количество комнат не соответствует количеству гостей');

    } else {
      rooms.setCustomValidity('');
    }

  });

  allInputs.forEach(function (it) {
    it.addEventListener('invalid', function (evt) {
      evt.target.style = 'outline:2px solid red';

    });
  });


  newAdvert.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(onSuccess, onError, new FormData(newAdvert));
  });

  var setFormInactive = function () {
    window.mapControl.map.classList.add('map--faded');
    newAdvert.classList.add('ad-form--disabled');
    window.form.setAdvertElementsDisabled(advertElements);
    window.mapControl.showPin([]);
    window.mapControl.mapPinMain.style = 'left:' + DefaultCoordinate.LEFT + ';' + 'top: ' + DefaultCoordinate.TOP + ';';
    titleField.value = '';
    priceField.value = '';
    addressField.value = parseInt(DefaultCoordinate.LEFT, 10) + ',' + parseInt(DefaultCoordinate.TOP, 10);
    allInputs.forEach(function (it) {
      it.removeAttribute('style');
    });
  };

  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    setFormInactive();
    removeActiveCard();
  });

  var removeActiveCard = function () {
    var popupToClose = document.querySelector('.popup');
    if (popupToClose !== null) {
      popupToClose.remove();
    }
  };

  var onSuccess = function () {
    setFormInactive();
    setSuccessMessage();
    removeActiveCard();
    window.filters.resetForm();
  };

  var onError = function (errorMessage) {
    setErrorMessage(errorMessage);
  };

  window.form = {
    newAdvert: newAdvert,
    advertElements: advertElements,
    addressField: addressField,
    capacity: capacity,
    removeAdvertElementsDisabled: removeAdvertElementsDisabled,
    setAdvertElementsDisabled: setAdvertElementsDisabled,
    DefaultCoordinate: DefaultCoordinate,
    successResult: successResult,
    removeActiveCard: removeActiveCard
  };
  window.form.setAdvertElementsDisabled(advertElements);
  window.form.setAdvertElementsDisabled(window.filters.formElements);
  setMinPrice();
  setTimeInOut();

})();
