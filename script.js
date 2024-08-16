document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".search-form");
  const unitToggle = document.querySelector("#unitType");
  const body = document.querySelector("body");
  const weatherContainer = document.querySelector(".grid-item:first-child");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.querySelector("#search").value;
    fetchWeatherData(location);
  });

  unitToggle.addEventListener("change", () => {
    const isMetric = unitToggle.checked;
    // Atualizar a UI para refletir a unidade selecionada
    // Você pode incluir a lógica aqui para atualizar a unidade das medições de clima
  });

  const fetchWeatherData = (location) => {
    // Substitua pela chamada real da API
    const dummyData = {
      location: "Cidade Exemplo",
      temp: "25",
      unit: "°C",
      desc: "Ensolarado",
      high: "28",
      low: "22",
      feels_like: "27",
      humidity: "60%",
      wind_speed: "5 m/s",
      pressure: "1015 hPa",
      icon: "01d",
      dayTime: true,
    };

    updateUI(dummyData);
  };

  const updateUI = (data) => {
    document.querySelector(".location").textContent = data.location;
    document.querySelector(".temp").textContent = data.temp;
    document.querySelector(".unit").textContent = data.unit;
    document.querySelector(".desc").textContent = data.desc;
    document.querySelector(".max").textContent = `${data.high} ${data.unit}`;
    document.querySelector(".min").textContent = `${data.low} ${data.unit}`;
    document.querySelector(".feels-like").textContent = `${data.feels_like} ${data.unit}`;
    document.querySelector(".humidity").textContent = data.humidity;
    document.querySelector(".wind-speed").textContent = data.wind_speed;
    document.querySelector(".pressure").textContent = data.pressure;
    document.querySelector(".weather-image").src = `https://refinedguides.com/weather-app/img/${data.icon}.png`;

    if (data.dayTime) {
      weatherContainer.classList.add("day-time");
      weatherContainer.classList.remove("night-time");
      body.className = "sunny";
    } else {
      weatherContainer.classList.add("night-time");
      weatherContainer.classList.remove("day-time");
      body.className = "night";
    }
  };

  // Chamada inicial para pegar o clima padrão
  fetchWeatherData("Cidade Exemplo");
});
