'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.
    querySelector('.popup');
  var cardsInfo = [];
  var fragment = document.createDocumentFragment();
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var renderAdvertCard = function (cardsData) {

    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__avatar').src = cardsData.author.avatar;
    card.querySelector('.popup__title').innerText = cardsData.offer.title;
    card.querySelector('.popup__text--address').innerText = cardsData.offer.address;
    card.querySelector('.popup__text--price').innerHTML = cardsData.offer.price + ' &#x20bd;<span>/ночь</span>';
    card.querySelector('.popup__type').innerText = cardsData.offer.type;
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

    fragment.appendChild(card);
    mapFiltersContainer.insertBefore(fragment, null);
  };


  var onSuccess = function (responseData) {
    cardsInfo = responseData[3];
    renderAdvertCard(cardsInfo);
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
