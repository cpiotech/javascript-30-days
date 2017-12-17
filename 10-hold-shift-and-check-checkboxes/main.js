(function() {
  'use strict';

  const checkboxs = document.querySelectorAll('input[type="checkbox"]');

  let keydown = false;
  let last = 0;

  checkboxs.forEach((checkbox, index) => {
    checkbox.addEventListener('change', (evt) => checked.call(checkbox, index));
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Shift') {
      keydown = true;
    }
  });

  window.addEventListener('keyup', (evt) => {
    if (evt.key === 'Shift') {
      keydown = false;
    }
  });

  function checked(index) {
    const checked = this.checked;
    if (keydown) {
      for (let i = last; i < index; i++) {
        checkboxs[i].checked = checked;
      }
    } else {
      last = index;
    }
  }

})();