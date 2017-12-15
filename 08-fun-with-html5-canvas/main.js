(function() {
  'use strict';
  const canvas = document.querySelector('#draw');
  const clearBtn = document.querySelector('#clear');
  const captureBtn = document.querySelector('#capture');
  // access rendering context
  const ctx = canvas.getContext('2d');
  console.log(ctx);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(canvas);
  ctx.strokeStyle = '#BADA55';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 100;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = true;

  canvas.addEventListener('mousedown', (e) => {
    console.log('mousedown');
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; 
  });

  canvas.addEventListener('mousemove', draw);

  canvas.addEventListener('mouseup', () => {
    console.log('mouseup');
    isDrawing = false;
  });
  canvas.addEventListener('mouseout', () => isDrawing = false);

  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  captureBtn.addEventListener('click', capture);

  function draw(e) {
    if (!isDrawing) return;
    // console.log(e);
    ctx.lineWidth = 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue += 1;
    if (hue >= 360) {
      hue = 0;
    }
  }

  function capture() {
    const data = canvas.toDataURL();
    const time = new Date().getTime().toString();
    this.href = data;
    this.download = time;
    console.log(data);
  }

})();