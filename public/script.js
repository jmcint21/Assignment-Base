const endpoint ="https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
const locations = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => locations.push(...data));

function findMatches(wordToMatch, locations) {
  return locations.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex);
  });
}

function numberWithCommas(x) {
  return locations.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, locations);
  console.table(matchArray);
  const html = matchArray
    .map((place) => {
      return `
            <li>
                <div class="name">${place.name}, ${place.city}</div>
                <div class="category">${place.category}</div>
                <div class="address">${place.address_line_1}</div>
                <div class="city">${place.city}</div>
                <div class="zip">${place.zip}</div>
            </li>
        `;
    })
    .join("");
  suggestions.innerHTML += html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
