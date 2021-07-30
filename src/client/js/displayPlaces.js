const orderByPopulation = (places) => {
  const ordered = places.sort((a, b) => b.population - a.population);
  return ordered;
};

export const createArrayOfPlaces = (places) => {
  const list = [];
  places.forEach((place) => {
    list.push({
      name: place.name,
      adminName1: place.adminName1,
      countryName: place.countryName
    });
  });
  return places;
};

const displayPlaces = (results) => {
  clearListDom('.places-list ul li');
  const container = document.querySelector('.places-list ul');
  const orderedPlaces = orderByPopulation((results));
  const places = createArrayOfPlaces(orderedPlaces);

  // create a list if items
  const placesList = document.createDocumentFragment();

  for (let place of places) {
    const newListItem = document.createElement('li');
    // add latitude and longitude
    newListItem.setAttribute('data-lat', place.lat);
    newListItem.setAttribute('data-lng', place.lng);
    newListItem.setAttribute('data-name', place.name);
    newListItem.innerHTML = `${place.name}, ${place.adminName1}, ${place.countryName}`;
    placesList.appendChild(newListItem);
  }

  // append them to the navigation
  container.appendChild(placesList);
};

export const clearListDom = (el) => {
  const listToDelete = document.querySelectorAll(el);
  listToDelete.forEach(li => li.remove());
};

export default displayPlaces;
