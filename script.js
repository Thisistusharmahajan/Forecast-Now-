const apiKey = 'da163a5ea102a0c3335b4050b629284f';  // Replace with your OpenWeatherMap API key
let city = '';

// Function to get weather data
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found or invalid API key');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to display weather data
function displayWeather(data) {
    const cityName = document.getElementById('cityName');
    const description = document.getElementById('description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');

    cityName.textContent = data.name;
    description.textContent = data.weather[0].description;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Function to start fetching weather data at intervals
function startWeatherUpdates() {
    city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    getWeather();  // Fetch data immediately
    setInterval(getWeather, 2000);  // Fetch data every 60 seconds (60000 ms)
}

// Event listener for the button click
document.querySelector('button').addEventListener('click', startWeatherUpdates);
