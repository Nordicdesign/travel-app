import { dateWithinAWeek } from './dates';
import { getWeatherData } from './weather';

const populateTrip = (data) => {
  if (Object.entries(data).length !== 0) { // if there's an entry already
    const container = document.querySelector('.trips-container');
    const {name, photos, weather} = data;

    // build the container
    const tripContainer = document.createDocumentFragment();
    const tripDiv = document.createElement('div');
    tripDiv.setAttribute('class', 'trip-entry');
    tripDiv.setAttribute('data-leg', '1');

    // add the header - where are you going
    const nameDiv = document.createElement('div');
    nameDiv.setAttribute('class', 'trip-entry--location');
    const location = document.createElement('h3');
    location.innerHTML = name;
    nameDiv.appendChild(location);


    // show the weather on the place
    const weatherInfo = document.createElement('p');
    weatherInfo.innerHTML = `Clouds: ${weather.clouds}, Temp: ${weather.temp}℃`;
    nameDiv.appendChild(weatherInfo);

    // append the name and weather to the location div
    tripDiv.appendChild(nameDiv);

    // Display some photos
    const photosList = document.createDocumentFragment();
    const photoDiv = document.createElement('div');
    photoDiv.setAttribute('class', 'trip-entry--photos');

    for (let photo of photos.hits) {
      const newPhoto = document.createElement('img');
      // add latitude and longitude
      newPhoto.setAttribute('src', photo.previewURL);
      newPhoto.setAttribute('alt', photo.tags);
      photoDiv.appendChild(newPhoto);
    }
    photosList.appendChild(photoDiv);

    // append them to the navigation
    tripDiv.appendChild(photosList); // append the photos to the overall container

    // add the whole thing to the container
    tripContainer.appendChild(tripDiv);
    container.appendChild(tripContainer);
  }
};


const gatherTrip = async () => {
  const url = 'http://localhost:8080/api/trip';
  try {
    const response = await fetch(url);
    const result = await response.json();
    populateTrip(result);
  } catch (error) {
    console.error(error);
  }
};

const buildTripEntry = async (name, weather, photos) => {
  const date = new Date();
  const rightNow = date.toLocaleString('en-gb',{
    dateStyle: 'long',
    timeStyle: 'short'
  });
  console.log("the photos", photos);
  return {
    'date': rightNow,
    'name': name,
    'weather': weather,
    'photos': photos
  };
};

export const selectDestination = (e) => {
  const target = e.target;
  document.getElementById('lon').value = target.dataset.lng;
  document.getElementById('lat').value = target.dataset.lat;
  document.getElementById('location').value = target.dataset.name;
  // hide the search results
  document.querySelector('.places-list').classList.remove('visible');
};


export const storeTrip = async (e) => {
  e.preventDefault();
  // get the data
  const lon = e.target.lon.value;
  const lat = e.target.lat.value;
  const name = e.target.location.value;
  const date = e.target.when.value;

  // check if date is within a week
  // weatherCurrent = true if within a week
  // weatherCurrent = false if date beyond a week
  const weatherCurrent = dateWithinAWeek(date);
  console.log("is it within a week?", weatherCurrent);
  let weatherType;
  weatherCurrent === true ? weatherType = 'current' : weatherType = 'forecast/daily';

  // gather the weather
  const weather = await getWeatherData(lat,lon,weatherType );
  console.log(weather);

  //gather the photos
  const photos = await getPhotos(name);

  // build the entry
  let tripEntry = await buildTripEntry(name,weather,photos);

  // sent post to API
  try {
    const url = 'http://localhost:8080/api/trip';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(tripEntry)
    });
    let result = await response.json();
    result.code === 200 ? gatherTrip() : null;
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const getPhotos = async (name) => {
  const pixabayKey = process.env.PIXABAY_KEY;
  const url = `https://pixabay.com/api/?key=${pixabayKey}&q=${name}&image_type=photo&per_page=10`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
