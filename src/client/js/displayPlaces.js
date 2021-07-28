const displayPlaces = (results) => {
  clearPlacesList();
  const container = document.querySelector('.places-list ul');
  const places = [];

  results.forEach((result) => {
    places.push({
      name: result.name,
      adminName1: result.adminName1,
      countryName: result.countryName
    });
  });

  // create a list if items
  const placesList = document.createDocumentFragment();

  for (let place of places) {
    // medium and large links
    const newListItem = document.createElement('li');
    newListItem.innerHTML = `${place.name}, ${place.adminName1}, ${place.countryName}`;
    placesList.appendChild(newListItem);
  }

  // append them to the navigation
  container.appendChild(placesList);
};

const clearPlacesList = () => {
  const listToDelete = document.querySelectorAll('.places-list ul li');
  listToDelete.forEach(li => li.remove());
};

export default displayPlaces;
