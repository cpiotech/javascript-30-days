(function() {
  'use strict';
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  const inputElem = document.querySelector('.search');
  const ulElem = document.querySelector('.suggestions');

  inputElem.addEventListener('input', handleInput);

  const city = [];
  fetch(endpoint).then(res => {
    if (res.status === 200) {
      return res.json();
    }
    throw new Error(res.statusText);
  }).then(data => {
    city.push(...data);
  }).catch(err => {
    console.log(err);
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }  

  function filterData(data, value) {
    return data.filter(d => {
      const regex = new RegExp(value, 'gi');
      return d.city.match(regex) || d.state.match(regex);
    });
  }

  function handleInput(evt) {
    const value = evt.target.value;
    const filter = filterData(city, value);
    renderList(filter, value);
  }


  function renderList(data, value) {
    const html = data.map(d => {
      const regex = new RegExp(value, 'gi');
      const city = d.city.replace(regex, `<span class="hl">${value}</span>`);
      const state = d.state.replace(regex, `<span class="hl">${value}</span>`);
      return `
        <li>
          <span class="name">${city}, ${state}</span>
          <span class="population">${numberWithCommas(d.population)}</span>
        </li>
      `;
    }).join('');
    ulElem.innerHTML = html;
  }

})();