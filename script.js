const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b4f86184d2msh86935fd5f918956p1545d7jsnbf9a188d5c3e',
		'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
	}
};

fetch('https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=Seattle', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
	// OpenWeatherMap API Key
const apiKey = "YOUR_API_KEY_HERE";

// Function to fetch weather data from API
async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Function to display weather data
function displayWeatherData(data) {
  const forecastCards = document.getElementById("forecast-cards");
  forecastCards.innerHTML = "";

  data.list.forEach((weather) => {
    const date = new Date(weather.dt_txt);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    const timeOfDay = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });

    const card = `
      <div class="forecast-card">
        <p class="day-of-week">${dayOfWeek}</p>
        <p class="time-of-day">${timeOfDay}</p>
        <img src="https://openweathermap.org/img/wn/${
          weather.weather[0].icon
        }@2x.png" alt="${weather.weather[0].description}" />
        <p class="temperature">${Math.round(
          weather.main.temp
        )}&deg;C</p>
        <p class="description">${weather.weather[0].description}</p>
      </div>
    `;

    forecastCards.innerHTML += card;
  });
}

// Event listener for form submission
const form = document.getElementById("weather-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("city-input").value;
  getWeatherData(city).then((data) => displayWeatherData(data));
});
