const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
const locations = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => locations.push(...data))

function findMatches(wordToMatch, locations) {
    return locations.filter(place => {
    // here we need to figure out if the zip matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex)
});
}

//function numberWithCommas(x) {
//    return locations.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//}

function displayMatches() {
    const matchArray = findMatches(this.value, locations);
    const html = matchArray.map(place => {
        return `
            <li>
                <span class="name">${place.name}</span>
//                <span class="category">${place.categoryName}</span>
//                <span class="address">${place.address_line_1}</span>
//                <span class="city">${place.city}</span>
//                <span class="zip">${place.zip}</span>
            </li>
        `;
}).join('');
suggestions.innerHTML += html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggesttions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);