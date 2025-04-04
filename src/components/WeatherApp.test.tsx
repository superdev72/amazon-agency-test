import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherApp from "./WeatherApp";
import useWeather from "../hooks/useWeather";

// Mock the custom hook
jest.mock("../hooks/useWeather");
const mockUseWeather = useWeather as jest.MockedFunction<typeof useWeather>;

describe("WeatherApp component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows error message when an incorrect city is entered", () => {
    mockUseWeather.mockReturnValue({
      weather: null,
      loading: false,
      error: "City not found or API error.",
      fetchWeather: jest.fn(),
      setError: jest.fn(),
    });

    render(<WeatherApp />);
    expect(
      screen.getByText("City not found or API error.")
    ).toBeInTheDocument();
  });

  it("displays weather data when API call succeeds", () => {
    mockUseWeather.mockReturnValue({
      weather: {
        city: "Berlin",
        temp: 18,
        description: "scattered clouds",
        icon: "https://openweathermap.org/img/w/03d.png",
        lastUpdated: "10:00 AM",
      },
      loading: false,
      error: "",
      fetchWeather: jest.fn(),
      setError: jest.fn(),
    });

    render(<WeatherApp />);
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.getByText("18°C")).toBeInTheDocument();
    expect(screen.getByText("scattered clouds")).toBeInTheDocument();
    expect(screen.getByText("Last updated: 10:00 AM")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/w/03d.png"
    );
  });
});
