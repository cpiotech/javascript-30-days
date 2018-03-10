(function(exports) {
  'use strict';

  const DOM = {
    video: document.querySelector('.player'),
    canvas: document.querySelector('.photo'),
    snap: document.querySelector('.snap'),
    strip: document.querySelector('.strip')
  };

  function getVideo() {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(localMediaStream => {
      console.log(localMediaStream);
      DOM.video.src = window.URL.createObjectURL(localMediaStream);
      DOM.video.play();
    }).catch(error => {
      console.error(error);
    });
  }

  function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i - 150] = pixels.data[i + 0]; // RED
      pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
      pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
  }

  function drawCanvas() {
    const width = DOM.video.videoWidth;
    const height = DOM.video.videoHeight;
    const ctx = DOM.canvas.getContext('2d');
    console.log(width, height);
    DOM.canvas.width = width;
    DOM.canvas.height = height;
    // return window.requestAnimationFrame(() => {
    //   ctx.drawImage(DOM.video, 0, 0, width, height);
    // });
    return setInterval(() => {
      ctx.drawImage(DOM.video, 0, 0, width, height);
      let pixels = ctx.getImageData(0, 0, width, height);
      console.log(pixels);
    }, 16);
  }

  function takePhoto() {
    DOM.snap.currentTime = 0;
    DOM.snap.play();

    const data = DOM.canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    const file = Date.now();
    link.href = data;
    link.setAttribute('download', file);
    link.innerHTML = `<img src="${data}" alt="${file}" />`;
    DOM.strip.insertBefore(link, DOM.strip.firstChild);
  }

  getVideo();

  DOM.video.addEventListener('canplay', drawCanvas);

  exports.takePhoto = takePhoto;

})(window);