const API_KEY = 'f33a484cf794d08d0148764789aaba32';
const searchInput = document.getElementById('search-input');
const weatherInfo = document.getElementById('weather-info');
const cityNameElem = document.getElementById('city-name');
const cityCountryElem = document.getElementById('city-country');
const cityTempElem = document.getElementById('city-temp');
const cityIconElem = document.getElementById('city-icon');
const cityDescriptionElem = document.getElementById('city-description');
const cityHumidityElem = document.getElementById('city-humidity');
const cityWindElem = document.getElementById('city-wind');

searchInput.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value;
    const weather = await fetchWeather(query);

    if (weather.main) {
      cityNameElem.textContent = weather.name;
      cityCountryElem.textContent = weather.sys.country;
      cityTempElem.textContent = Math.round(weather.main.temp);
      cityIconElem.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
      cityIconElem.alt = weather.weather[0].description;
      cityDescriptionElem.textContent = weather.weather[0].description;
      cityHumidityElem.textContent = `Humidade: ${weather.main.humidity}%`;
      cityWindElem.textContent = `Vento: ${weather.wind.speed} m/s`;

      weatherInfo.style.display = 'block';
    } else {
      alert('City not found');
    }

    searchInput.value = '';
  }
});

async function fetchWeather(query) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${API_KEY}`);
  const data = await response.json();
  return data;
}
