'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var cardTemplate = document.querySelector('#card').content.
    querySelector('.popup');
  var fragment = document.createDocumentFragment();
  var mapFiltersContainer = document.querySelector('.map__filters-container');
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
    card.querySelector('.popup__title').innerText = cardData.offer.title;
    card.querySelector('.popup__text--address').innerText = cardData.offer.address;
    card.querySelector('.popup__text--price').innerHTML = cardData.offer.price + ' &#x20bd;<span>/ночь</span>';
    card.querySelector('.popup__type').innerText = HousingType[cardData.offer.type.toUpperCase()];
    card.querySelector('.popup__text--capacity').innerText = cardData.offer.rooms
      + ' комнаты для ' + cardData.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').innerText = 'Заезд после ' + cardData.offer.checkin
      + ', выезд до ' + cardData.offer.checkout;
    var featuresList = card.querySelectorAll('.popup__feature');
    featuresList.forEach(function (it) {
      it.style.display = 'none';
    });

    cardData.offer.features.forEach(function (it) {
      card.querySelector('.popup__feature--' + it).style.display = 'inline-block';
    });

    card.querySelector('.popup__description').innerText = cardData.offer.description;

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
    };

    var onPopupEscPress = function (escEvt) {
      escEvt.preventDefault();
      if (escEvt.keyCode === ESC_KEYCODE) {
        closePopup(card);
      }

    };
    card.style = 'display:block';


    closePopupButton.addEventListener('click', onPopupClose);

    document.addEventListener('keydown', onPopupEscPress);

    fragment.appendChild(card);
    mapFiltersContainer.insertBefore(fragment, null);
    oldCard = card;
  };

  var closePopup = function (elemToClose) {
    elemToClose.remove();
  };

  window.card = {
    renderAdvertCard: renderAdvertCard,
    closePopup: closePopup
  };

})();
