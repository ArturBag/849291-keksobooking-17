'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var DefaultCoordinate = {
    LEFT: '570px',
    TOP: '375px'
  };
  var adForm = document.querySelector('.ad-form');
  var formElements = adForm.querySelectorAll('form fieldset, form select');
  var addressField = adForm.querySelector('#address');
  var selectType = adForm.querySelector('#type');
  var titleField = adForm.querySelector('#title');
  var priceField = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var rooms = adForm.querySelector('#room_number');
  var roomsList = adForm.querySelectorAll('#room_number option');
  var capacity = adForm.querySelector('#capacity');
  var btnSubmit = adForm.querySelector('.ad-form__submit');
  var resetBtn = adForm.querySelector('.ad-form__reset');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successResult = false;

  addressField.value = parseInt(DefaultCoordinate.LEFT, 10) + ',' + parseInt(DefaultCoordinate.TOP, 10);

  var setSuccessMessage = function () {
    var node = successTemplate.cloneNode(true);

    var onEscapePress = function (evt) {

      if (evt.keyCode === ESC_KEYCODE) {
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
    var onEscapePress = function (evt) {

      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        window.card.closePopup(node);
        document.removeEventListener('keydown', onEscapePress);
      }
    };
    document.body.insertAdjacentElement('afterbegin', node);

    if (errorMessage) {
      reloadButton.addEventListener('click', onButtonClose);
      document.addEventListener('keydown', onEscapePress);
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

  var removeFormElementsDisabled = function (elementsArray) {
    for (var i = 0; i < elementsArray.length; i++) {
      var currentElement = elementsArray[i];
      currentElement.removeAttribute('disabled');
    }
  };

  var setFormElementsDisabled = function (elementsArray) {
    for (var i = 0; i < elementsArray.length; i++) {
      var currentElement = elementsArray[i];
      currentElement.setAttribute('disabled', true);
    }
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
    if (roomsQty < capcityQty || (capcityQty === 0 && roomsQty !== 100) || (capcityQty > 0 && roomsQty === 100)) {
      rooms.setCustomValidity('Количество комнат не соответствует количеству гостей');

    } else {
      rooms.setCustomValidity('');
    }

  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(onSuccess, onError, new FormData(adForm));
  });

  var setFormInactive = function () {
    window.mapControl.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.setFormElementsDisabled(formElements);
    window.mapControl.showPin({});
    // window.card.renderAdvertCard();
    window.mapControl.mapPinMain.style = 'left:' + DefaultCoordinate.LEFT + ';' + 'top: ' + DefaultCoordinate.TOP + ';';
    titleField.value = '';
    priceField.value = '';
    addressField.value = parseInt(DefaultCoordinate.LEFT, 10) + ',' + parseInt(DefaultCoordinate.TOP, 10);
    window.card.popupCard.remove();
  };

  resetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    setFormInactive();
  });

  var onSuccess = function () {
    setFormInactive();
    setSuccessMessage();
    window.card.popupCard.remove();
  };

  var onError = function (errorMessage) {
    setErrorMessage(errorMessage);
  };

  window.form = {
    adForm: adForm,
    formElements: formElements,
    addressField: addressField,
    capacity: capacity,
    removeFormElementsDisabled: removeFormElementsDisabled,
    setFormElementsDisabled: setFormElementsDisabled,
    DefaultCoordinate: DefaultCoordinate,
    successResult: successResult
  };
  window.form.setFormElementsDisabled(formElements);
  setMinPrice();
  setTimeInOut();

})();
