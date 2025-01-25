// Get references to HTML elements
const temp = document.getElementById("temp");
const cityName = document.getElementById("city");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("windspeed");
const searchInput = document.getElementById("searchinput");
const searchButton = document.getElementById("searchbox");
const bodyImg = document.getElementById("body_img");
const weatherInfo = document.getElementById("body_data");
const detailsSection = document.getElementById("deatil");
const errorMessage = document.getElementById("error");

// OpenWeather API key
const API_KEY = "f27b269d54e4fa1e72993364a80fa8bd";

// Function to fetch weather data
async function checkWeather(city) {
    try {
        // Fetch weather data
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        // Handle invalid city name
        if (data.cod === "404") {
            showError("City not found. Please try again.");
            return;
        }

        // Update weather details
        temp.innerHTML = Math.floor(data.main.temp) + "°C";
        cityName.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + "%";
        windspeed.innerHTML = data.wind.speed + " km/h";

        // Update weather image based on conditions
        const weatherCondition = data.weather[0].main;
        updateWeatherImage(weatherCondition);

        // Display weather data sections
        weatherInfo.style.display = "flex";
        detailsSection.style.display = "flex";
        errorMessage.style.display = "none";
    } catch (error) {
        showError("An error occurred. Please try again later.");
        console.error("Error fetching weather data:", error);
    }
}

// Function to update weather icon
function updateWeatherImage(condition) {
    const conditionToImageMap = {
        Clouds: "cloud.png",
        Clear: "clear.png",
        Rain: "rain.png",
        Drizzle: "drizzle.png",
        Mist: "mist.png",
        Haze: "haze.png",
    };

    bodyImg.src = conditionToImageMap[condition] || "default.png";
}

// Function to display error messages
function showError(message) {
    errorMessage.innerHTML = message;
    errorMessage.style.display = "block";
    weatherInfo.style.display = "none";
    detailsSection.style.display = "none";
}

// Event listener for search button
searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        showError("Please enter a city name.");
    }
});
