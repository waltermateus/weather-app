document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".search-form");
  const unitToggle = document.querySelector("#unitType");
  const weatherContainer = document.querySelector(".grid-item:first-child");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.querySelector("#search").value;
    if (location) {
      fetchWeatherData(location);
    } else {
      alert("Por favor, insira o nome de uma cidade.");
    }
  });

  unitToggle.addEventListener("change", () => {
    const isMetric = unitToggle.checked;
  });

  const fetchWeatherData = async (location) => {
    try {
      const apiKey = "5dcd801d8dd2009e21568d85e8ac6fa7";
      const units = unitToggle.checked ? "metric" : "imperial";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=pt_br`);
      if (!response.ok) {
        throw new Error("Cidade não encontrada");
      }
      const data = await response.json();
      updateUI(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const updateUI = (data) => {
    const { name, main, weather, wind } = data;
    const locationElement = document.querySelector(".location");
    const tempElement = document.querySelector(".temp");
    const unitElement = document.querySelector(".unit");
    const descElement = document.querySelector(".desc");
    const maxElement = document.querySelector(".max");
    const minElement = document.querySelector(".min");
    const feelsLikeElement = document.querySelector(".feels-like");
    const humidityElement = document.querySelector(".humidity");
    const windSpeedElement = document.querySelector(".wind-speed");
    const pressureElement = document.querySelector(".pressure");
    const weatherImageElement = document.querySelector(".weather-image");

    locationElement.textContent = name;
    tempElement.textContent = Math.round(main.temp);
    unitElement.textContent = unitToggle.checked ? "°C" : "°F";
    descElement.textContent = weather[0].description;
    maxElement.textContent = `${Math.round(main.temp_max)} ${unitToggle.checked ? "°C" : "°F"}`;
    minElement.textContent = `${Math.round(main.temp_min)} ${unitToggle.checked ? "°C" : "°F"}`;
    feelsLikeElement.textContent = `${Math.round(main.feels_like)} ${unitToggle.checked ? "°C" : "°F"}`;
    humidityElement.textContent = `${main.humidity}%`;
    windSpeedElement.textContent = `${Math.round(wind.speed)} ${unitToggle.checked ? "m/s" : "milhas/h"}`;
    pressureElement.textContent = `${main.pressure} hPa`;
    weatherImageElement.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const isDayTime = weather[0].icon.includes("d");
    if (isDayTime) {
      weatherContainer.classList.add("day-time");
      weatherContainer.classList.remove("night-time");
      document.body.className = "sunny";
    } else {
      weatherContainer.classList.add("night-time");
      weatherContainer.classList.remove("day-time");
      document.body.className = "night";
    }
  };

  // Chamada inicial para pegar o clima padrão de Luanda
  fetchWeatherData("Luanda");
});
