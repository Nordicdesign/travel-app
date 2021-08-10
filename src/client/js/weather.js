export const getWeatherData = async (lat,lon, type, weatherDay) => {
  const payload = {
    "type": type,
    "lat": lat,
    "lon": lon,
    "weatherDay": weatherDay,
  };
  const url = "http://localhost:8080/api/weather";

  try {
    let response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    let weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch(error) {
    console.log(error);
  }
};
