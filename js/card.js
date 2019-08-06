'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.
    querySelector('.popup');
  var fragment = document.createDocumentFragment();
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var popupCard = document.querySelector('.popup');
  var mapPins = document.querySelector('.map__pins');
  var oldCard = cardTemplate;
  var HousingType = {
    'ANY': 'Любой тип жилья',
    'PALACE': 'Дворец',
    'FLAT': 'Квартира',
    'HOUSE': 'Дом',
    'BUNGALO': 'Бунгало'
  };

  var renderAdvertCard = function (evt, cardData) {
    oldCard.remove();
    var card = cardTemplate.cloneNode(true);
    var closePopupButton = card.querySelector('.popup__close');

    card.querySelector('.popup__avatar').src = cardData.author.avatar;
    card.querySelector('.popup__title').textContent = cardData.offer.title;
    card.querySelector('.popup__text--address').textContent = cardData.offer.address;
    card.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = HousingType[cardData.offer.type.toUpperCase()];
    card.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms
      + ' комнаты для ' + cardData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin
      + ', выезд до ' + cardData.offer.checkout;
    var featuresList = card.querySelectorAll('.popup__feature');
    featuresList.forEach(function (it) {
      it.style.display = 'none';
    });

    cardData.offer.features.forEach(function (it) {
      card.querySelector('.popup__feature--' + it).style.display = 'inline-block';
    });

    card.querySelector('.popup__description').textContent = cardData.offer.description;

    var photoTemplate = card.querySelector('.popup__photo:first-child');
    cardData.offer.photos.forEach(function (it) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = it;
      card.querySelector('.popup__photos').appendChild(photo);
    });
    photoTemplate.style.display = 'none';

    var onPopupClose = function (closeEvt) {
      closeEvt.preventDefault();
      closePopup(card);
      closePopupButton.removeEventListener('click', onPopupClose);
    };

    var onPopupEscPress = function (escEvt) {
      if (escEvt.keyCode === window.util.ESC_KEYCODE) {
        closePopup(card);
        escEvt.preventDefault();
        document.removeEventListener('keydown', onPopupEscPress);
      }

    };

    closePopupButton.addEventListener('click', onPopupClose);

    document.addEventListener('keydown', onPopupEscPress);

    fragment.appendChild(card);
    mapFiltersContainer.insertBefore(fragment, null);
    oldCard = card;
  };


  var closePopup = function (elemToClose) {
    elemToClose.remove();
    var activePin = mapPins.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };


  window.card = {
    renderAdvertCard: renderAdvertCard,
    closePopup: closePopup,
    popupCard: popupCard
  };

})();
