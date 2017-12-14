(function() {
  'use strict';
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  const inputElem = document.querySelector('.search');
  const ulElem = document.querySelector('.suggestions');
  
  fetch(endpoint).then(res => {
    if (res.status === 200) {
      return res.json();
    }
    // throw Error(res)
    console.log(res);
  }).then(data => {
    init(data);
  }).catch(err => {
    console.log(err);
  });

  function init(data) {
    inputElem.addEventListener('input', (evt) => {
      const value = evt.target.value
      const filter = data.filter(d => d.city.toLowerCase().includes(value.toLowerCase()));
      renderList(filter);
    });
  }


  function renderList(data) {
    let html = '';
    data.forEach(d => {
      html += `<li>${d.city} <span class="population">${d.population}</span></li>`
    });
    ulElem.innerHTML = html;
  }

})();