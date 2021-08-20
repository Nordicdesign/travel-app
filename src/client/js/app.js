import { v4 as uuidv4 } from 'uuid';
import { dateWithinAWeek } from './dates';
import { getWeatherData } from './weather';
import { clearListDom } from './utils';

const getFormValue = (id) => document.getElementById(id).value;


const deleteAnEntry = async (e) => {
  e.preventDefault();
  const id = e.path[0].dataset.id;
  try {
    const response = await fetch(`http://localhost:8080/api/trip/${id}`, {
      method: 'DELETE'
    });
    // clear trips
    clearListDom('.trips-container div');
    // get data again
    gatherTrip();
  } catch (error) {
    console.log(error);
  }
};

const timeToTrip = (date) => {
  const today = new Date();
  const tripDate = new Date(date.replace('-', ','));
  const difference = (tripDate - today) / (1000 * 3600 * 24);
  return difference;
};

const createTripEntry = (id,data) => {
  const container = document.querySelector('.trips-container');
  const {name, photos, weather, date} = data;
  // build the container
  const tripContainer = document.createDocumentFragment();
  const tripDiv = document.createElement('div');
  tripDiv.setAttribute('class', 'trip-entry');

  // add the header - where are you going
  const nameDiv = document.createElement('div');
  nameDiv.setAttribute('class', 'trip-entry--location');
  const location = document.createElement('h3');
  // show how long until the trip
  const timeLeft = timeToTrip(date);
  if (timeLeft < 1) {
    location.innerHTML = `${name} <span>Less than a day to go - <a href="#" data-id="${id}">Remove</a></span>`;
  } else {
    location.innerHTML = `${name} <span>${Math.floor(timeLeft)} days to go - <a href="#" data-id="${id}">Remove</a></span>`;
  }
  // remove link
  nameDiv.appendChild(location);

  // show the weather on the place
  const weatherInfo = document.createElement('p');
  weatherInfo.innerHTML = `${weather.temp}℃`;
  weatherInfo.setAttribute('class', 'temperature');
  nameDiv.appendChild(weatherInfo);

  // show the weather icon on the place
  const weatherIcon = document.createElement('img');
  weatherIcon.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`);
  weatherIcon.setAttribute('alt', weather.weather.description);
  nameDiv.appendChild(weatherIcon);

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
};


const populateTrip = (data) => {
  console.log(data);
  if (Object.entries(data).length !== 0) { // if there's an entry already
    clearListDom('.trips-container div'); // clear any data first
    for (let trip in data) {
      console.log("trip is:", data[trip]);
      createTripEntry(trip, data[trip]);
    }
    // make the thing visible
    document.querySelector('.trips-container').classList.add('visible');
    // move the content to the top
    document.querySelector('.wrapper').classList.add('results');
    // attach event listeners foe the remove links
    const removeLinks = document.querySelectorAll('.trip-entry a');
    // for (let link of removeLinks) {
    //   console.log(link);
    // }
    // console.log(removeLinks);
    let links = [...removeLinks].map(link => link.addEventListener('click', deleteAnEntry));
    // console.log(links);
  }
};


export const gatherTrip = async () => {
  const url = 'http://localhost:8080/api/trip';
  const headers = new Headers();
  headers.append('pragma', 'no-cache');
  headers.append('cache-control', 'no-cache');
  try {
    const response = await fetch(url, headers);
    const result = await response.json();
    populateTrip(result);
    console.log("data from backend", result);
  } catch (error) {
    console.error(error);
  }
};


const buildTripEntry = async (name, weather, photos, date) => {
  let id = uuidv4();
  return {
    [id]: {
      'date': date,
      'name': name,
      'weather': weather,
      'photos': photos
    }
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


const checkIfDestinationEmpty = () => {
  const place = getFormValue("location");
  if (place === "") {
    return true;
  } else {
    return false;
  }
};


export const storeTrip = async (e) => {
  e.preventDefault();
  if (checkIfDestinationEmpty() === true) {
    document.querySelector(".error").classList.add("error-visible");
    return;
  }
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
  let weatherType; // current or forecast
  let weatherDay; // current (0) or days the future
  if (weatherCurrent === true) {
    weatherType = 'current';
    weatherDay = 0;
  } else {
    weatherType = 'forecast/daily';
    weatherDay = weatherCurrent; // send the number of days in the future we need the weather
  };

  // gather the weather
  const weather = await getWeatherData(lat,lon,weatherType,weatherDay);
  console.log(weather);

  //gather the photos
  const photos = await getPhotos(name);

  // build the entry
  let tripEntry = await buildTripEntry(name,weather,photos,date);

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
    result.code === 201 ? gatherTrip() : null;
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
};


const getPhotos = async (name) => {
  const pixabayKey = process.env.PIXABAY_KEY;
  const url = `https://pixabay.com/api/?key=${pixabayKey}&q=${name}&image_type=photo&per_page=3`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
