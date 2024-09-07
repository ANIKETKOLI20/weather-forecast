import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { motion } from "framer-motion";

// GraphQL query to fetch weather data
const GET_WEATHER = gql`
  query GetWeather($cityName: String!) {
    getWeather(cityName: $cityName) {
      temperature
      description
      humidity
      windSpeed
      pressure
      icon
      forecast {
        date
        temperatureHigh
        temperatureLow
        description
        precipitationChance
      }
    }
  }
`;

const fadeInVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

function Weather() {
  const { cityName } = useParams();
  const { loading, error, data } = useQuery(GET_WEATHER, {
    variables: { cityName },
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  if (error)
    return (
      <p className="text-center text-red-500">Error loading weather data</p>
    );

  const {
    temperature,
    description,
    humidity,
    windSpeed,
    pressure,
    icon,
    forecast,
  } = data.getWeather;

  // Get the last 6 forecasts
  const lastSixForecasts = forecast.slice(-6);

  return (
    <div className="p-6 bg-base-300 h-screen flex flex-col items-center text-white">
      {/* Weather card */}
      <div className="weather-card p-6 bg-blue-800 rounded-lg shadow-lg w-full max-w-md mb-6 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold">{cityName}</h2>
        <p className="text-lg">{description}</p>
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
          className="my-2"
        />
        <p>Temperature: {temperature}°C</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {windSpeed} m/s</p>
        <p>Pressure: {pressure} hPa</p>
      </div>

      <h3 className="mt-8 mb-4 text-xl font-semibold">Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-6">
        {forecast.map((day, index) => {
          // Check if the current card is in the last 6
          const isAnimating = index >= forecast.length - 6;
          // Calculate delay for animation based on the position in the last 6
          const delayIndex = index - (forecast.length - 6);

          return (
            <motion.div
              key={day.date}
              className="forecast-card p-4 bg-yellow-600 rounded-lg shadow-md mb-4"
              variants={fadeInVariants}
              initial="hidden"
              animate={isAnimating ? "visible" : "hidden"}
              custom={delayIndex} // Pass the delay index to control the animation timing
            >
              <h4 className="font-medium">{day.date}</h4>
              <p>High: {day.temperatureHigh}°C</p>
              <p>Low: {day.temperatureLow}°C</p>
              <p>{day.description}</p>
              <p>Precipitation Chance: {day.precipitationChance * 100}%</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Weather;
