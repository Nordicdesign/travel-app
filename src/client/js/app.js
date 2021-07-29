const weatherKey = process.env.WEATHERBIT_KEY;


const sendForm = async (e) => {
  e.preventDefault();
  storeFeelings()
    .then(() => displayRecentFeeling());
};

const populateTrip = (data) => {
  if (Object.entries(data).length !== 0) { // if there's an entry already
    const {date, temp, content} = data;
    document.getElementById('date').innerHTML = date;
    document.getElementById('temp').innerHTML = temp + 'C';
    document.getElementById('content').innerHTML = content;
  }
};


const displayTrip = async () => {
  const url = 'http://localhost:8080/all';
  try {
    const response = await fetch(url);
    const result = await response.json();
    populateTrip(result);
  } catch (error) {
    console.error(error);
  }
};

const buildTripEntry = async () => {
  // check weather
  let currentWeather = sessionStorage.getItem('weather');
  if (!currentWeather) {
    await checkWeather();
    currentWeather = sessionStorage.getItem('weather');
  }
  let weather = JSON.parse(currentWeather);
  const feelings = document.getElementById('feelings').value;
  const date = new Date();
  const rightNow = date.toLocaleString('en-gb',{
    dateStyle: 'long',
    timeStyle: 'short'
  });

  return {
    'date': rightNow,
    'temp': weather.main.temp,
    'content': feelings
  };
};


const storeTrip = async () => {
  // build the entry
  let tripEntry = await buildPostEntry();
  // sent post to API
  const url = 'http://localhost:8080/journal';
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(tripEntry)
  });
  try {
    let result = await response.json();
    sessionStorage.clear('weather'); // clear to ensure we got fresh weather each time
  } catch (error) {
    console.error(error);
  }
};

export const getWeatherData = async (e) => {
  const target = e.target;
  const lon = target.dataset.lng;
  const lat = target.dataset.lat;
  // console.log(target.dataset.name);
  const url = `http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${weatherKey}`;
  try {
    let response = await fetch(url);
    if (response.status === 404) {
      return {
        code: 404,
        msg: "City not found"
      };
    }
    let weatherData = await response.json();
    console.log(weatherData.data[0]);
    // return weatherData;
  } catch(error) {
    console.log(error);
    if (!error.response) {
      // network error
      return {
        code: 400,
        msg: "No network"
      };
    } else {
      return {
        code: 400,
        msg: 'something broke'
      };
    }
  }
};

const checkWeather = async () => {
  try {
    let response = await getWeatherData(zip);
    if (response.code !== 404) {
      sessionStorage.setItem('weather', JSON.stringify(response));
      updateUIWithWeather(response);
    } else {
      updateUIWithWeather(response);
    }
  } catch (error) {
    console.error(error);
  }
};
