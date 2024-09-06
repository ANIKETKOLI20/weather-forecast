// resolvers/index.js
import { getCities } from '../services/cityService.js'; // Import city service
import { getWeather } from '../services/weatherService.js'; // Import weather service

const resolvers = {
  Query: {
    // Resolver for fetching cities
    getCities: async (_, { search = '', limit = 10 }) => {
      try {
        const cities = await getCities(search, limit);
        return cities;
      } catch (error) {
        console.error('Error fetching cities:', error);
        throw new Error('Failed to fetch cities'); // Error handling for GraphQL
      }
    },
    // Resolver for fetching weather
    getWeather: async (_, { cityName }) => {
      try {
        const weather = await getWeather(cityName);
        return weather;
      } catch (error) {
        console.error('Error fetching weather:', error);
        throw new Error('Failed to fetch weather'); // Error handling for GraphQL
      }
    }
  }
};

export default resolvers;
