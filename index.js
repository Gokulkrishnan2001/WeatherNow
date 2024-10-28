import API_KEY from "./config.js";

document.getElementById("submit").addEventListener("click", handleSubmit);

function handleSubmit() {
  const city = document.getElementById("search").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  //Check Cache
  const cacheKey = `weather_${city}`;
  const cachedData = JSON.parse(localStorage.getItem(cacheKey));
  const now = Date.now();

  if (cachedData && now - cachedData.timestamp < 15 * 60 * 1000) {
    displayWeather(cachedData.data);
  } else {
    fetchWeather(city, cacheKey);
  }
}

//fetch function

function fetchWeather(city, cacheKey) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: data, timestamp: Date.now() })
      );
      displayWeather(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Step 4: Display Data on the Webpage
function displayWeather(data) {
  const cityname = data.name;
  const country = data.sys.country;
  const temperature = (data.main.temp - 273.15).toPrecision(3);
  const humidity = data.main.humidity;
  const windspeed = data.wind.speed;

  document.getElementsByClassName("city")[0].innerHTML = cityname;
  document.getElementsByClassName("country")[0].innerHTML = country;
  document.getElementById("temperature").innerHTML = `${temperature} °C`;
  document.getElementById("humidity").innerHTML = `Humidity: ${humidity}%`;
  document.getElementById(
    "windspeed"
  ).innerHTML = `Wind Speed: ${windspeed} m/s`;

  document.getElementById("weather").style.display = "grid";
}
