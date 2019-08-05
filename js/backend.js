'use strict';
(function () {

  var OK_STATUS = 200;
  var XHR_TIMEOUT = 10000;
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    SEND: 'https://js.dump.academy/keksobooking'
  };

  var ajaxSendData = function (onLoad, onError, methodType, data, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(methodType, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    ajaxSendData(onLoad, onError, 'GET', null, Url.GET);

  };

  var send = function (onLoad, onError, data) {
    ajaxSendData(onLoad, onError, 'POST', data, Url.SEND);
  };

  window.backend = {
    load: load,
    send: send
  };

})();
