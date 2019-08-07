'use strict';

(function () {
  var IMAGE_WIDTH = '70';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form-header__upload input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__upload img');
  var fileChooserAdvert = document.querySelector('.ad-form__photo-container input[type=file]');
  var previewAdvert = document.querySelector('.ad-form__photo-container .ad-form__photo');
  var advertPhotoContainer = document.querySelector('.ad-form__photo-container');

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  fileChooserAdvert.addEventListener('change', function () {
    previewAdvert.style.display = 'none';
    Array.from(fileChooserAdvert.files).forEach(function (file) {
      var fileName = file.name.toLowerCase();
      var currentAdvert = null;

      var matchedElements = function (it) {
        return fileName.endsWith(it);
      };
      var matches = FILE_TYPES.some(matchedElements);

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var img = document.createElement('img');
          img.src = reader.result;
          img.width = IMAGE_WIDTH;
          currentAdvert = previewAdvert.cloneNode();
          currentAdvert.appendChild(img);
          advertPhotoContainer.appendChild(currentAdvert);
          currentAdvert.style.display = 'inline-block';
        });

        reader.readAsDataURL(file);
      }
    });

  });

})();
