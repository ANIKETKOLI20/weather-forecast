import { gql } from 'apollo-server-express';

// Define GraphQL types and queries
const typeDefs = gql`
  type City {
    id: String
    name: String
    country: String
    timezone: String
  }

  type Weather {
    temperature: Float
    description: String
    humidity: Int
    windSpeed: Float
    pressure: Int
    icon: String
    forecast: [Forecast]  # Array of Forecast objects
  }

  type Forecast {
    date: String
    temperatureHigh: Float
    temperatureLow: Float
    description: String
    precipitationChance: Float
  }

  type Query {
    getCities(search: String, limit: Int): [City]  # Query to fetch cities
    getWeather(cityName: String!): Weather        # Query to fetch weather
  }
`;

export default typeDefs;
