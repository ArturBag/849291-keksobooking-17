'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var cardTemplate = document.querySelector('#card').content.
    querySelector('.popup');
  var fragment = document.createDocumentFragment();
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var HousingType = {
    'ANY': 'Любой тип жилья',
    'PALACE': 'Дворец',
    'FLAT': 'Квартира',
    'HOUSE': 'Дом',
    'BUNGALO': 'Бунгало'
  };

  window.renderAdvertCard = function (evt, cardsData) {
    cardsData = cardsData[evt.currentTarget.getAttribute('data-id')];
    var card = cardTemplate;
    var closePopupButton = card.querySelector('.popup__close');

    card.querySelector('.popup__avatar').src = cardsData.author.avatar;
    card.querySelector('.popup__title').innerText = cardsData.offer.title;
    card.querySelector('.popup__text--address').innerText = cardsData.offer.address;
    card.querySelector('.popup__text--price').innerHTML = cardsData.offer.price + ' &#x20bd;<span>/ночь</span>';
    card.querySelector('.popup__type').innerText = HousingType[cardsData.offer.type.toUpperCase()];
    card.querySelector('.popup__text--capacity').innerText = cardsData.offer.rooms
      + ' комнаты для ' + cardsData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').innerText = 'Заезд после ' + cardsData.offer.checkin
      + ', выезд до ' + cardsData.offer.checkout;
    var featuresList = card.querySelectorAll('.popup__feature');
    featuresList.forEach(function (it) {
      it.style.display = 'none';
    });

    cardsData.offer.features.forEach(function (it) {
      card.querySelector('.popup__feature--' + it).style.display = 'inline-block';
    });

    card.querySelector('.popup__description').innerText = cardsData.offer.description;

    var photoTemplate = card.querySelector('.popup__photo:first-child');
    cardsData.offer.photos.forEach(function (it) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = it;
      card.querySelector('.popup__photos').appendChild(photo);
    });
    photoTemplate.style.display = 'none';

    var closePopup = function () {
      card.style = 'display:none';
    };
    var onPopupClose = function (closeEvt) {
      closeEvt.preventDefault();
      closePopup();
    };

    var onPopupEscPress = function (escEvt) {
      escEvt.preventDefault();
      if (escEvt.keyCode === ESC_KEYCODE) {
        closePopup();
      }

    };
    card.style = 'display:block';


    closePopupButton.addEventListener('click', onPopupClose);

    document.addEventListener('keydown', onPopupEscPress);

    fragment.appendChild(card);
    mapFiltersContainer.insertBefore(fragment, null);
  };

  var onSuccess = function () { };

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
