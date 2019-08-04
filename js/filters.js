'use strict';

(function () {

  var filtersForm = document.querySelector('.map__filters');
  var housingTypeFilter = filtersForm.querySelector('#housing-type');
  var housingPriceFilter = filtersForm.querySelector('#housing-price');
  var housingRoomsFilter = filtersForm.querySelector('#housing-rooms');
  var housingGuestsFilter = filtersForm.querySelector('#housing-guests');
  var housingFeatures = filtersForm.querySelector('#housing-features');
  var allFeatures = filtersForm.querySelectorAll('#housing-features input');
  var selectedFeatures = [];
  var pinsList = [];
  var filterType = 'any';
  var filterPrice = 'any';
  var filterRooms = 'any';
  var filterGuests = 'any';
  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

  var filterByType = function (it) {
    return filterType === 'any' || it.offer.type === filterType;
  };

  var filterByPrice = function (it) {

    if (filterPrice === 'middle') {
      return it.offer.price >= Price.LOW && it.offer.price <= Price.HIGH;

    }
    if (filterPrice === 'low') {
      return it.offer.price < Price.LOW;
    }
    if (filterPrice === 'high') {
      return it.offer.price > Price.HIGH;
    }
    return true;

  };

  var filterByRooms = function (it) {
    return filterRooms === 'any' || it.offer.rooms === parseInt(filterRooms, 10);
  };

  var filterByGuests = function (it) {
    return filterGuests === 'any' || it.offer.guests === parseInt(filterGuests, 10);
  };

  housingFeatures.addEventListener('change', function () {

    var selectedArray = [];
    allFeatures.forEach(function (feature) {

      if (feature.checked) {
        selectedArray.push(feature.value);
      }

    });
    selectedFeatures = selectedArray;

    filterPins();
  });


  var filterByFeature = function (it) {
    return !selectedFeatures.some(function (feature) {
      return !it.offer.features.includes(feature);
    });
  };

  var filterPins = window.debounce(function () {
    var filteredPins = pinsList
      .filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByRooms)
      .filter(filterByGuests)
      .filter(filterByFeature).slice(0, 5);

    window.form.removeActiveCard();
    window.mapControl.showPin(filteredPins);
  });

  housingTypeFilter.addEventListener('change', function (evt) {

    filterType = evt.currentTarget.value;
    filterPins();

  });

  housingPriceFilter.addEventListener('change', function (evt) {

    filterPrice = evt.currentTarget.value;
    filterPins();

  });

  housingRoomsFilter.addEventListener('change', function (evt) {

    filterRooms = evt.currentTarget.value;
    filterPins();

  });

  housingGuestsFilter.addEventListener('change', function (evt) {

    filterGuests = evt.currentTarget.value;
    filterPins();

  });

  var resetFilters = function () {
    filterType = 'any';
    filterPrice = 'any';
    filterRooms = 'any';
    filterGuests = 'any';
    document.querySelector('.map__filters').reset();
  };

  var onSuccess = function (pinsJson) {
    pinsList = pinsJson;

  };

  var onError = function (errorMessage) {
    var node = window.mapControl.errorTemplate.cloneNode(true);
    var reloadButton = node.querySelector('.error__button');
    var onButtonClickReloader = function () {
      window.location.reload();
    };
    document.body.insertAdjacentElement('afterbegin', node);

    if (errorMessage) {
      reloadButton.addEventListener('click', onButtonClickReloader);
    }
  };


  window.backend.load(onSuccess, onError);
  window.filters = {
    filtersForm: filtersForm,
    filterPins: filterPins,
    resetFilters: resetFilters
  };
})();
