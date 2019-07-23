'use strict';

(function () {
  var mapFiltersType = document.querySelector('.map__filter');
  var pinsList = [];

  mapFiltersType.addEventListener('change', function (evt) {
    var housingType = evt.currentTarget.value;
    var pinsForOutput = pinsList.slice().filter(function (it) {
      return housingType === 'any' || it.offer.type === housingType;
    });
    window.mapControl.showPin(pinsForOutput);
  });

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
})();
