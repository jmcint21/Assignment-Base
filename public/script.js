const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const locations = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => locations.push(...data))

function findMatches(word) {
  return locations.filter(location =>
    location.name.toLowerCase().indexOf(word) > -1);
}

function displayMatches() {
  const matchArray = findMatches(searchInput.value);
  document.querySelector('.suggestions').innerHTML = matchArray.map(location => {
    return `
        <li class="bgcolor">
            <div class="name">${location.name}</div>
            <div class="category">${location.category}</div>
            <div class="address">${location.address_line_1}</div>
            <div class="city">${location.city}</div>
            <div class="zip">${location.zip}</div>
        </li>
        `;
  }).join('');
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);