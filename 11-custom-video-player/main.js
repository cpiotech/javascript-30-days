(function() {
  'use strict';

  const player = document.querySelector('.player');

  const video = player.querySelector('video');
  const progress = player.querySelector('.progress');
  const progressBar = player.querySelector('.progress__filled');
  const toggle = player.querySelector('.toggle');
  const skipButtons = player.querySelectorAll('[data-skip]');
  const sliders = player.querySelectorAll('.player__slider');

  function togglePlay() {
    const method = (video.paused) ? 'play' : 'pause';
    video[method]();
  }

  function updateIcon() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon; 
  } 

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  function skip() {
    const time = this.dataset.skip;
    video.currentTime += parseFloat(time);
  }

  function handleRangeUpdate() {
    video[this.name] = this.value;
  }

  function scrub(evt) {
    const scrubTime = (evt.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateIcon);
  video.addEventListener('pause', updateIcon);
  video.addEventListener('timeupdate', handleProgress);

  toggle.addEventListener('click', togglePlay);
  skipButtons.forEach(button => button.addEventListener('click', skip));
  sliders.forEach(range => range.addEventListener('change', handleRangeUpdate));
  sliders.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

  let mousedown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);
})();