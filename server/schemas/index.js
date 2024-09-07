import { gql } from 'apollo-server-express';

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
    forecast: [Forecast]  # Include forecast data as a list of Forecast objects
  }

  type Forecast {
    date: String
    temperatureHigh: Float
    temperatureLow: Float
    description: String
    precipitationChance: Float
  }

  type Query {
    getCities(search: String, limit: Int , offset: Int): [City]    # Query to fetch cities
    getWeather(cityName: String!): Weather          # Query to fetch weather and forecast
  }
`;

export default typeDefs;
