const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = 'API-KEY'; // Se retiro para no tener problemas
const diffKelvin = 273.15;

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert('Ingrese una ciudad válida');
    }
});

function fetchWeather(city) {
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
        .then(response => response.json())
        .then(data => showWeatherData(data))
        .catch(error => console.error('Error al obtener los datos:', error));
}

function showWeatherData(data) {
    const divResponseData = document.getElementById('responseData');
    divResponseData.innerHTML = '';

    // Obtener los datos necesarios de la API
    const cityName = data.name;
    const countryName = data.sys.country;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    // Crear elementos para mostrar los datos
    const cityInfo = document.createElement('h2');
    cityInfo.textContent = `${cityName}, ${countryName}`;

    const tempInfo = document.createElement('p');
    tempInfo.textContent = `La temperatura es: ${Math.floor(temp - diffKelvin)}°C`;

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `La humedad actual es de ${humidity}%`;

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `La descripción meteorológica es: ${description}`;

    const iconInfo = document.createElement('img');
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    iconInfo.alt = 'Icono del clima';

    // Agregar los elementos al contenedor
    divResponseData.appendChild(cityInfo);
    divResponseData.appendChild(tempInfo);
    divResponseData.appendChild(humidityInfo);
    divResponseData.appendChild(descriptionInfo);
    divResponseData.appendChild(iconInfo);
}
