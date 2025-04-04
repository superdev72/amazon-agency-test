import { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  city: string;
  temp: number;
  description: string;
  icon: string;
  lastUpdated: string;
}

const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cachedWeather = localStorage.getItem("weatherData");
    if (cachedWeather) {
      const { data, timestamp } = JSON.parse(cachedWeather);
      if (Date.now() - timestamp < 5 * 60 * 1000) {
        setWeather(data);
      }
    }
  }, []);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        process.env.REACT_APP_WEATHER_API_URL as string,
        {
          params: {
            q: city,
            appid: process.env.REACT_APP_WEATHER_API_KEY,
            units: "metric",
          },
        }
      );

      const formattedData: WeatherData = {
        city: response.data.name,
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
        lastUpdated: new Date(response.data.dt * 1000).toLocaleTimeString(),
      };

      setWeather(formattedData);
      localStorage.setItem(
        "weatherData",
        JSON.stringify({ data: formattedData, timestamp: Date.now() })
      );
    } catch (err) {
      setError("City not found or API error.");
    }
    setLoading(false);
  };

  return { weather, loading, error, fetchWeather, setError };
};

export default useWeather;
