import { getCities } from '../services/cityService.js'; // Import the city service
import { getWeather } from '../services/weatherService.js'; // Import the weather service

const resolvers = {
  Query: {
    // Resolver for fetching cities with pagination
    getCities: async (_, { search = '', limit = 10, offset = 0 }) => {
      try {
        const cities = await getCities(search, limit, offset); // Ensure this returns an array
        return cities;
      } catch (error) {
        console.error('Error fetching cities:', error);
        throw new Error('Failed to fetch cities'); // Error handling for GraphQL
      }
    },
    // Resolver for fetching current weather and forecast
    getWeather: async (_, { cityName }) => {
      try {
        const weather = await getWeather(cityName); // Ensure this returns the correct weather object
        return weather; // Return the combined weather and forecast data
      } catch (error) {
        console.error('Error fetching weather:', error);
        throw new Error('Failed to fetch weather'); // Error handling for GraphQL
      }
    }
  }
};

export default resolvers;
