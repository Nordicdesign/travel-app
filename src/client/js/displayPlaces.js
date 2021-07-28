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
  const places = createArrayOfPlaces(results);

  // create a list if items
  const placesList = document.createDocumentFragment();

  for (let place of places) {
    const newListItem = document.createElement('li');
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
