import dotenv from 'dotenv'
import axios from 'axios';

dotenv.config();

const WEATHER_API_URL = process.env.WEATHER_API_URL
const FORECAST_API_URL = process.env.FORECAST_API_URL

/**
 * Fetches both current weather and forecast data for a given city.
 * @param {string} cityName - The name of the city to fetch weather data for.
 * @returns {object} An object containing current weather and forecast data.
 */
export async function getWeather(cityName) {
  try {
    // Parameters for current weather and forecast APIs
    const params = {
      q: cityName,
      appid: process.env.WEATHER_API_KEY,
      units: 'metric'
    };

    // Fetch current weather data
    const currentResponse = await axios.get(WEATHER_API_URL, { params });
    const weatherData = currentResponse.data; // Extract current weather data

    // Extract relevant current weather data
    const currentWeather = {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      pressure: weatherData.main.pressure,
      icon: weatherData.weather[0].icon
    };

    // Fetch forecast data
    const forecastResponse = await axios.get(FORECAST_API_URL, { params });
    const forecastData = forecastResponse.data; // Extract forecast data

    // Process forecast data to get daily highs, lows, and descriptions
    const forecast = forecastData.list.map((entry) => ({
      date: entry.dt_txt.split(' ')[0], // Extract the date part from the timestamp
      temperatureHigh: entry.main.temp_max,
      temperatureLow: entry.main.temp_min,
      description: entry.weather[0].description,
      precipitationChance: entry.pop // Probability of precipitation
    }));

    // Aggregate forecast data by date for daily summaries
    const dailyForecast = forecast.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = {
          date: curr.date,
          temperatureHigh: curr.temperatureHigh,
          temperatureLow: curr.temperatureLow,
          description: curr.description,
          precipitationChance: curr.precipitationChance,
        };
      } else {
        acc[curr.date].temperatureHigh = Math.max(acc[curr.date].temperatureHigh, curr.temperatureHigh);
        acc[curr.date].temperatureLow = Math.min(acc[curr.date].temperatureLow, curr.temperatureLow);
        acc[curr.date].precipitationChance = Math.max(acc[curr.date].precipitationChance, curr.precipitationChance);
        acc[curr.date].description = curr.description; // Simplistic example for updating description
      }
      return acc;
    }, {});

    // Convert the aggregated forecast object to an array
    const dailyForecastArray = Object.values(dailyForecast);

    // Return both current weather and forecast data
    return {
      ...currentWeather,
      forecast: dailyForecastArray // Include the forecast in the response
    };
  } catch (error) {
    console.error('Error in getWeather function:', error.message);
    throw new Error('Failed to fetch weather data');
  }
}
