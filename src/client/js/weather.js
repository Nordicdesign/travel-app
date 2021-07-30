export const getWeatherData = async (lat,lon, type, weatherDay) => {
  const weatherKey = process.env.WEATHERBIT_KEY;
  const when = Math.round(weatherDay);
  const url = `http://api.weatherbit.io/v2.0/${type}?lat=${lat}&lon=${lon}&key=${weatherKey}`;

  try {
    let response = await fetch(url);
    if (response.status === 404) {
      return {
        code: 404,
        msg: "City not found"
      };
    }
    let weatherData = await response.json();
    console.log(weatherData);
    return weatherData.data[when];
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
