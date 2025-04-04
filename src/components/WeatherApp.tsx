import React, { useState } from "react";
import {
  TextInput,
  Button,
  Card,
  Image,
  Loader,
  Notification,
} from "@mantine/core";
import useWeather from "../hooks/useWeather"; // Custom Hook

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState("");
  const { weather, loading, error, fetchWeather, setError } = useWeather();
  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <TextInput
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.currentTarget.value)}
      />
      <Button
        onClick={() => fetchWeather(city)}
        style={{ marginTop: 10 }}
        disabled={!city}
      >
        Get Weather
      </Button>

      {loading && <Loader style={{ marginTop: 20 }} />}

      {error && (
        <Notification
          color="red"
          onClose={() => setError("")}
          styles={{ root: { color: "red" } }}
        >
          {error}
        </Notification>
      )}

      {!error && weather && (
        <Card shadow="sm" padding="lg" style={{ marginTop: 20 }}>
          <h2>{weather.city}</h2>
          <p>{weather.temp}°C</p>
          <p>{weather.description}</p>
          <Image src={weather.icon} alt="weather icon" width={50} height={50} />
          <p>Last updated: {weather.lastUpdated}</p>
        </Card>
      )}
    </div>
  );
};

export default WeatherApp;
