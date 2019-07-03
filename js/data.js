'use strict';

(function () {
  window.data = {
    getRandomNumber: function (param1, param2) {
      return Math.round(Math.random() * (param2 - param1) + param1);
    },

  }
})();
