(function() {
  'use strict';

  const keys = document.querySelectorAll('.key');
  const audios = document.querySelectorAll('audio');

  window.addEventListener('keydown', (evt) => {
    const key = evt.keyCode;
    _play(key)
  });
  
  keys.forEach(elem => {
    elem.addEventListener('click', (evt) => {
      const key = evt.currentTarget.dataset.key;
      _play(key);
    });
  });

  function _play(key) {
    const audioElem = Array.from(audios).find(elem => {
      return elem.dataset.key === `${key}`;
    });
    const keyElem = Array.from(keys).find(elem => {
      return elem.dataset.key === `${key}`;
    });
    
    if (!audioElem || !keyElem) return;
 
    audioElem.addEventListener('ended', () => {
      _stop(keyElem);
    });
    audioElem.play().then(() => {
      _playing(keyElem);
    }).catch((err) => {
      console.log(err);
    });
  }

  function _playing(elem) {
    elem.classList.add('playing');
  }

  function _stop(elem) {
    elem.classList.remove('playing');
  }

})();