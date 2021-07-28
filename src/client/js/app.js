const weatherKey = PROCESS.WEATHERBIT_KEY;

const populatePostcode = () => {
  // Check if there's a location on storage
  let storedPostcode = localStorage.getItem('storedPostcode');
  if (storedPostcode) {
    document.getElementById('zip').value = storedPostcode;
  }
};

const updateUIWithWeather = (data) => {
  const target = document.querySelector('.help-tip');
  if (data == undefined) {
    console.log("Postcode is no good");
  } else if (data.code === 404) {
    target.innerText = "Can't find that zip code";
  } else if (data) {
    target.innerText = `${data.name}, ${data.weather[0].description} ${data.main.temp}C `;
  }
};


// check there's some postcode first
// and it's numbers only because US
const checkPostCode = (zip) => {
  if (Number.isInteger(parseFloat(zip)) && zip.length === 5) {
    localStorage.setItem('storedPostcode', zip);
    return true;
  } else {
    updateUIWithWeather();
    return false;
  }
};


const sendForm = async (e) => {
  e.preventDefault();
  storeFeelings()
  .then(() => displayRecentFeeling());
}

const populateRecentEntry = (data) => {
  if (Object.entries(data).length !== 0) { // if there's an entry already
    const {date, temp, content} = data;
    document.getElementById('date').innerHTML = date;
    document.getElementById('temp').innerHTML = temp + 'C';
    document.getElementById('content').innerHTML = content;
  }
}


const displayRecentFeeling = async () => {
  const url = 'http://localhost:8080/all';
  try {
    let response = await fetch(url);
    let result = await response.json();
    populateRecentEntry(result);
  }
  catch (error) {
    console.error(error);
  }
}

const buildPostEntry = async () => {
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
  }
}


const storeFeelings = async () => {
  // build the entry
  let journalEntry = await buildPostEntry();
  // sent post to API
  const url = 'http://localhost:8080/journal';
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(journalEntry)
  });
  try {
    let result = await response.json();
    sessionStorage.clear('weather'); // clear to ensure we got fresh weather each time
  }
  catch (error) {
    console.error(error);
  }
}

const getWeatherData = async (zip) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
  try {
    let response = await fetch(url+zip+",us&units=metric&APPID="+weatherKey);
    if (response.status === 404) {
      return {
        code: 404,
        msg: "City not found"
      }
    }
    let weatherData = await response.json();
    return weatherData;
  }
  catch(error) {
    console.log(error);
    if (!error.response) {
      // network error
      return {
        code: 400,
        msg: "No network"
      }
    }
    else {
      return {
        code: 400,
        msg: 'something broke'
      }
    }
  }
}


const checkWeather = async () => {
  document.querySelector('.error').classList.remove('visible');
  const zip = document.getElementById('zip').value;
  const isItValid = checkPostCode(zip);

  if (isItValid) {
    try {
      let response = await getWeatherData(zip)
      if (response.code !== 404) {
        sessionStorage.setItem('weather', JSON.stringify(response))
        updateUIWithWeather(response);
      }
      else {
        updateUIWithWeather(response);
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  else {
    document.querySelector('.error').classList.add('visible');
  }
}

const start = () => {
  populatePostcode();
  displayRecentFeeling();
  document.getElementById('generate').addEventListener('click', sendForm);
  document.getElementById('zip').addEventListener('blur', checkWeather);
}

// do the things
start();
