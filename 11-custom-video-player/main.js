(function() {
  'use strict';

  const video = document.querySelector('video');
  console.log(video);
  // video.play();

  const toggleBtn = document.querySelector('.player button');
  const timeBtns = document.querySelectorAll('.player button.time');

  toggleBtn.addEventListener('click', toggleVideo);
  timeBtns.forEach(timeBtn => timeBtn.addEventListener('click', skip));

  function toggleVideo() {
    const classList = this.classList;
    if (classList.contains('toggle')) {
      video.play();
    } else {
      video.pause();
    }
    classList.toggle('toggle');
  }

  function skip() {
    const time = this.dataset.skip;
    video.currentTime += parseInt(time);
  }

})();