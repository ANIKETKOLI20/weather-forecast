import axios from 'axios';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export async function getWeather(cityName) {
  try {
    // Define the parameters for the API request
    const params = {
      q: cityName,
      appid: process.env.WEATHER_API_KEY,
      units: 'metric'
    };

    // Fetch current weather data
    const response = await axios.get(WEATHER_API_URL, { params });
    const weatherData = response.data;

    // Extract relevant data from the response
    const currentWeather = {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      pressure: weatherData.main.pressure,
      icon: weatherData.weather[0].icon
    };

    return currentWeather;
  } catch (error) {
    console.error('Error in getWeather function:', error);
    throw new Error('Failed to fetch current weather');
  }
}

export async function getForecast(cityName) {
  try {
    // Define the parameters for the API request
    const params = {
      q: cityName,
      appid: process.env.WEATHER_API_KEY,
      units: 'metric'
    };

    // Fetch forecast data
    const response = await axios.get(FORECAST_API_URL, { params });
    const forecastData = response.data;

    // Extract and format forecast data
    const forecasts = forecastData.list.map(forecast => ({
      dateTime: forecast.dt_txt,
      temperature: forecast.main.temp,
      description: forecast.weather[0].description,
      humidity: forecast.main.humidity,
      windSpeed: forecast.wind.speed,
      pressure: forecast.main.pressure,
      icon: forecast.weather[0].icon
    }));

    return forecasts;
  } catch (error) {
    console.error('Error in getForecast function:', error);
    throw new Error('Failed to fetch weather forecast');
  }
}
