(function() {
  'use strict';

  const hourHandElem = document.querySelectorAll('.hour-hand')[0];
  const minHandElem = document.querySelectorAll('.min-hand')[0];
  const secondHandElem = document.querySelectorAll('.second-hand')[0];

  setInterval(() => {
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
    
  }, 1000);

  function _rotate(element, degree) {
    element.setAttribute('style', `transform: rotate(${degree + 90}deg)`);
  }

})();