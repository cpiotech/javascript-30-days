(function() {
  'use strict';

  const hourHandElem = document.querySelector('.hour-hand');
  const minHandElem = document.querySelector('.min-hand');
  const secondHandElem = document.querySelector('.second-hand');

  setInterval(_setTime, 1000);

  function _setTime() {
    const time = new Date();

    const second = time.getSeconds();
    const secondDegree = (second / 60) * 360;

    const minute = time.getMinutes();
    const minuteDegree = (minute / 60) * 360;

    const hour = time.getHours();
    const hourDegree = (hour / 12) * 360 + (minute / 60) * 30;

    _rotate(secondHandElem, secondDegree);
    _rotate(minHandElem, minuteDegree);
    _rotate(hourHandElem, hourDegree);
  }

  function _rotate(element, degree) {
    element.setAttribute('style', `transform: rotate(${degree + 90}deg)`);
  }
})();