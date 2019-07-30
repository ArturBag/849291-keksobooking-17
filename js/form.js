'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var formElements = adForm.querySelectorAll('form fieldset, form select');
  var addressField = adForm.querySelector('#address');
  var selectType = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var rooms = adForm.querySelector('#room_number');
  var roomsList = adForm.querySelectorAll('#room_number option');
  var capacity = adForm.querySelector('#capacity');

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
    var selectedOption = parseInt(evt.currentTarget.value);
    if (selectedOption === 0) {
      selectedOption = roomsList.length;
    }
    roomsList[selectedOption - 1].selected = true;
  });

  rooms.addEventListener('change', function () {
    // var flag = false;
    // console.log(rooms.length)
    var capcityQty = capacity.value;
    var roomsQty = rooms.value;
    // console.log('capcityQty lenght', rooms.lenght, 'roomsQty lenght',capacity.lenght)

    // if (capcityQty <= roomsQty && capcityQty !== 0) {
    //   flag = true;
    //   console.log('correct')

    // } else if (capcityQty === 0 && roomsQty === 100) {
    //   flag = true;
    //   console.log('correct++')
    // }

    // else {
    //   rooms.setCustomValidity('Количество комнат не соответствует количеству гостей');
    //   flag = false;
    //   console.log('NOTcorrect')
    // }

    // console.log(flag)
    //console.log(capcityQty, roomsQty, capacity === 0, roomsQty < 100)
    //console.log(rooms.selectedIndex, capacity.selectedIndex, rooms.selectedIndex != capacity.selectedIndex)
    if (capacity.selectedIndex != rooms.length - 1 || roomsQty < capcityQty
    ) {
      rooms.setCustomValidity('Количество комнат не соответствует количеству гостей');
      // console.log(roomsQty, capcityQty);
    }



  })

  window.form = {
    adForm: adForm,
    formElements: formElements,
    addressField: addressField,
    capacity: capacity,
    removeFormElementsDisabled: removeFormElementsDisabled,
    setFormElementsDisabled: setFormElementsDisabled
  };
  window.form.setFormElementsDisabled(formElements);
  setMinPrice();
  setTimeInOut();
})();
