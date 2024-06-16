document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
        const apiKey = 'af99b618153d4b25bb7132217242605';
        const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=14&aqi=no&alerts=no`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                updateWeather(data);
                updateBackground(data);
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                alert('City not found or there was an error fetching the data.');
                resetBackground();
            });
    } else {
        alert('Please enter a city name.');
        resetBackground();
    }
});

function updateWeather(data) {
    const weatherWrapper = document.getElementById('weatherWrapper');
    weatherWrapper.innerHTML = ''; // Clear previous weather data

    data.forecast.forecastday.forEach(day => {
        const weatherCard = document.createElement('div');
        weatherCard.className = 'weatherCard';

        weatherCard.innerHTML = `
            <h3>${day.date}</h3>
            <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
            <ul>
                <li>Temp: ${day.day.avgtemp_c} °C</li>
                <li>Max Temp: ${day.day.maxtemp_c} °C</li>
                <li>Min Temp: ${day.day.mintemp_c} °C</li>
                <li>Wind Speed: ${day.day.maxwind_kph} km/h</li>
                <li>Chance of Rain: ${day.day.daily_chance_of_rain}%</li>
                <li>Condition: ${day.day.condition.text}</li>
            </ul>
        `;

        weatherWrapper.appendChild(weatherCard);
    });
}

function updateBackground(data) {
    const mainWeather = data.forecast.forecastday[0].day.condition.text.toLowerCase();
    const header = document.querySelector('header');
    const headerText = header.querySelector('h1');
    let backgroundImage = 'url(sky.jpg)';
    let headerBackgroundColor = 'rgba(51, 51, 51, 0.8)';
    let headerTextColor = '#fff';

    if (mainWeather.includes('sunny') || mainWeather.includes('clear')) {
        backgroundImage = 'url(sunny.jpg)';
        headerBackgroundColor = 'rgba(255, 223, 0, 0.8)';
        headerTextColor = '#333';
    } else if (mainWeather.includes('rain') || mainWeather.includes('shower')) {
        backgroundImage = 'url(rainy.jpg)';
        headerBackgroundColor = 'rgba(128, 128, 128, 0.8)';
        headerTextColor = '#fff';
    } else if (mainWeather.includes('cloud') || mainWeather.includes('overcast')) {
        backgroundImage = 'url(cloudy.jpg)';
        headerBackgroundColor = 'rgba(255, 255, 255, 0.8)';
        headerTextColor = '#333';
    } else if (mainWeather.includes('snow')) {
        backgroundImage = 'url(snowy.jpg)';
        headerBackgroundColor = 'rgba(255, 255, 255, 0.8)';
        headerTextColor = '#333';
    }

    document.body.style.backgroundImage = backgroundImage;
    header.style.backgroundColor = headerBackgroundColor;
    headerText.style.color = headerTextColor;
}

function resetBackground() {
    document.body.style.backgroundImage = 'url(sky.jpg)';
    const header = document.querySelector('header');
    const headerText = header.querySelector('h1');
    header.style.backgroundColor = 'rgba(51, 51, 51, 0.8)';
    headerText.style.color = '#fff';
}
