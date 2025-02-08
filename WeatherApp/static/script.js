async function getWeather() {
    const location = document.getElementById('location').value.trim();
    const weatherInfo = document.getElementById('weather-info');
    const error = document.getElementById('error');


    weatherInfo.innerHTML = '';
    error.textContent = '';

    if (!location) {
        error.textContent = 'Please enter a location';
        return;
    }

    weatherInfo.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch('/get_weather', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location })
        });

        const data = await response.json();

        if (response.ok) {
            
            const weatherIcons = {
                'Clear': '☀️',
                'Clouds': '☁️',
                'Rain': '🌧️',
                'Snow': '❄️',
                'Thunderstorm': '⛈️',
                'Drizzle': '🌦️',
                'Mist': '🌫️'
            };
            
            const icon = weatherIcons[data.condition] || '🌍';

            weatherInfo.innerHTML = `
                <p><strong>Location:</strong> ${data.location}</p>
                <p><strong>Temperature:</strong> ${data.temperature} °C</p>
                <p><strong>Condition:</strong> ${data.condition} ${icon}</p>
                
            `;
        } else {
            throw new Error(data.error || 'Failed to fetch weather data');
        }
    } catch (e) {
        error.textContent = e.message || 'An error occurred while fetching the weather data';
    }
}
