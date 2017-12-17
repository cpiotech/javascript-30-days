(function() {
  'use strict';

  const checkboxs = document.querySelectorAll('input[type="checkbox"]');

  let last = 0;

  checkboxs.forEach((checkbox, index) => {
    checkbox.addEventListener('click', (evt) => {
      check.call(checkbox, evt, index)
    });
  });

  function check(evt, index) {
    const checked = this.checked;
    if (evt.shiftKey) {
      for (let i = last; i < index; i++) {
        checkboxs[i].checked = checked;
      }
    } else {
      last = index;
    }
  }
  
})();